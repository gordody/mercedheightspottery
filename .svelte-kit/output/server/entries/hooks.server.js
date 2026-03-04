import { error } from "@sveltejs/kit";
import { makeGenericAPIRouteHandler } from "@keystatic/core/api/generic";
import { readFile, readdir, mkdir, cp } from "node:fs/promises";
import { resolve, basename } from "node:path";
import { c as config } from "../chunks/keystatic.config.js";
function until(isReady, checkInterval = 400, timeout = 15e3) {
  const initial = Date.now();
  return new Promise((resolve2, reject) => {
    let interval = setInterval(async () => {
      if (!await isReady()) {
        if (Date.now() - initial > timeout) {
          reject("[until] Timeout: Failed to resolve within allowed time");
        }
        return;
      }
      clearInterval(interval);
      resolve2();
    }, checkInterval);
  });
}
const keystaticRoutePrefix = "/keystatic";
const keystaticAPIRoutePrefix = "/api/keystatic";
function tryOrUndefined(fn) {
  try {
    return fn();
  } catch {
    return void 0;
  }
}
async function handleKeystatic(apiConfig) {
  const { env } = await import("../chunks/private.js").then((n) => n._);
  const handleAPI = makeGenericAPIRouteHandler(
    {
      ...apiConfig,
      clientId: apiConfig.clientId ?? tryOrUndefined(() => {
        return env.KEYSTATIC_GITHUB_CLIENT_ID;
      }),
      clientSecret: apiConfig.clientSecret ?? tryOrUndefined(() => {
        return env.KEYSTATIC_GITHUB_CLIENT_SECRET;
      }),
      secret: apiConfig.secret ?? tryOrUndefined(() => {
        return env.KEYSTATIC_SECRET;
      })
    },
    { slugEnvName: "PUBLIC_KEYSTATIC_GITHUB_APP_SLUG" }
  );
  const projectRoot = process.cwd();
  const devDir = resolve(projectRoot, ".svelte-kit/keystatic");
  const prodDir = resolve(projectRoot, ".svelte-kit/output/client/");
  const cmsOutDir = process.env.NODE_ENV !== "development" ? prodDir : devDir;
  const cmsHTMLFileName = "keystatic.html";
  const htmlFile = resolve(cmsOutDir, cmsHTMLFileName);
  async function initCMS() {
    await until(async () => {
      let entries = await readdir(cmsOutDir, "utf-8");
      let hasCMSFiles = entries.includes(cmsHTMLFileName);
      if (!hasCMSFiles) {
        await mkdir(cmsOutDir, { recursive: true });
        await cp(devDir, cmsOutDir, { recursive: true });
        entries = await readdir(cmsOutDir, "utf-8");
        hasCMSFiles = entries.includes(cmsHTMLFileName);
      }
      return hasCMSFiles;
    });
    return async (event) => {
      const { building } = await import("../chunks/index2.js").then((n) => n.i);
      if (building) {
        throw error(400, "Prerendering is disabled for Keystatic CMS");
      }
      if (event.url.pathname.endsWith(".js")) {
        return new Response(
          await readFile(resolve(cmsOutDir, basename(event.url.pathname)), "utf-8"),
          { headers: { "Content-Type": "application/javascript" } }
        );
      }
      return new Response(await readFile(htmlFile, "utf-8"), {
        headers: { "Content-Type": "text/html" }
      });
    };
  }
  let renderUI;
  return async ({ event, resolve: resolve2 }) => {
    if (event.url.pathname.startsWith(keystaticRoutePrefix)) {
      if (!renderUI) {
        renderUI = await initCMS();
      }
      return renderUI(event);
    } else if (event.url.pathname.startsWith(keystaticAPIRoutePrefix)) {
      const { body, ...responseInit } = await handleAPI(event.request);
      return new Response(body, responseInit);
    }
    return resolve2(event);
  };
}
const handle = await handleKeystatic({ config });
export {
  handle
};
