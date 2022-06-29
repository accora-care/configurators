import { createRollupConfigEmbed } from "./rollup.createConfig";

/**
 * builds empresa UMD module
 */
// export default createRollupConfig({
//   input: "src/empresa/embed.ts",
//   output: {
//     sourcemap: true,
//     format: "umd",
//     exports: "named",
//     name: "EmpresaConfigurator",
//     file: "public/empresa/empresa-configurator.js",
//   },
// });

export default createRollupConfigEmbed((config) => {
  return {
    ...config,
    input: "src/empresa/embed.ts",
    output: {
      sourcemap: true,
      format: "umd",
      exports: "named",
      name: "EmpresaConfigurator",
      file: "public/empresa/empresa-configurator.js",
    },
  };
});
