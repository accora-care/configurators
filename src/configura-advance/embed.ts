import type { HubspotFormConfig, InitConfig } from "../Config.types";
import App from "./ConfiguraAdvance.svelte";

const initConfig: InitConfig = {
  mainTitle: "Customize your Accora Configura Advance",
  bookADemoHref: "https://us.accora.care/book-a-demo",
};

export const ConfiguraAdvance = (
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

(window as any).ConfiguraAdvance = ConfiguraAdvance;
export default ConfiguraAdvance;
