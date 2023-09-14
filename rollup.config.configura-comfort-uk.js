import { createRollupConfigEmbed } from "./rollup.createConfig";

export default createRollupConfigEmbed((config) => {
  return {
    ...config,
    input: "src/configura-comfort-uk/embed.ts",
    output: {
      sourcemap: true,
      format: "umd",
      exports: "named",
      name: "ConfiguraComfortUK",
      file: "public/configura-comfort-uk/configura-comfort-configurator.js",
    },
  };
});
