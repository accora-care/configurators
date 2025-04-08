import { createRollupConfigEmbed } from "./rollup.createConfig";

export default createRollupConfigEmbed((config) => {
  return {
    ...config,
    input: "src/contesa/embed.ts",
    output: {
      sourcemap: true,
      format: "umd",
      exports: "named",
      name: "ContesaConfigurator",
      file: "public/contesa/contesa-configurator.js",
    },
  };
});
