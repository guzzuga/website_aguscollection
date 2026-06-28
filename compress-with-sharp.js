const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = '/home/ubuntu/websiteAS/public/images';
const BACKUP_DIR = '/home/ubuntu/websiteAS/public/images-backup';

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

// Backup gambar
async function backupImage(imagePath) {
  const relativePath = path.relative(IMAGES_DIR, imagePath);
  const backupPath = path.join(BACKUP_DIR, relativePath);
  const backupDir = path.dirname(backupPath);
  
  fs.mkdirSync(backupDir, { recursive: true });
  fs.copyFileSync(imagePath, backupPath);
  
  return backupPath;
}

// Kompres gambar dengan sharp
async function compressImage(imagePath, settings) {
  const { quality, resize } = settings;
  const ext = path.extname(imagePath).toLowerCase();
  
  try {
    let transformer = sharp(imagePath);
    
    // Resize jika diperlukan
    if (resize) {
      transformer = transformer.resize(resize, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }
    
    // Compress berdasarkan format
    if (ext === '.png') {
      transformer = transformer.png({ quality, compressionLevel: 8 });
    } else {
      transformer = transformer.jpeg({ quality, progressive: true, mozjpeg: true });
    }
    
    // Process dan overwrite
    const outputBuffer = await transformer.toBuffer();
    await sharp(outputBuffer).toFile(imagePath);
    
    return true;
  } catch (e) {
    console.error(`  ❌ Gagal: ${path.basename(imagePath)} - ${e.message}`);
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
  console.log('🖼️  IMAGE COMPRESSION WITH SHARP\n');
  console.log('='.repeat(50));
  
  // Get all images
  console.log('📂 Scanning images...');
  const images = getAllImages(IMAGES_DIR);
  console.log(`✅ Ditemukan ${images.length} gambar\n`);
  
  if (images.length === 0) {
    console.log('Tidak ada gambar untuk dikompres.');
    return;
  }
  
  // Backup all images first
  console.log('💾 Backing up semua gambar...');
  let backupCount = 0;
  let backupSize = 0;
  
  for (const img of images) {
    try {
      await backupImage(img);
      backupCount++;
      backupSize += getFileSize(img);
    } catch (e) {
      console.error(`  ❌ Backup gagal: ${path.basename(img)}`);
    }
  }
  
  console.log(`✅ ${backupCount}/${images.length} gambar di-backup`);
  console.log(`📊 Total ukuran backup: ${formatBytes(backupSize)}\n`);
  
  // Compress images
  console.log('🗜️  Mengompres gambar...\n');
  
  let compressedCount = 0;
  let totalSaved = 0;
  let totalOriginal = 0;
  
  for (const img of images) {
    const originalSize = getFileSize(img);
    const settings = getQualitySetting(img);
    const folder = path.basename(path.dirname(img));
    const relPath = path.relative(IMAGES_DIR, img);
    
    console.log(`  📷 ${relPath}`);
    console.log(`     Settings: Q:${settings.quality}, Resize:${settings.resize}px`);
    
    if (await compressImage(img, settings)) {
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
  }
  
  const totalPercent = totalOriginal > 0 ? ((totalSaved/totalOriginal)*100).toFixed(1) : 0;
  
  console.log(`\n✅ ${compressedCount}/${images.length} gambar dikompres`);
  console.log(`💾 Total dihemat: ${formatBytes(totalSaved)} (${totalPercent}%)`);
  console.log(`📊 Original: ${formatBytes(totalOriginal)} → Compressed: ${formatBytes(totalOriginal - totalSaved)}\n`);
  
  console.log('='.repeat(50));
  console.log('✅ SELESAI!\n');
  console.log('📁 Backup location:', BACKUP_DIR);
  console.log('🌐 Images location:', IMAGES_DIR);
  console.log('\n💡 Tips: Clear browser cache (Ctrl+Shift+R) untuk lihat hasil!\n');
}

main().catch(console.error);