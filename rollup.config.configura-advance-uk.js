import { createRollupConfigEmbed } from "./rollup.createConfig";

export default createRollupConfigEmbed((config) => {
  return {
    ...config,
    input: "src/configura-advance-uk/embed.ts",
    output: {
      sourcemap: true,
      format: "umd",
      exports: "named",
      name: "ConfiguraAdvanceUK",
      file: "public/configura-advance-uk/configura-advance-uk-configurator.js",
    },
  };
});
