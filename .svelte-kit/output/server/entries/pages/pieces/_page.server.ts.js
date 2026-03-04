import { createReader } from "@keystatic/core/reader";
import { c as config } from "../../../chunks/keystatic.config.js";
async function load() {
  const reader = createReader(process.cwd(), config);
  const pieces = await reader.collections.pieces.all();
  return { pieces };
}
export {
  load
};
