import { createRollupConfigEmbed } from "./rollup.createConfig";

export default createRollupConfigEmbed((config) => {
  return {
    ...config,
    input: "src/contesa-fr/embed.ts",
    output: {
      sourcemap: true,
      format: "umd",
      exports: "named",
      name: "ContesaFRConfigurator",
      file: "public/contesa-fr/contesa-fr-configurator.js",
    },
  };
});
