import { createRollupConfigEmbed } from "./rollup.createConfig";

/**
 * builds empresa UMD module
 */
// export default createRollupConfig({
//   input: "src/empresa-uk/embed.ts",
//   output: {
//     sourcemap: true,
//     format: "umd",
//     exports: "named",
//     name: "EmpresaUKConfigurator",
//     file: "public/empresa-uk/empresa-uk-configurator.js",
//   },
// });

export default createRollupConfigEmbed((config) => {
  return {
    ...config,
    input: "src/empresa-uk/embed.ts",
    output: {
      sourcemap: true,
      format: "umd",
      exports: "named",
      name: "EmpresaUKConfigurator",
      file: "public/empresa-uk/empresa-uk-configurator.js",
    },
  };
});
