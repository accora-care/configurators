import { createRollupConfigEmbed } from "./rollup.createConfig";

/**
 * builds empresa UMD module
 */
// export default createRollupConfig({
//   input: "src/altida-uk/embed.ts",
//   output: {
//     sourcemap: true,
//     format: "umd",
//     exports: "named",
//     name: "AltidaUKConfigurator",
//     file: "public/altida-uk/altida-uk-configurator.js",
//   },
// });

export default createRollupConfigEmbed((config) => {
  return {
    ...config,
    input: "src/altida-uk/embed.ts",
    output: {
      sourcemap: true,
      format: "umd",
      exports: "named",
      name: "AltidaUKConfigurator",
      file: "public/altida-uk/altida-uk-configurator.js",
    },
  };
});
