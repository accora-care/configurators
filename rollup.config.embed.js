import { createRollupConfig } from "./rollup.createConfig";

export default createRollupConfig({
  input: "src/embed.ts",
  output: {
    sourcemap: true,
    format: "umd",
    name: "EmpresaConfigurator",
    file: "public/embed/embed.js",
  },
});
