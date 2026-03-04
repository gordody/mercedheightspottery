import { h as head, a as attr, e as ensure_array_like, b as attr_class, c as stringify, d as escape_html, f as bind_props } from "../../../../chunks/index.js";
function _page($$renderer, $$props) {
  let data = $$props["data"];
  const { piece, slug } = data;
  let activeImage = 0;
  head("1bop9kq", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>${escape_html(piece.title)}</title>`);
    });
  });
  $$renderer.push(`<main class="svelte-1bop9kq"><a href="/pieces" class="back svelte-1bop9kq">← All pieces</a> <div class="layout svelte-1bop9kq"><div class="images">`);
  if (piece.images.length > 0) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<div class="main-image"><enhanced:img${attr("src", piece.images[activeImage])}${attr("alt", piece.title)}></enhanced:img></div> `);
    if (piece.images.length > 1) {
      $$renderer.push("<!--[0-->");
      $$renderer.push(`<div class="thumbnails svelte-1bop9kq"><!--[-->`);
      const each_array = ensure_array_like(piece.images);
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let img = each_array[i];
        $$renderer.push(`<button${attr_class("svelte-1bop9kq", void 0, { "active": activeImage === i })}><enhanced:img${attr("src", img)}${attr("alt", `${stringify(piece.title)} photo ${stringify(i + 1)}`)}></enhanced:img></button>`);
      }
      $$renderer.push(`<!--]--></div>`);
    } else {
      $$renderer.push("<!--[-1-->");
    }
    $$renderer.push(`<!--]-->`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></div> <div class="details"><h1 class="svelte-1bop9kq">${escape_html(piece.title)}</h1> `);
  if (piece.price) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<p class="price svelte-1bop9kq">$${escape_html(piece.price)}</p>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--> `);
  if (!piece.available) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<span class="sold-badge svelte-1bop9kq">Sold</span>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--> `);
  if (piece.description) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<p class="description svelte-1bop9kq">${escape_html(piece.description)}</p>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--> <dl class="specs svelte-1bop9kq">`);
  if (piece.dimensions) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<dt class="svelte-1bop9kq">Dimensions</dt><dd class="svelte-1bop9kq">${escape_html(piece.dimensions)}</dd>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--> `);
  if (piece.clay) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<dt class="svelte-1bop9kq">Clay</dt><dd class="svelte-1bop9kq">${escape_html(piece.clay)}</dd>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--> `);
  if (piece.glaze) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<dt class="svelte-1bop9kq">Glaze</dt><dd class="svelte-1bop9kq">${escape_html(piece.glaze)}</dd>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--> `);
  if (piece.fired) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<dt class="svelte-1bop9kq">Firing</dt><dd class="svelte-1bop9kq">${escape_html(piece.fired)}</dd>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></dl> `);
  if (piece.available && piece.price) {
    $$renderer.push("<!--[0-->");
    $$renderer.push(`<button class="buy-button snipcart-add-item svelte-1bop9kq"${attr("data-item-id", slug)}${attr("data-item-name", piece.title)}${attr("data-item-price", piece.price)}${attr("data-item-url", `/pieces/${stringify(slug)}`)}${attr("data-item-image", piece.images[0] ?? "")}>Add to cart — $${escape_html(piece.price)}</button>`);
  } else {
    $$renderer.push("<!--[-1-->");
  }
  $$renderer.push(`<!--]--></div></div></main>`);
  bind_props($$props, { data });
}
export {
  _page as default
};
