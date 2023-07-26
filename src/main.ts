import type { InitConfig } from "./Config.types";
import App from "./empresa/Empresa.svelte";
import EmpresaUK from "./empresa-uk/Empresa.svelte";
import ConfiguraAdvanceSvelte from "./configura-advance/ConfiguraAdvance.svelte";
import Floorbed1Svelte from "./floorbed1/Floorbed1.svelte";

const initConfig: InitConfig = {
  mainTitle: "Customize your Accora Floor Bed",
  bookADemoHref: "https://us.accora.care/book-a-demo",
  hubspotFormConfig: {
    region: "eu1",
    portalId: "25005558",
    formId: "be70d855-99ac-4972-ae5d-64fbee9bea77",
  },
};

const app = new App({
  target: document.getElementById("content"),
  props: {
    config: initConfig,
  },
});

const empresaUK = new EmpresaUK({
  target: document.getElementById("empresa-uk"),
  props: {
    config: {
      ...initConfig,
      mainTitle: "Customize your Accora Empressa",
      hubspotFormConfig: undefined,
      cognitoFormConfig: {
        key: "2xcyxIw4NUSCrwloJjtcpg",
        form: "31",
      },
    }
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
