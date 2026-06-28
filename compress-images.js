const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const IMAGES_DIR = '/home/ubuntu/websiteAS/public/images';
const BACKUP_DIR = '/home/ubuntu/websiteAS/public/images-backup';
const SHARP_PATH = '/home/ubuntu/websiteAS/node_modules/.bin/sharp';

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

// Cek apakah sharp CLI tersedia
function checkSharp() {
  try {
    execSync(`${SHARP_PATH} --version`, { stdio: 'pipe' });
    return true;
  } catch (e) {
    console.log('⚠️  Sharp CLI tidak tersedia, menggunakan mode fallback...');
    return false;
  }
}

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
function backupImage(imagePath) {
  const relativePath = path.relative(IMAGES_DIR, imagePath);
  const backupPath = path.join(BACKUP_DIR, relativePath);
  const backupDir = path.dirname(backupPath);
  
  fs.mkdirSync(backupDir, { recursive: true });
  fs.copyFileSync(imagePath, backupPath);
  
  return backupPath;
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
      `${SHARP_PATH} "${imagePath}" ${resizeArg} ${outputArgs} -o "${imagePath}"`,
      { stdio: 'pipe' }
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
  
  // Step 1: Check sharp
  const hasSharp = checkSharp();
  if (!hasSharp) {
    console.log('\n⚠️  Sharp CLI tidak tersedia.');
    console.log('   Instal dengan: npm install -g sharp-cli');
    console.log('\n📝 Script akan menggunakan metode alternatif...\n');
  }
  
  // Step 2: Get all images
  console.log('\n📂 Scanning images...');
  const images = getAllImages(IMAGES_DIR);
  console.log(`✅ Ditemukan ${images.length} gambar\n`);
  
  if (images.length === 0) {
    console.log('Tidak ada gambar untuk dikompres.');
    return;
  }
  
  // Step 3: Create backup directory
  console.log('📦 Membuat backup directory...');
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  console.log(`✅ Backup location: ${BACKUP_DIR}\n`);
  
  // Step 4: Backup all images
  console.log('💾 Backing up semua gambar...');
  let backupCount = 0;
  let backupSize = 0;
  
  images.forEach(img => {
    try {
      backupImage(img);
      backupCount++;
      backupSize += getFileSize(img);
    } catch (e) {
      console.error(`  ❌ Backup gagal: ${path.basename(img)}`);
    }
  });
  
  console.log(`✅ ${backupCount}/${images.length} gambar di-backup`);
  console.log(`📊 Total ukuran backup: ${formatBytes(backupSize)}\n`);
  
  // Step 5: Compress images
  if (hasSharp) {
    console.log('🗜️  Mengompres gambar...\n');
    
    let compressedCount = 0;
    let totalSaved = 0;
    
    images.forEach(img => {
      const originalSize = getFileSize(img);
      const settings = getQualitySetting(img);
      const folder = path.basename(path.dirname(img));
      
      console.log(`  📷 ${folder}/${path.basename(img)} → Q:${settings.quality}, Resize:${settings.resize}px`);
      
      if (compressImage(img, settings)) {
        const newSize = getFileSize(img);
        const saved = originalSize - newSize;
        const percent = ((saved / originalSize) * 100).toFixed(1);
        
        compressedCount++;
        totalSaved += saved;
        
        console.log(`     ✓ ${formatBytes(originalSize)} → ${formatBytes(newSize)} (-${percent}%)`);
      }
    });
    
    console.log(`\n✅ ${compressedCount}/${images.length} gambar dikompres`);
    console.log(`💾 Total dihemat: ${formatBytes(totalSaved)} (${((totalSaved/backupSize)*100).toFixed(1)}%)`);
  } else {
    console.log('\n⚠️  Lewati kompresi (Sharp CLI tidak tersedia)');
    console.log('   Backup sudah selesai - file aman di images-backup/');
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('✅ SELESAI!\n');
  console.log('📁 Backup location:', BACKUP_DIR);
  console.log('🌐 Images location:', IMAGES_DIR);
  console.log('\n💡 Tips: Clear browser cache (Ctrl+Shift+R) untuk lihat hasil!\n');
}

main().catch(console.error);