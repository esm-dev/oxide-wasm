# oxide-wasm

A wasm build for [tailwindcss-oxide](https://github.com/tailwindlabs/tailwindcss/tree/main/crates/oxide).

## Usage

```js
import init, { extract } from "https://esm.sh/@esm.sh/oxide-wasm";

// load oxide-wasm_bg.wasm
await init();

const code = `
<h1 class="text-3xl font-bold underline">
  Hello world!
</h1>
`;
console.log(extract(code));
// [
//   "class",
//   "text-3xl",
//   "font-bold",
//   "underline"
// ]
```

## Development Setup

You will need [rust](https://www.rust-lang.org/tools/install) 1.60+ and
[wasm-pack](https://rustwasm.github.io/wasm-pack/installer/).

## Build

```bash
wasm-pack build --target web --no-pack --release
```
