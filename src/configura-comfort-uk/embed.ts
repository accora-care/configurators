import type { InitConfig } from "../Config.types";
import App from "./ConfiguraComfort.svelte";

const initConfig: InitConfig = {
  mainTitle: "Customize your Accora Configura Comfort",
  bookADemoHref: "https://accora.care/book-a-join-visit",
};

export const ConfiguraComfort = (
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

(window as any).ConfiguraComfort = ConfiguraComfort;
export default ConfiguraComfort;
