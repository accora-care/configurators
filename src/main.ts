import type { InitConfig } from "./empresa/Config.types";
import App from "./empresa/App.svelte";
import ConfiguraAdvanceSvelte from "./configura-advance/ConfiguraAdvance.svelte";
import Floorbed1Svelte from "./floorbed1/Floorbed1.svelte";

const initConfig: InitConfig = {
  mainTitle: "Customize your Accora Floor Bed",
  bookADemoHref: "https://us.accora.care/book-a-demo",
};

const app = new App({
  target: document.getElementById("content"),
  props: {
    config: initConfig,
  },
});
const configura = new ConfiguraAdvanceSvelte({
  target: document.getElementById("configura-advance"),
  props: {
    config: initConfig,
  },
});

const floorbed1 = new Floorbed1Svelte({
  target: document.getElementById("floorbed1"),
  props: {
    config: {
      mainTitle: "Customize your Accora Floorbed 1",
      bookADemoHref: "https://us.accora.care/book-a-demo",
    },
  },
});

export default app;
