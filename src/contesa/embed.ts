import type { HubspotFormConfig, InitConfig } from "../Config.types";
import App from "./Contesa.svelte";

const initConfig: InitConfig = {
  mainTitle: "Customize your Accora Contesa",
  bookADemoHref: "https://us.accora.care/book-a-demo",
};

export const ContesaConfigurator = (
  targetId: string,
  config: InitConfig,
  hubspotFormConfig: HubspotFormConfig
) => {
  const app = new App({
    target: document.getElementById(targetId),
    props: {
      config: {
        ...initConfig,
        ...config,
        hubspotFormConfig,
      },
    },
  });

  return app;
};

(window as any).ContesaConfigurator = ContesaConfigurator;
export default ContesaConfigurator;
