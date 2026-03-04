import { a as attr, c as stringify, d as escape_html, f as bind_props, h as head, e as ensure_array_like, b as attr_class } from "../../../chunks/index.js";
function PieceCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let piece = $$props["piece"];
    $$renderer2.push(`<a${attr("href", `/pieces/${stringify(piece.slug)}`)} class="card svelte-fojkdg">`);
    if (piece.images[0]) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<enhanced:img${attr("src", piece.images[0])}${attr("alt", piece.title)}></enhanced:img>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="info svelte-fojkdg"><h3>${escape_html(piece.title)}</h3> `);
    if (piece.price) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="price">$${escape_html(piece.price)}</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (!piece.available) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<span class="sold svelte-fojkdg">Sold</span>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></a>`);
    bind_props($$props, { piece });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filtered;
    let data = $$props["data"];
    const categories = ["all", "bowl", "vase", "mug", "plate", "other"];
    let selected = "all";
    let showAvailableOnly = false;
    filtered = data.pieces.filter((p) => {
      const matchCategory = selected === "all";
      const matchAvailable = !showAvailableOnly;
      return matchCategory && matchAvailable;
    });
    head("9yce9s", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Pieces</title>`);
      });
    });
    $$renderer2.push(`<main class="svelte-9yce9s"><h1 class="svelte-9yce9s">Pieces</h1> <div class="filters svelte-9yce9s"><div class="categories svelte-9yce9s"><!--[-->`);
    const each_array = ensure_array_like(categories);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let cat = each_array[$$index];
      $$renderer2.push(`<button${attr_class("svelte-9yce9s", void 0, { "active": selected === cat })}>${escape_html(cat)}</button>`);
    }
    $$renderer2.push(`<!--]--></div> <label class="available-toggle"><input type="checkbox"${attr("checked", showAvailableOnly, true)}/> Available only</label></div> `);
    if (filtered.length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<p class="empty svelte-9yce9s">No pieces found.</p>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="grid svelte-9yce9s"><!--[-->`);
      const each_array_1 = ensure_array_like(filtered);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let piece = each_array_1[$$index_1];
        PieceCard($$renderer2, {
          piece: {
            slug: piece.slug,
            title: piece.entry.title,
            price: piece.entry.price,
            available: piece.entry.available,
            images: piece.entry.images,
            category: piece.entry.category
          }
        });
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></main>`);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
