import init, { extract } from "./index.mjs";

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
  await init();
  await test();
}
