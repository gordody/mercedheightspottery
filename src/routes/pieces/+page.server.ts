import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../keystatic.config';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import fs from 'fs';

export async function load() {
  // Resolve root directory from current module URL to work on both local and Vercel
  const currentFile = fileURLToPath(import.meta.url);
  const currentDir = dirname(currentFile);
  // Navigate from src/routes/pieces to root: ../../../
  const rootDir = join(currentDir, '../../../');

  const reader = createReader(rootDir, keystaticConfig);
  const pieces = await reader.collections.pieces.all();

  console.log("Created reader=", reader, "for config=", keystaticConfig);

  // list the files of process.cwd()/content/pieces recursively
  const piecesFolder = `${process.cwd()}`;
  const fnListDir = (dir: string) => {
    console.log("Reading directory=", dir);
    fs.readdir(dir, { withFileTypes: true }, (err, entries) => {
      if (err) {
        console.error("Error reading directory=", dir, "error=", err);
        return;
      }
      entries.forEach(entry => {
        const fullPath = `${dir}/${entry.name}`;
        if (entry.isDirectory() && entry.name !== "node_modules" && !entry.name.startsWith(".")) {
          fnListDir(fullPath); // Recurse into subdirectory
        } else {
          console.log("Found file=", fullPath);
        }
      });
    });
  }
  fnListDir(piecesFolder);

  const firstPiece = (pieces && pieces.length && pieces.length > 0) ? pieces[0] : null;
  const firstEntry = firstPiece ? firstPiece.entry : null;
  const firstImages = firstEntry ? firstEntry.images : [];

  console.log("Loaded pieces from=", process.cwd(), 
//    "pieces=", pieces, 
    "firstPiece=", firstPiece, 
    "firstEntry=", firstEntry, 
    "images=", firstImages.join(", "));

  return { pieces };
}
