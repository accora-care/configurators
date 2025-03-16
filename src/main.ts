import type { InitConfig } from "./Config.types";
import App from "./empresa/Empresa.svelte";
import EmpresaUK from "./empresa-uk/Empresa.svelte";
import AltidaUK from "./altida-uk/Altida.svelte";
import ConfiguraAdvanceSvelte from "./configura-advance/ConfiguraAdvance.svelte";
import ConfiguraAdvanceUKSvelte from "./configura-advance-uk/ConfiguraAdvance.svelte";
import ConfiguraComfortUKSvelte from "./configura-comfort-uk/ConfiguraComfort.svelte";
import Floorbed1Svelte from "./floorbed1/Floorbed1.svelte";
import Floorbed1UKSvelte from "./floorbed1-uk/Floorbed1.svelte";
import ContesaConfigurator from "./contesa/Contesa.svelte";
import ContesaUK from "./contesa-uk/Contesa.svelte";

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

const contesa = new ContesaConfigurator({
  target: document.getElementById("acc-contesa"),
  props: {
    config: {
      ...initConfig,
      mainTitle: "Customize your Accora Contesa",
      hubspotFormConfig: undefined,
      cognitoFormConfig: {
        key: "2xcyxIw4NUSCrwloJjtcpg",
        form: "31",
        productFieldName: "ProductName",
        optionsFieldName: "ConfiguratorOptions",
      },
    },
  },
});

const contesaUK = new ContesaUK({
  target: document.getElementById("acc-contesa-uk"),
  props: {
    config: {
      ...initConfig,
      mainTitle: "Customize your Accora contesa",
      hubspotFormConfig: undefined,
      cognitoFormConfig: {
        key: "2xcyxIw4NUSCrwloJjtcpg",
        form: "31",
        productFieldName: "ProductName",
        optionsFieldName: "ConfiguratorOptions",
      },
    },
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
        productFieldName: "ProductName",
        optionsFieldName: "ConfiguratorOptions",
      },
    },
  },
});

const altidaUK = new AltidaUK({
  target: document.getElementById("altida-uk"),
  props: {
    config: {
      ...initConfig,
      mainTitle: "Customize your Accora Altida",
      hubspotFormConfig: undefined,
      cognitoFormConfig: {
        key: "2xcyxIw4NUSCrwloJjtcpg",
        form: "31",
        productFieldName: "ProductName",
        optionsFieldName: "ConfiguratorOptions",
      },
    },
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

const configuraUK = new ConfiguraAdvanceUKSvelte({
  target: document.getElementById("configura-advance-uk"),
  props: {
    config: {
      ...initConfig,
      mainTitle: "Customize your Accora Configura Advance",
      hubspotFormConfig: undefined,
      cognitoFormConfig: {
        key: "2xcyxIw4NUSCrwloJjtcpg",
        form: "26",
        productFieldName: "ProductName",
        optionsFieldName: "ConfiguratorOptions",
      },
    },
  },
});

const configuraComfortUK = new ConfiguraComfortUKSvelte({
  target: document.getElementById("configura-comfort-uk"),
  props: {
    config: {
      ...initConfig,
      mainTitle: "Customize your Accora Configura Comfort",
      hubspotFormConfig: undefined,
      cognitoFormConfig: {
        key: "2xcyxIw4NUSCrwloJjtcpg",
        form: "27",
        productFieldName: "ProductName",
        optionsFieldName: "ConfiguratorOptions",
      },
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

const floorbed1UK = new Floorbed1UKSvelte({
  target: document.getElementById("floorbed1-uk"),
  props: {
    config: {
      ...initConfig,
      mainTitle: "Customize your Accora Floorbed 1",
      hubspotFormConfig: undefined,
      cognitoFormConfig: {
        key: "2xcyxIw4NUSCrwloJjtcpg",
        form: "31",
        productFieldName: "ProductName",
        optionsFieldName: "ConfiguratorOptions",
      },
    },
  },
});

export default floorbed1;
