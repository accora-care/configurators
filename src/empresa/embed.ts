import type { InitConfig } from "./Config.types";
import App from "./App.svelte";

const initConfig: InitConfig = {
  demoEmailAddress: "demo@example.com",
  mainTitle: "Customize your Accora Floor Bed",
};

export const EmpresaConfigurator = (targetId: string, config: InitConfig) => {
  const app = new App({
    target: document.getElementById(targetId),
    props: {
      config,
    },
  });

  return app;
};

(window as any).EmpresaConfigurator = EmpresaConfigurator;
export default EmpresaConfigurator;
