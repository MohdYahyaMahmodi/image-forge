# Image Forge

<div align="center">
  <img src="images/home.png" alt="Image Forge Home" width="100%" />
</div>

<p align="center">
  <a href="https://mohdyahyamahmodi.github.io/image-forge/" target="_blank"><strong>Demo Site</strong></a> |
  <a href="#key-features">Features</a> |
  <a href="#how-it-works">How It Works</a> |
  <a href="#getting-started">Getting Started</a> |
  <a href="#usage">Usage</a> |
  <a href="#performance">Performance</a> |
  <a href="#upcoming-features">Roadmap</a> |
  <a href="#faq">FAQ</a> |
  <a href="#license">License</a> |
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" alt="Version" />
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License" />
  <a href="https://twitter.com/mohdmahmodi" target="_blank">
    <img src="https://img.shields.io/twitter/follow/mohdmahmodi.svg?style=social" alt="Follow @mohdmahmodi" />
  </a>
</p>

<p align="center">
  <strong>Advanced Client-Side Image Conversion and Optimization Tool</strong>
</p>

---

## Key Features

- **Universal Input Support**: Accept any image format supported by your browser, including JPEG, PNG, GIF, WebP, SVG, and more.
- **Versatile Output Formats**: Convert to JPEG, PNG, or WebP with customizable quality settings.
- **Client-Side Processing**: All conversions happen directly in your browser, ensuring speed and privacy.
- **Bulk Conversion**: Process hundreds of images simultaneously, saving time and effort.
- **Real-time Statistics**: Get instant insights into file sizes, formats, and conversion ratios.
- **Efficient Compression**: Reduce file sizes significantly while maintaining image quality.
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices.
- **Dark Mode**: Optimized for extended use and night-time conversions.
- **Privacy-Focused**: Your images never leave your device, ensuring complete data security.

## How It Works

Image Forge leverages cutting-edge web technologies to provide a seamless image conversion experience:

1. **File Selection**: Drag & drop or select images using the intuitive file picker.
2. **Preview & Analysis**: View your selected images in a sleek carousel and get detailed file information.

<div align="center">
  <img src="images/file-details.png" alt="File Details" width="80%" />
</div>

3. **Conversion Setup**: Choose your desired output format (JPEG, PNG, or WebP) and adjust quality settings if needed.
4. **Processing**: Images are converted client-side using advanced HTML5 Canvas technology and Web Workers for optimal performance.
5. **Compression**: State-of-the-art algorithms optimize file sizes without significant quality loss.
6. **Download**: Converted images are packaged into a convenient zip file for easy downloading and sharing.

## Getting Started

To run Image Forge locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/mohdyahyamahmodi/image-forge.git

# Navigate to the project directory
cd image-forge

# Open index.html in your preferred browser
open index.html
```

No server setup or complex configuration required. Image Forge runs entirely in your browser, ensuring a hassle-free setup process.

## Usage

1. **Upload Images**: 
   - Drag and drop images onto the designated area, or
   - Click "Select Files" to use the file picker

2. **Review Statistics**: 
   Analyze the detailed breakdown of your uploaded images, including total size, formats, and more.

<div align="center">
  <img src="images/stats.png" alt="Image Statistics" width="80%" />
</div>

3. **Choose Format**: 
   Select your desired output format (JPEG, PNG, or WebP) from the dropdown menu. Each format offers unique benefits:
   - JPEG: Best for photographs and complex images with gradients
   - PNG: Ideal for images with transparency or sharp edges
   - WebP: Modern format offering superior compression and quality

4. **Convert**: 
   Click the "Convert Images" button to start processing. Monitor the progress in real-time.

<div align="center">
  <img src="images/progress.png" alt="Conversion Progress" width="80%" />
</div>

5. **Download**: 
   Once conversion is complete, download your optimized images as a zip file and view the conversion results.

<div align="center">
  <img src="images/convertion-results.png" alt="Conversion Results" width="80%" />
</div>

## Performance

Image Forge is designed for efficiency and quality. While performance can vary based on your device's capabilities, here's what you can expect:

- **Bulk Processing**: Successfully tested with 400 images on a low-spec machine
- **Processing Time**: Approximately 30 seconds for 400 images
- **Size Reduction**: Achieve up to 70-90% file size reduction depending on the input images and chosen output format

> **Note**: Actual results may vary depending on the number of images, their sizes, your device's specifications, and browser performance. Image Forge utilizes your device's resources efficiently to provide the best possible performance.

## Upcoming Features

We're constantly working to improve Image Forge and add new capabilities. Here's a preview of some exciting features in development:

- **Image Filters**: Apply a variety of filters to enhance or stylize your images before conversion.
- **Rotate and Flip**: Easily adjust image orientation with rotation and flip tools.
- **Resize Options**: Scale your images up or down to specific dimensions or percentages.
- **AI-Powered Upscaling**: Enhance image resolution using cutting-edge machine learning algorithms.
- **Additional Output Formats**: Support for more specialized formats like AVIF, HEIF, and lossless WebP.
- **Batch Editing**: Apply the same edits to multiple images simultaneously.
- **Advanced Compression Settings**: Fine-tune compression levels for each format to balance quality and file size.
- **Custom Watermarking**: Add text or image watermarks to your converted images.

## FAQ

<details>
<summary><strong>Is there a limit to how many images I can process?</strong></summary>
There's no hard limit set by Image Forge. The practical limit depends on your device's capabilities (RAM, processing power) and browser limitations. We've successfully tested with 400 images on a low-spec machine, but more powerful devices can handle even larger batches.
</details>

<details>
<summary><strong>What input formats are supported?</strong></summary>
Image Forge can accept any image format that your browser supports. This typically includes common formats like JPEG, PNG, GIF, WebP, SVG, and many others. If your browser can display it, Image Forge can likely process it.
</details>

<details>
<summary><strong>What output formats are available?</strong></summary>
Currently, Image Forge supports conversion to three formats: JPEG, PNG, and WebP. These formats offer a good balance of compatibility and efficiency for most use cases. We're constantly evaluating new formats to add based on user needs and browser support.
</details>

<details>
<summary><strong>Is my data safe?</strong></summary>
Absolutely. All processing happens in your browser. Your images never leave your device, ensuring maximum privacy and security. We take data protection seriously and have designed Image Forge with privacy as a top priority.
</details>

<details>
<summary><strong>Can I use Image Forge for commercial projects?</strong></summary>
Yes. Image Forge is released under the MIT License, which allows for both personal and commercial use. Feel free to use it in your projects, both personal and professional. Please refer to the LICENSE file for full details on the terms of use.
</details>

<details>
<summary><strong>How does Image Forge compare to server-based conversion tools?</strong></summary>
Image Forge offers several advantages over server-based tools:
1. Privacy: Your images never leave your device.
2. Speed: No upload/download times, conversions happen instantly.
3. No file size limits: Process as many images as your device can handle.
4. Offline capability: Use Image Forge without an internet connection once the page is loaded.
</details>

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions to Image Forge are always welcome. Whether it's bug fixes, new features, or improvements to the documentation, your help is appreciated.

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

We look forward to your contributions!

---

<div align="center">
  Developed by <a href="https://github.com/mohdyahyamahmodi">Mohd Mahmodi</a>
</div>

<div align="center">
  <a href="https://github.com/mohdyahyamahmodi" target="_blank">
    <img src="https://img.shields.io/github/followers/mohdyahyamahmodi.svg?style=social&label=Follow" alt="Follow on GitHub" />
  </a>
</div>