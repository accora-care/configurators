import type { InitConfig } from "../Config.types";
import App from "./Contesa.svelte";

const initConfig: InitConfig = {
  mainTitle: "Personnaliser Contesa",
  bookADemoHref: "https://accora.care/book-a-join-visit",
};

export const ContesaFRConfigurator = (targetId: string, config: InitConfig) => {
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

(window as any).ContesaFRConfigurator = ContesaFRConfigurator;
export default ContesaFRConfigurator;
