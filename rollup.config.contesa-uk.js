import { createRollupConfigEmbed } from "./rollup.createConfig";

export default createRollupConfigEmbed((config) => {
  return {
    ...config,
    input: "src/contesa-uk/embed.ts",
    output: {
      sourcemap: true,
      format: "umd",
      exports: "named",
      name: "ContesaUKConfigurator",
      file: "public/contesa-uk/contesa-uk-configurator.js",
    },
  };
});
