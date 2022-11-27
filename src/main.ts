import type { InitConfig } from "./Config.types";
import App from "./empresa/App.svelte";
import ConfiguraAdvanceSvelte from "./configura-advance/ConfiguraAdvance.svelte";
import Floorbed1Svelte from "./floorbed1/Floorbed1.svelte";

const initConfig: InitConfig = {
  mainTitle: "Customize your Accora Floor Bed",
  bookADemoHref: "https://us.accora.care/book-a-demo",
  hubspotFormConfig: {
    region: "eu1",
    portalId: "26542071",
    formId: "e18cc455-a3b4-44ec-a397-a3adf2fa775e",
  },
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
    config: {
      ...initConfig,
      mainTitle: "Customize your Accora Configura Advance",
      bookADemoHref: "https://us.accora.care/book-a-demo",
    },
  },
});

const floorbed1 = new Floorbed1Svelte({
  target: document.getElementById("floorbed1"),
  props: {
    config: {
      ...initConfig,
      mainTitle: "Customize your Accora Floorbed 1",
      bookADemoHref: "https://us.accora.care/book-a-demo",
    },
  },
});

export default floorbed1;
