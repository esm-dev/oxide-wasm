import initWasm, { initSync as initWasmSync, extract as wasmExtract} from "./pkg/oxide_wasm.js";

export function extract(input) {
  if (typeof input !== "string" || input === "") {
    throw new Error("filename is required");
  }
  return wasmExtract(input);
}

export function initSync(module) {
  return initWasmSync({ module });
}

export async function init(module_or_path) {
  const importUrl = import.meta.url;
  if (!module_or_path && importUrl.startsWith("file://") && globalThis.Deno) {
    const wasmUrl = new URL("./pkg/oxide_wasm_bg.wasm", importUrl);
    const wasmBytes = await Deno.readFile(wasmUrl);
    initWasmSync({ module: wasmBytes });
    return;
  }
  const esmshBaseUrl = "https://esm.sh/@esm.sh/oxide-wasm@";
  if (!module_or_path && importUrl.startsWith(esmshBaseUrl)) {
    const version = importUrl.slice(esmshBaseUrl.length).split("/", 1)[0];
    module_or_path = esmshBaseUrl + version + "/pkg/oxide_wasm_bg.wasm";
  }
  return initWasm(module_or_path ? { module_or_path } : undefined);
}

export default init;
