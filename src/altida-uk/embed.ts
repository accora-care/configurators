import type { CognitoFormConfig, InitConfig } from "../Config.types";
import App from "./Altida.svelte";

const initConfig: InitConfig = {
  mainTitle: "Customize your Accora Altida",
  bookADemoHref: "https://us.accora.care/book-a-demo",
};

export const AltidaConfigurator = (
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

(window as any).AltidaConfigurator = AltidaConfigurator;
export default AltidaConfigurator;
