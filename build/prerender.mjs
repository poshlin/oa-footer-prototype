// 把 SSR 出來的首頁存成靜態 index.html，讓 dist/client 整包可以直接放上 GitHub Pages。
// 這個原型只有 "/" 一頁，所以預渲染一次就夠；有新頁面時把路徑加進 ROUTES。
import { writeFile } from "node:fs/promises";
import path from "node:path";

const ROUTES = ["/"];
// GitHub Pages 的專案站掛在 /<repo>/ 底下，資源絕對路徑要跟著加前綴
const BASE = process.env.PAGES_BASE ?? "";

async function render(pathname) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("prerender", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const res = await worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  if (res.status !== 200) throw new Error(`${pathname} 回傳 ${res.status}，預渲染中止`);
  return res.text();
}

for (const route of ROUTES) {
  let html = await render(route);
  if (BASE) {
    // 只改開頭是單一斜線的資源路徑，不動 https:// 外部連結
    html = html
      .replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`)
      .replace(/imageSrcSet="\/(?!\/)/g, `imageSrcSet="${BASE}/`)
      .replace(/srcSet="\/(?!\/)/g, `srcSet="${BASE}/`);
  }
  const out = path.join("dist/client", route === "/" ? "index.html" : `${route.replace(/^\//, "")}/index.html`);
  await writeFile(out, html, "utf8");
  console.log(`✓ ${route} → ${out}  ${html.length.toLocaleString()} 字元${BASE ? `（base: ${BASE}）` : ""}`);
}
