import initWasm, { extract as wasmExtract, initSync as initWasmSync } from "./pkg/oxide_wasm.js";

export function extract(input) {
  if (typeof input !== "string") {
    throw new TypeError("input must be a non-empty string");
  }
  return wasmExtract(input);
}

export function initSync(module) {
  return initWasmSync({ module });
}

export async function init(module_or_path) {
  const importUrl = import.meta.url;
  if (!module_or_path && importUrl.startsWith("file://")) {
    const { pathname: filename } = new URL("./pkg/oxide_wasm_bg.wasm", importUrl);
    let wasmData;
    if (globalThis.Deno) {
      wasmData = await Deno.readFile(filename);
    } else if (globalThis.Bun) {
      wasmData = await Bun.file(filename).arrayBuffer();
    } else {
      const moduleSpecifier = `node:fs/promises`;
      const fsPromise = await import(moduleSpecifier); // <- use variable to skip deno-lsp analyzing
      wasmData = await fsPromise.readFile(filename);
    }
    initWasmSync({ module: wasmData });
    return;
  }
  const esmshBaseUrl = "https://esm.sh/oxide-wasm@";
  if (!module_or_path && importUrl.startsWith(esmshBaseUrl)) {
    const version = importUrl.slice(esmshBaseUrl.length).split("/", 1)[0];
    module_or_path = esmshBaseUrl + version + "/pkg/oxide_wasm_bg.wasm";
  }
  return initWasm(module_or_path ? { module_or_path } : undefined);
}

export default init;
