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
  assert.match(html, /週一至週日/);
  assert.match(html, /09:00–18:00/);
  assert.match(html, /查找教室 LINE/);
});
