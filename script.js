/**
 * Image Forge: Advanced Image Conversion Tool
 * Author: Mohd Mahmodi
 * License: MIT
 *
 * This script handles the client-side functionality of the Image Forge tool,
 * including drag-and-drop file handling, image conversion, and UI updates.
 */

// DOM element references
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
const scrollButton = document.getElementById('scroll-button');
const scrollIcon = document.getElementById('scroll-icon');

// Global variables
let files = []; // Stores the uploaded image files
let swiper; // Reference to the Swiper instance for image carousel

/**
 * Updates the scroll button's appearance based on the current scroll position
 */
function updateScrollButton() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if we're closer to the bottom than to the top
    if (scrollPosition + windowHeight > documentHeight - windowHeight / 2) {
        scrollIcon.classList.add('up');
    } else {
        scrollIcon.classList.remove('up');
    }
}

// Update button state on scroll
window.addEventListener('scroll', updateScrollButton);

/**
 * Handles the scroll button click event
 * Scrolls to top if closer to bottom, and vice versa
 */
scrollButton.addEventListener('click', () => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition + windowHeight > documentHeight - windowHeight / 2) {
        // Scroll to top if we're closer to the bottom
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else {
        // Scroll to bottom if we're closer to the top
        window.scrollTo({
            top: documentHeight,
            behavior: 'smooth'
        });
    }
});

// Initial update of button state
updateScrollButton();

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

// Remove highlight when item is dragged away or dropped
['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false);

// Handle selected files
fileInput.addEventListener('change', handleFiles, false);

// Trigger file selection when the button is clicked
selectFilesBtn.addEventListener('click', () => fileInput.click());

/**
 * Prevents default events
 * @param {Event} e - The event object
 */
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

/**
 * Adds highlight effect to drop area
 */
function highlight() {
    dropArea.classList.add('highlight');
    gsap.to(dropArea, { scale: 1.02, duration: 0.3, ease: "power2.out" });
}

/**
 * Removes highlight effect from drop area
 */
function unhighlight() {
    dropArea.classList.remove('highlight');
    gsap.to(dropArea, { scale: 1, duration: 0.3, ease: "power2.out" });
}

/**
 * Handles dropped files
 * @param {DragEvent} e - The drag event object
 */
function handleDrop(e) {
    const dt = e.dataTransfer;
    const newFiles = [...dt.files];
    handleFiles({ target: { files: newFiles } });
}

/**
 * Processes selected or dropped files
 * @param {Event} e - The event object containing selected files
 */
function handleFiles(e) {
    files = [...e.target.files].filter(file => file.type.startsWith('image/'));
    updatePreview();
    updateFileList();
    updateStats();
}

/**
 * Updates the image preview carousel
 */
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

/**
 * Updates the file list table
 */
function updateFileList() {
    fileListSection.classList.remove('hidden');
    fileList.innerHTML = '';

    files.forEach((file, index) => {
        const row = document.createElement('tr');
        row.className = index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900';
        
        row.innerHTML = `
            <td class="px-4 py-3">
                <img src="${URL.createObjectURL(file)}" alt="${file.name}" title="${file.name}" class="w-10 h-10 object-cover rounded cursor-pointer">
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

/**
 * Updates the image statistics display
 */
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
        { label: 'Total Files', value: files.length, icon: 'fa-images' },
        { label: 'Total Size', value: formatSize(totalSize), icon: 'fa-database' },
        { label: 'Average Size', value: formatSize(avgSize), icon: 'fa-balance-scale' },
        { label: 'Formats', value: Object.entries(formats).map(([format, count]) => `${format}: ${count}`).join(', '), icon: 'fa-file-image' },
    ];

    stats.forEach((stat) => {
        const div = document.createElement('div');
        div.className = 'stats-card';
        div.innerHTML = `
            <i class="fas ${stat.icon} stats-icon"></i>
            <div>
                <p class="stats-label">${stat.label}</p>
                <p class="stats-value">${stat.value}</p>
            </div>
        `;
        imageStats.appendChild(div);
        gsap.from(div, { opacity: 0, y: 10, duration: 0.3, ease: "power3.out" });
    });

    gsap.from(statsSection, { opacity: 0, y: 10, duration: 0.3, ease: "power3.out" });
}

/**
 * Updates the conversion statistics display
 * @param {number} originalSize - Total size of original files
 * @param {Object} newStats - New statistics after conversion
 */
function updateConversionStats(originalSize, newStats) {
    conversionStatsSection.classList.remove('hidden');
    conversionStats.innerHTML = '';

    const sizeChange = ((newStats.zipSize - originalSize) / originalSize * 100).toFixed(2);
    const isReduction = sizeChange < 0;
    const arrowColor = isReduction ? 'text-green-500' : 'text-red-500';
    const arrowDirection = isReduction ? '↓' : '↑';
    const changeDescription = isReduction ? 'Reduction' : 'Increase';

    const sizeComparisonDiv = document.createElement('div');
    sizeComparisonDiv.className = 'conversion-card';
    sizeComparisonDiv.innerHTML = `
        <h3 class="conversion-title">Size Comparison</h3>
        <div class="flex items-center justify-between">
            <div class="text-center">
                <p class="stats-label">Original</p>
                <p class="conversion-value text-white">${formatSize(originalSize)}</p>
            </div>
            <div class="text-center">
                <i class="fas fa-arrow-right ${arrowColor} text-2xl"></i>
            </div>
            <div class="text-center">
                <p class="stats-label">New</p>
                <p class="conversion-value text-white">${formatSize(newStats.zipSize)}</p>
            </div>
        </div>
        <div class="mt-2 text-center">
            <p class="text-sm">
                <span class="font-semibold ${arrowColor}">${Math.abs(sizeChange)}% ${changeDescription}</span>
                <span class="text-xl ${arrowColor}">${arrowDirection}</span>
            </p>
        </div>
    `;
    conversionStats.appendChild(sizeComparisonDiv);

    const formatDiv = document.createElement('div');
    formatDiv.className = 'conversion-card mt-3';
    formatDiv.innerHTML = `
        <h3 class="conversion-title">New Format</h3>
        <p class="conversion-value text-blue-400">${newStats.newFormat}</p>
    `;
    conversionStats.appendChild(formatDiv);

    gsap.from(conversionStatsSection.children, { 
        opacity: 0, 
        y: 10, 
        duration: 0.3, 
        stagger: 0.1, 
        ease: "power3.out" 
    });
}

/**
 * Formats file size in bytes to a human-readable string
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
function formatSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Add click event listener to the convert button
convertBtn.addEventListener('click', startConversion);

/**
 * Starts the image conversion process
 */
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

        // Trigger the download of the zip file
        saveAs(content, 'converted_images.zip');
    } catch (error) {
        console.error('Error generating zip file:', error);
        updateProgress(2, 'Error: Failed to generate zip file');
    }

    convertBtn.disabled = false;
    await new Promise(resolve => setTimeout(resolve, 2000)); // Keep progress visible for 2 seconds
    progressSection.classList.add('hidden');
}

/**
 * Converts a single image file to the specified format
 * @param {File} file - The image file to convert
 * @param {string} format - The target format (e.g., 'image/jpeg')
 * @returns {Promise<Blob>} A promise that resolves with the converted image blob
 */
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

/**
 * Converts an SVG file to the specified format
 * @param {File} file - The SVG file to convert
 * @param {string} format - The target format (e.g., 'image/png')
 * @returns {Promise<Blob>} A promise that resolves with the converted image blob
 */
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

/**
 * Updates the progress bar and text
 * @param {number} percentage - The progress percentage (0 to 2)
 * @param {string} message - The progress message to display
 */
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
  // Update scroll button state after animations are complete
  setTimeout(updateScrollButton, 1000);
});

// Call updateScrollButton immediately when the script runs
updateScrollButton();