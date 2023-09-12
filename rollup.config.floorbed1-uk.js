import { createRollupConfigEmbed } from "./rollup.createConfig";

export default createRollupConfigEmbed((config) => {
  return {
    ...config,
    input: "src/floorbed1-uk/embed.ts",
    output: {
      sourcemap: true,
      format: "umd",
      exports: "named",
      name: "Floorbed1UK",
      file: "public/floorbed1-uk/floorbed1-configurator.js",
    },
  };
});
