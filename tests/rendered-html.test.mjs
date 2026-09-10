import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the OrangeApple navigation prototype", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /橘子蘋果｜全站導覽與 Footer 改版原型/);
  assert.match(html, /class="site-header is-hero"/);
  assert.match(html, /陪孩子寫下/);
  assert.match(html, /STICKY NAVIGATION/);
  assert.match(html, /客服服務時間/);
  assert.match(html, /非營隊時間/);
  assert.match(html, /營隊時間/);
  assert.match(html, /09:30–19:00/);
  assert.match(html, /08:00–19:00/);
  // 實體 LINE 2026-09-10 由「週一至週日 09:00–18:00」改為與實體專線同三段時間
  assert.match(html, /09:30–18:00/);
  assert.match(html, /09:30–16:00/);
  assert.match(html, /北投教室、新莊魔力未設地區 LINE，請改撥專線分機 22。/);
  // 南崁教室已停營，桃園區群組名不得再出現
  assert.doesNotMatch(html, /南崁/);
  // 舊的實體 LINE 時段不得復活
  assert.doesNotMatch(html, /09:00–18:00/);
  assert.match(html, /分機 11/);
  assert.match(html, /分機 22/);
  assert.match(html, /總機請按 9/);
  assert.match(html, /查找教室 LINE/);
});
