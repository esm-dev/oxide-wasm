import { readFile } from "node:fs/promises";
import { CompressionStream } from "node:stream/web";
import init, { extract } from "./pkg/oxide_wasm.js";

async function load() {
  const wasmData = await readFile(new URL("./pkg/oxide_wasm_bg.wasm", import.meta.url));
  await init({ module_or_path: wasmData });

  let gzSize = 0;
  await new Response(wasmData).body.pipeThrough(new CompressionStream("gzip")).pipeTo(
    new WritableStream({
      write(chunk) {
        gzSize += chunk.byteLength;
      },
    }),
  );

  console.log(
    `%c✔ wasm loaded: ${(wasmData.byteLength / 1024 / 1024).toFixed(2)}MB (gzip: ${Math.ceil(gzSize / 1024)}KB)`,
    "color: green;",
  );
}

async function test() {
  const input = `
    <h1 class="text-3xl font-bold underline">
      Hello World!
    </h1>
  `;
  const output = extract(input);
  if (output.join(" ") !== "class text-3xl font-bold underline") {
    throw new Error("Test failed: output does not match expected result, got: " + output.join(" "));
  }
  console.log("%c✔ test passed", "color: green;");
}

if (import.meta.main || process.argv[1] === new URL(import.meta.url).pathname) {
  await load();
  await test();
}
