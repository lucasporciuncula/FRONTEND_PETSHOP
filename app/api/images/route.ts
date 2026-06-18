// app/api/images/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const productsDir = path.join(process.cwd(), 'public/images/products');

  // 1. Proteção: Verifica se a pasta realmente existe antes de ler
  if (!fs.existsSync(productsDir)) {
    console.error(`[API ERRO] A pasta não foi encontrada em: ${productsDir}`);
    return NextResponse.json({ 
      error: 'Diretório de imagens não encontrado no servidor.',
      pathProcurado: productsDir 
    }, { status: 404 });
  }

  
    const animals = fs.readdirSync(productsDir);
    const allImages: { animal: string; filename: string }[] = [];

    animals.forEach((animal) => {
      const animalDir = path.join(productsDir, animal);

      if (fs.statSync(animalDir).isDirectory()) {
        const files = fs.readdirSync(animalDir);
        const images = files.filter((file) =>
          /\.(jpg|jpeg|png|webp|avif)$/i.test(file)
        );

        images.forEach((img) => {
          allImages.push({
            animal: animal,
            filename: img.replace(/\.[^/.]+$/, ""), 
          });
        });
      }
    });

    return NextResponse.json(allImages);
  
}