import type { InitConfig } from "../Config.types";
import App from "./App.svelte";

const initConfig: InitConfig = {
  mainTitle: "Customize your Accora Floor Bed",
  bookADemoHref: "https://us.accora.care/book-a-demo",
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
