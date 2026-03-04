import { createReader } from "@keystatic/core/reader";
import { c as config } from "../../../../chunks/keystatic.config.js";
async function load({ params }) {
  const reader = createReader(process.cwd(), config);
  const piece = await reader.collections.pieces.read(params.slug);
  return { piece, slug: params.slug };
}
export {
  load
};
