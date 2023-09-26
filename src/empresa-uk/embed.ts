import type { CognitoFormConfig, InitConfig } from "../Config.types";
import App from "./Empresa.svelte";

const initConfig: InitConfig = {
  mainTitle: "Customize your Accora Floor Bed",
  bookADemoHref: "https://us.accora.care/book-a-demo",
};

export const EmpresaConfigurator = (
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

(window as any).EmpresaConfigurator = EmpresaConfigurator;
export default EmpresaConfigurator;
