import type { InitConfig } from "./empresa/Config.types";
import App from "./empresa/App.svelte";

const initConfig: InitConfig = {
  demoEmailAddress: "demo@example.com",
  mainTitle: "Customize your Accora Floor Bed",
  bookADemoHref: "https://us.accora.care/book-a-demo",
};

const app = new App({
  target: document.getElementById("content"),
  props: {
    config: initConfig,
  },
});

export default app;
