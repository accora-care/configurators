import { createRollupConfigEmbed } from "./rollup.createConfig";

export default createRollupConfigEmbed((config) => {
  return {
    ...config,
    input: "src/configura-advance/embed.ts",
    output: {
      sourcemap: true,
      format: "umd",
      exports: "named",
      name: "ConfiguraAdvance",
      file: "public/configura-advance/configura-advance-configurator.js",
    },
  };
});
