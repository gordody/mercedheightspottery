import { B as BROWSER } from "./false.js";
let building = false;
let prerendering = false;
function set_building() {
  building = true;
}
function set_prerendering() {
  prerendering = true;
}
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  browser: BROWSER,
  get building() {
    return building;
  },
  dev: BROWSER
}, Symbol.toStringTag, { value: "Module" }));
export {
  set_prerendering as a,
  index as i,
  prerendering as p,
  set_building as s
};
