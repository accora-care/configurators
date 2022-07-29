import { createRollupConfigEmbed } from "./rollup.createConfig";

export default createRollupConfigEmbed((config) => {
  return {
    ...config,
    input: "src/floorbed1/embed.ts",
    output: {
      sourcemap: true,
      format: "umd",
      exports: "named",
      name: "Floorbed1",
      file: "public/floorbed1/floorbed1-configurator.js",
    },
  };
});
