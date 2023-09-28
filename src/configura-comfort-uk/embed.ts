import type { InitConfig } from "../Config.types";
import App from "./ConfiguraComfort.svelte";

const initConfig: InitConfig = {
  mainTitle: "Customize your Accora Configura Comfort",
  bookADemoHref: "https://us.accora.care/book-a-demo",
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
