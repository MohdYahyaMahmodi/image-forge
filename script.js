const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const selectFilesBtn = document.getElementById('select-files');
const previewSection = document.getElementById('preview-section');
const imageCarousel = document.getElementById('image-carousel');
const fileListSection = document.getElementById('file-list-section');
const fileList = document.getElementById('file-list');
const convertBtn = document.getElementById('convert-images');
const statsSection = document.getElementById('stats-section');
const imageStats = document.getElementById('image-stats');
const conversionStatsSection = document.getElementById('conversion-stats-section');
const conversionStats = document.getElementById('conversion-stats');
const progressSection = document.getElementById('progress-section');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

let files = [];
let swiper;

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

dropArea.addEventListener('drop', handleDrop, false);
fileInput.addEventListener('change', handleFiles, false);
selectFilesBtn.addEventListener('click', () => fileInput.click());

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight() {
    dropArea.classList.add('highlight');
    gsap.to(dropArea, { scale: 1.02, duration: 0.3, ease: "power2.out" });
}

function unhighlight() {
    dropArea.classList.remove('highlight');
    gsap.to(dropArea, { scale: 1, duration: 0.3, ease: "power2.out" });
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const newFiles = [...dt.files];
    handleFiles({ target: { files: newFiles } });
}

function handleFiles(e) {
    files = [...e.target.files].filter(file => file.type.startsWith('image/'));
    updatePreview();
    updateFileList();
    updateStats();
}

function updatePreview() {
    previewSection.classList.remove('hidden');
    imageCarousel.innerHTML = '';

    files.forEach((file, index) => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.alt = `Preview ${index + 1}`;
        slide.appendChild(img);
        imageCarousel.appendChild(slide);
    });

    if (swiper) {
        swiper.destroy();
    }

    swiper = new Swiper('.swiper', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
        },
    });

    gsap.from(previewSection, { opacity: 0, y: 20, duration: 0.5, ease: "power3.out" });
}

function updateFileList() {
  fileListSection.classList.remove('hidden');
  fileList.innerHTML = '';

  files.forEach((file, index) => {
      const row = document.createElement('tr');
      row.className = index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900';
      
      const truncatedFileName = truncateFileName(file.name, 8);
      
      row.innerHTML = `
          <td class="px-4 py-3">
              <img src="${URL.createObjectURL(file)}" alt="${file.name}" class="w-10 h-10 object-cover rounded">
          </td>
          <td class="px-4 py-3">
              <span title="${file.name}" class="cursor-pointer hover:underline">${truncatedFileName}</span>
          </td>
          <td class="px-4 py-3">${formatSize(file.size)}</td>
          <td class="px-4 py-3 new-size">-</td>
          <td class="px-4 py-3 size-change">-</td>
      `;
      fileList.appendChild(row);
      gsap.from(row, { opacity: 0, y: 20, duration: 0.5, delay: index * 0.1, ease: "power3.out" });
  });

  convertBtn.disabled = files.length === 0;
  gsap.from(fileListSection, { opacity: 0, y: 20, duration: 0.5, ease: "power3.out" });
}

function truncateFileName(fileName, maxLength) {
  if (fileName.length <= maxLength) return fileName;
  const extension = fileName.split('.').pop();
  const nameWithoutExtension = fileName.slice(0, -(extension.length + 1));
  const truncatedName = nameWithoutExtension.slice(0, maxLength - 3) + '...';
  return truncatedName + '.' + extension;
}

function updateStats() {
    statsSection.classList.remove('hidden');
    imageStats.innerHTML = '';

    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    const avgSize = totalSize / files.length;
    const formats = {};
    files.forEach(file => {
        const format = file.type.split('/')[1].toUpperCase();
        formats[format] = (formats[format] || 0) + 1;
    });

    const stats = [
        { label: 'Total Files', value: files.length },
        { label: 'Total Size', value: formatSize(totalSize) },
        { label: 'Average Size', value: formatSize(avgSize) },
        { label: 'Formats', value: Object.entries(formats).map(([format, count]) => `${format}: ${count}`).join(', ') },
    ];

    stats.forEach((stat, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="font-medium">${stat.label}:</span> ${stat.value}`;
        imageStats.appendChild(li);
        gsap.from(li, { opacity: 0, x: -20, duration: 0.5, delay: index * 0.1, ease: "power3.out" });
    });

    gsap.from(statsSection, { opacity: 0, y: 20, duration: 0.5, ease: "power3.out" });
}

function updateConversionStats(originalSize, newStats) {
    conversionStatsSection.classList.remove('hidden');
    conversionStats.innerHTML = '';

    const sizeChange = ((newStats.zipSize - originalSize) / originalSize * 100).toFixed(2);
    const arrowColor = sizeChange < 0 ? 'text-green-500' : 'text-red-500';
    const arrowDirection = sizeChange < 0 ? '↓' : '↑';

    const stats = [
        {
            label: 'Size Comparison',
            value: `
                <div class="flex items-center space-x-4">
                    <span>${formatSize(originalSize)}</span>
                    <span class="${arrowColor} text-2xl">${arrowDirection}</span>
                    <span>${formatSize(newStats.zipSize)}</span>
                </div>
            `
        },
        { label: 'Total Size Change', value: `${sizeChange}%` },
        { label: 'New Format', value: newStats.newFormat }
    ];

    stats.forEach((stat, index) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <p class="font-medium mb-1">${stat.label}</p>
            <div class="text-lg ${stat.label === 'Size Comparison' ? '' : 'pl-4'}">${stat.value}</div>
        `;
        conversionStats.appendChild(div);
        gsap.from(div, { opacity: 0, y: 20, duration: 0.5, delay: index * 0.1, ease: "power3.out" });
    });

    gsap.from(conversionStatsSection, { opacity: 0, y: 20, duration: 0.5, ease: "power3.out" });
}

function formatSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

convertBtn.addEventListener('click', startConversion);

async function startConversion() {
    progressSection.classList.remove('hidden');
    convertBtn.disabled = true;

    const format = document.getElementById('format').value;
    const zip = new JSZip();
    let processedFiles = 0;
    const totalFiles = files.length;
    let newTotalSize = 0;

    const rows = fileList.querySelectorAll('tr');

    updateProgress(0, 'Starting conversion...');

    for (let i = 0; i < totalFiles; i++) {
        const file = files[i];
        try {
            let blob;
            if (file.type === 'image/svg+xml') {
                blob = await convertSvg(file, format);
            } else {
                blob = await convertImage(file, format);
            }
            const fileName = `${file.name.split('.')[0]}.${format.split('/')[1]}`;
            zip.file(fileName, blob);

            // Update file details
            const row = rows[i];
            const newSizeCell = row.querySelector('.new-size');
            const sizeChangeCell = row.querySelector('.size-change');
            const originalSize = file.size;
            const newSize = blob.size;
            newTotalSize += newSize;
            const sizeChange = ((newSize - originalSize) / originalSize * 100).toFixed(2);

            newSizeCell.textContent = formatSize(newSize);
            sizeChangeCell.textContent = `${sizeChange}%`;

            if (parseFloat(sizeChange) < 0) {
                sizeChangeCell.classList.add('text-green-500');
            } else if (parseFloat(sizeChange) > 0) {
                sizeChangeCell.classList.add('text-red-500');
            }

            processedFiles++;
            updateProgress(processedFiles / totalFiles, `Converting images: ${processedFiles}/${totalFiles}`);
        } catch (error) {
            console.error('Error processing file:', file.name, error);
        }
    }

    updateProgress(1, 'Generating zip file...');

    try {
        const content = await zip.generateAsync({ 
            type: 'blob',
            compression: "DEFLATE",
            compressionOptions: { level: 9 },
        }, (metadata) => {
            const percent = metadata.percent.toFixed(1);
            updateProgress(1 + (metadata.percent / 100), `Generating zip file: ${percent}%`);
        });

        updateProgress(2, 'Download starting...');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Give time for the UI to update

        // Calculate new stats
        const originalTotalSize = files.reduce((acc, file) => acc + file.size, 0);
        const newStats = {
            zipSize: content.size,
            newFormat: format.split('/')[1].toUpperCase()
        };

        // Update stats with new information
        updateConversionStats(originalTotalSize, newStats);

        saveAs(content, 'converted_images.zip');
    } catch (error) {
        console.error('Error generating zip file:', error);
        updateProgress(2, 'Error: Failed to generate zip file');
    }

    convertBtn.disabled = false;
    await new Promise(resolve => setTimeout(resolve, 2000)); // Keep progress visible for 2 seconds
    progressSection.classList.add('hidden');
}

async function convertImage(file, format) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(resolve, format, 0.9);
        };
        img.onerror = reject;
        img.src = URL.createObjectURL(file);
    });
}

async function convertSvg(file, format) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const scale = 2; // Increase resolution
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            const ctx = canvas.getContext('2d');
            ctx.scale(scale, scale);
            ctx.drawImage(img, 0, 0);
            canvas.toBlob(resolve, format, 0.9);
        };
        img.onerror = reject;
        const reader = new FileReader();
        reader.onload = (e) => {
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function updateProgress(percentage, message) {
    const percent = Math.min(Math.round(percentage * 100), 100);
    progressBar.style.width = `${percent}%`;
    progressText.textContent = message || `${percent}% Complete`;
}

// Add a subtle hover effect to the drop area
dropArea.addEventListener('mouseenter', () => {
    gsap.to(dropArea, { scale: 1.02, duration: 0.3, ease: "power2.out" });
});

dropArea.addEventListener('mouseleave', () => {
    gsap.to(dropArea, { scale: 1, duration: 0.3, ease: "power2.out" });
});

// Add a subtle animation to the page load
window.addEventListener('load', () => {
    gsap.from('main > *', { 
        opacity: 0, 
        y: 20, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: "power3.out"
    });
});