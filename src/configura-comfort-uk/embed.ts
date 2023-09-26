import type { CognitoFormConfig, InitConfig } from "../Config.types";
import App from "./ConfiguraComfort.svelte";

const initConfig: InitConfig = {
  mainTitle: "Customize your Accora Configura Comfort",
  bookADemoHref: "https://us.accora.care/book-a-demo",
};

export const ConfiguraComfort = (
  targetId: string,
  config: InitConfig,
  cognitoFormConfig: CognitoFormConfig
) => {
  const app = new App({
    target: document.getElementById(targetId),
    props: {
      config: {
        ...initConfig,
        ...config,
        cognitoFormConfig,
      },
    },
  });

  return app;
};

(window as any).ConfiguraComfort = ConfiguraComfort;
export default ConfiguraComfort;
