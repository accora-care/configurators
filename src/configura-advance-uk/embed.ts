import type { InitConfig } from "../Config.types";
import App from "./ConfiguraAdvance.svelte";

const initConfig: InitConfig = {
  mainTitle: "Customize your Accora Configura Advance",
  bookADemoHref: "https://accora.care/book-a-join-visit",
};

export const ConfiguraAdvance = (
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

(window as any).ConfiguraAdvance = ConfiguraAdvance;
export default ConfiguraAdvance;
