import { execSync } from 'child_process';
import { globSync } from 'glob';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

// CONFIGURACIÓN DE RUTAS
const INPUT_DIR = './raw_assets';  // Donde pones tus archivos de Blender
const OUTPUT_DIR = './public/assets'; // Donde saldrán optimizados

// Asegurar que existe el directorio de salida
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// AGREGAR KTX AL PATH
const ktxBin = path.resolve('./scripts/ktx/KTX-Software-4.4.2-Linux-x86_64/bin');
if (fs.existsSync(ktxBin)) {
    console.log(`🔧 Agregando KTX al PATH: ${ktxBin}`);
    process.env.PATH = `${ktxBin}${path.delimiter}${process.env.PATH}`;
} else {
    console.warn('⚠️ No se encontró la carpeta bin de KTX-Software en scripts/ktx. Asegúrate de tenerlo instalado en el sistema o descargado localmente.');
}

console.log('🚀 Iniciando Pipeline de Optimización...\n');

// ---------------------------------------------------------
// 1. PROCESAR MODELOS 3D (GLB)
// Documentación: "Compresses embeded texture with etc1s --quality 255"
// ---------------------------------------------------------
const glbFiles = globSync(`${INPUT_DIR}/**/*.glb`);

glbFiles.forEach(file => {
    const fileName = path.basename(file);
    const output = path.join(OUTPUT_DIR, fileName);

    console.log(`📦 Optimizando Modelo: ${fileName}`);

    // Usamos gltf-transform con compresión ETC1S (formato GPU friendly)
    try {
        // Nota: --quality 255 es la máxima calidad
        execSync(`gltf-transform etc1s "${file}" "${output}" --quality 255`, { stdio: 'inherit' });
    } catch (error) {
        console.error(`❌ Error optimizando ${fileName}`);
    }
});

// ---------------------------------------------------------
// 2. PROCESAR TEXTURAS (PNG/JPG -> KTX2)
// Documentación: "Compresses to --encode etc1s --qlevel 255"
// ---------------------------------------------------------
const textures = globSync(`${INPUT_DIR}/**/*.{png,jpg}`);

// Filtramos para no procesar UI aquí, si las tienes separadas
const textureFiles = textures.filter(f => !f.includes('/ui/'));

textureFiles.forEach(file => {
    const fileName = path.basename(file, path.extname(file));
    // Creamos carpeta de texturas si no existe en output
    const outFolder = path.join(OUTPUT_DIR, 'textures');
    if (!fs.existsSync(outFolder)) fs.mkdirSync(outFolder, { recursive: true });

    const output = path.join(outFolder, `${fileName}.ktx2`);

    console.log(`🎨 Convirtiendo Textura a KTX2: ${fileName}`);

    try {
        // Comando toktx (requiere haber instalado KTX-Software)
        execSync(`toktx --encode etc1s --qlevel 255 "${output}" "${file}"`);
    } catch (error) {
        console.error(`❌ Error convirtiendo textura ${fileName}. Asegúrate de tener KTX-Software instalado.`);
    }
});

// ---------------------------------------------------------
// 3. PROCESAR UI (PNG -> WebP)
// Documentación: "Compresses to WebP"
// ---------------------------------------------------------
const uiFiles = globSync(`${INPUT_DIR}/ui/**/*.{png,jpg}`);

for (const file of uiFiles) {
    const fileName = path.basename(file, path.extname(file));
    const outFolder = path.join(OUTPUT_DIR, 'ui');
    if (!fs.existsSync(outFolder)) fs.mkdirSync(outFolder, { recursive: true });

    const output = path.join(outFolder, `${fileName}.webp`);

    console.log(`🖼️  Convirtiendo UI a WebP: ${fileName}`);

    try {
        await sharp(file)
            .webp({ quality: 80 })
            .toFile(output);
    } catch (error) {
        console.error(`❌ Error convirtiendo UI ${fileName}`, error);
    }
}

console.log('\n✅ ¡Proceso finalizado! Tus assets están listos en /public/assets');