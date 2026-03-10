import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../../keystatic.config';

import fs from 'fs';

export async function load() {
  const reader = createReader(process.cwd(), keystaticConfig);
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
        if (entry.isDirectory() && entry.name !== "node_modules") {
          fnListDir(fullPath); // Recurse into subdirectory
        } else {
          console.log("Found file=", fullPath);
        }
      });
    });
  }
  fnListDir(piecesFolder);

  const pieces = await reader.collections.pieces.all();
  const firstPiece = (pieces && pieces.length && pieces.length > 0) ? pieces[0] : null;
  const firstEntry = firstPiece ? firstPiece.entry : null;
  const firstImages = firstEntry ? firstEntry.images : [];

  // console.log("Loaded pieces from=", process.cwd(), 
  //   "pieces=", pieces, 
  //   "firstPiece=", firstPiece, 
  //   "firstEntry=", firstEntry, 
  //   "images=", firstImages.join(", "));

  return { pieces };
}
