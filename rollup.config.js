import { createRollupConfig } from "./rollup.createConfig";

export default createRollupConfig((config) => {
  return {
    ...config,
    input: "src/main.ts",
  };
});
