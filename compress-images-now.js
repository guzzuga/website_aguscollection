const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const IMAGES_DIR = '/home/ubuntu/websiteAS/public/images';
const SHARP_CLI = '/home/ubuntu/.npm-global/bin/sharp';

// Quality settings berdasarkan folder
const QUALITY_SETTINGS = {
  'hero': { quality: 85, resize: 1920 },
  'categories': { quality: 80, resize: 800 },
  'products': { quality: 80, resize: 800 },
  'testimonials': { quality: 75, resize: 400 },
  'team': { quality: 75, resize: 400 },
  'gallery': { quality: 75, resize: 1200 },
  'logo': { quality: 90, resize: 256 },
  'default': { quality: 80, resize: 1200 }
};

// Dapatkan semua file gambar
function getAllImages(dir) {
  const images = [];
  
  function walk(currentDir) {
    const files = fs.readdirSync(currentDir);
    
    files.forEach(file => {
      const fullPath = path.join(currentDir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
        images.push(fullPath);
      }
    });
  }
  
  walk(dir);
  return images;
}

// Dapatkan quality setting berdasarkan path
function getQualitySetting(imagePath) {
  const relativePath = path.relative(IMAGES_DIR, imagePath);
  const folder = relativePath.split(path.sep)[0].toLowerCase();
  
  return QUALITY_SETTINGS[folder] || QUALITY_SETTINGS.default;
}

// Kompres gambar dengan sharp
function compressImage(imagePath, settings) {
  const { quality, resize } = settings;
  
  try {
    const ext = path.extname(imagePath).toLowerCase();
    const outputArgs = ext === '.png' 
      ? `png -q ${quality}`
      : `jpeg -q ${quality}`;
    
    const resizeArg = resize ? `-r ${resize}x` : '';
    
    execSync(
      `${SHARP_CLI} "${imagePath}" ${resizeArg} ${outputArgs} -o "${imagePath}"`,
      { stdio: 'pipe', maxBuffer: 1024 * 1024 * 100 }
    );
    
    return true;
  } catch (e) {
    console.error(`  ❌ Gagal: ${path.basename(imagePath)}`);
    return false;
  }
}

// Hitung ukuran file
function getFileSize(filePath) {
  return fs.statSync(filePath).size;
}

// Format bytes ke human readable
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Main execution
async function main() {
  console.log('🖼️  IMAGE COMPRESSION SCRIPT\n');
  console.log('=' .repeat(50));
  
  // Get all images
  console.log('📂 Scanning images...');
  const images = getAllImages(IMAGES_DIR);
  console.log(`✅ Ditemukan ${images.length} gambar\n`);
  
  if (images.length === 0) {
    console.log('Tidak ada gambar untuk dikompres.');
    return;
  }
  
  // Compress images
  console.log('🗜️  Mengompres gambar...\n');
  
  let compressedCount = 0;
  let totalSaved = 0;
  let totalOriginal = 0;
  
  images.forEach(img => {
    const originalSize = getFileSize(img);
    const settings = getQualitySetting(img);
    const folder = path.basename(path.dirname(img));
    const relPath = path.relative(IMAGES_DIR, img);
    
    console.log(`  📷 ${relPath}`);
    console.log(`     Settings: Q:${settings.quality}, Resize:${settings.resize}px`);
    
    if (compressImage(img, settings)) {
      const newSize = getFileSize(img);
      const saved = originalSize - newSize;
      const percent = ((saved / originalSize) * 100).toFixed(1);
      
      compressedCount++;
      totalSaved += saved;
      totalOriginal += originalSize;
      
      console.log(`     ✓ ${formatBytes(originalSize)} → ${formatBytes(newSize)} (-${percent}%)`);
    } else {
      totalOriginal += originalSize;
    }
  });
  
  const totalPercent = ((totalSaved/totalOriginal)*100).toFixed(1);
  
  console.log(`\n✅ ${compressedCount}/${images.length} gambar dikompres`);
  console.log(`💾 Total dihemat: ${formatBytes(totalSaved)} (${totalPercent}%)`);
  console.log(`📊 Original: ${formatBytes(totalOriginal)} → Compressed: ${formatBytes(totalOriginal - totalSaved)}\n`);
  
  console.log('='.repeat(50));
  console.log('✅ SELESAI!\n');
  console.log('📁 Backup location: /home/ubuntu/websiteAS/public/images-backup');
  console.log('🌐 Images location: /home/ubuntu/websiteAS/public/images');
  console.log('\n💡 Tips: Clear browser cache (Ctrl+Shift+R) untuk lihat hasil!\n');
}

main().catch(console.error);