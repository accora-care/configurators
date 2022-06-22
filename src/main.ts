import type { InitConfig } from "./Config.types";
import App from "./configurator/App.svelte";

const initConfig: InitConfig = {
  demoEmailAddress: "demo@example.com",
  mainTitle: "Customize your Accora Floor Bed",
};

const app = new App({
  target: document.getElementById("content"),
  props: {
    name: "world",
    config: initConfig,
  },
});

export default app;
