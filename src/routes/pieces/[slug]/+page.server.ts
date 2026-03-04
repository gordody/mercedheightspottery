import { createReader } from '@keystatic/core/reader';                                                                                                     
import keystaticConfig from '../../../../keystatic.config';                                                                                                
import { error } from '@sveltejs/kit';                                                                                                                     
                                                                                                                                                          
export async function load({ params }) {                                                                                                                   
  const reader = createReader(process.cwd(), keystaticConfig);                                                                                             
  const piece = await reader.collections.pieces.read(params.slug);
                                                                                                                                                          
  return { piece, slug: params.slug };                                                                                                                     
}