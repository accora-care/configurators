import type { InitConfig } from "../Config.types";
import App from "./Empresa.svelte";

const initConfig: InitConfig = {
  mainTitle: "Customize your Accora FloorBed",
  bookADemoHref: "https://accora.care/book-a-join-visit",
};

export const EmpresaConfigurator = (
  targetId: string,
  config: InitConfig,
) => {
  const app = new App({
    target: document.getElementById(targetId),
    props: {
      config: {
        ...initConfig,
        ...config,
      },
    },
  });

  return app;
};

(window as any).EmpresaConfigurator = EmpresaConfigurator;
export default EmpresaConfigurator;
