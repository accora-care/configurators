import type {
  HubspotFormConfig,
  CognitoFormConfig,
  InitConfig,
} from "./Config.types";
import ConfiguraAdvance from "./configura-advance/ConfiguraAdvance.svelte";
import ConfiguraAdvanceUK from "./configura-advance-uk/ConfiguraAdvance.svelte";
import ConfiguraComfortUK from "./configura-comfort-uk/ConfiguraComfort.svelte";
import Contesa from "./contesa/Contesa.svelte";
import ContesaUK from "./contesa-uk/Contesa.svelte";
import Empresa from "./empresa/Empresa.svelte";
import EmpresaUK from "./empresa-uk/Empresa.svelte";
import AltidaUK from "./altida-uk/Altida.svelte";
import Floorbed1 from "./floorbed1/Floorbed1.svelte";
import Floorbed1UK from "./floorbed1-uk/Floorbed1.svelte";

const DEFAULT_HUBSPOT_CONFIG = {
  region: "eu1",
  portalId: "25005558",
  formId: "be70d855-99ac-4972-ae5d-64fbee9bea77",
};

const DEFAULT_COGNITO_CONFIG = {
  key: "2xcyxIw4NUSCrwloJjtcpg",
  form: "31",
  productFieldName: "ProductName",
  optionsFieldName: "ConfiguratorOptions",
};

/**
 * Floorbed1
 */
export const AccoraFloorbedOne = (
  targetId: string,
  config: InitConfig,
  hubspotFormConfig: HubspotFormConfig = DEFAULT_HUBSPOT_CONFIG
) => {
  const app = new Floorbed1({
    target: document.getElementById(targetId),
    props: {
      config: {
        mainTitle: "Customize your Accora Floorbed 1",
        bookADemoHref: "https://us.accora.care/book-a-demo",
        ...config,
        hubspotFormConfig,
      },
    },
  });

  return app;
};

(window as any).AccoraFloorbedOne = AccoraFloorbedOne;

/**
 * Floorbed1 (UK)
 */
export const AccoraFloorbedOneUK = (
  targetId: string,
  config: InitConfig,
  cognitoFormConfig: CognitoFormConfig = DEFAULT_COGNITO_CONFIG
) => {
  const app = new Floorbed1UK({
    target: document.getElementById(targetId),
    props: {
      config: {
        ...config,
        mainTitle: "Customize your Accora Floorbed 1",
        bookADemoHref: "https://accora.care/book-a-join-visit",
        cognitoFormConfig,
      },
    },
  });

  return app;
};

(window as any).AccoraFloorbedOneUK = AccoraFloorbedOneUK;

/**
 * Contesa
 */
export const ContesaConfigurator = (
  targetId: string,
  config: InitConfig,
  hubspotFormConfig: HubspotFormConfig = DEFAULT_HUBSPOT_CONFIG
) => {
  const app = new Contesa({
    target: document.getElementById(targetId),
    props: {
      config: {
        ...config,
        mainTitle: "Customize your Accora Contesa",
        bookADemoHref: "https://us.accora.care/book-a-demo",
        hubspotFormConfig,
      },
    },
  });

  return app;
};

/**
 * Empresa
 */
export const EmpresaConfigurator = (
  targetId: string,
  config: InitConfig,
  hubspotFormConfig: HubspotFormConfig = DEFAULT_HUBSPOT_CONFIG
) => {
  const app = new Empresa({
    target: document.getElementById(targetId),
    props: {
      config: {
        ...config,
        mainTitle: "Customize your Accora Empresa",
        bookADemoHref: "https://us.accora.care/book-a-demo",
        hubspotFormConfig,
      },
    },
  });

  return app;
};

/**
 * Empresa (UK)
 */
export const EmpresaUKConfigurator = (
  targetId: string,
  config: InitConfig,
  cognitoFormConfig: CognitoFormConfig = DEFAULT_COGNITO_CONFIG
) => {
  const app = new EmpresaUK({
    target: document.getElementById(targetId),
    props: {
      config: {
        ...config,
        mainTitle: "Customize your Accora Empresa",
        bookADemoHref: "https://accora.care/book-a-join-visit",
        cognitoFormConfig,
      },
    },
  });

  return app;
};

/**
 * Altida (UK)
 */
export const AltidaUKConfigurator = (
  targetId: string,
  config: InitConfig,
  cognitoFormConfig: CognitoFormConfig = DEFAULT_COGNITO_CONFIG
) => {
  const app = new AltidaUK({
    target: document.getElementById(targetId),
    props: {
      config: {
        ...config,
        mainTitle: "Customize your Accora Altida",
        bookADemoHref: "https://accora.care/book-a-join-visit",
        cognitoFormConfig,
      },
    },
  });

  return app;
};

/**
 * Configura advance
 */

export const ConfiguraAdvanceConfigurator = (
  targetId: string,
  config: InitConfig,
  hubspotFormConfig: HubspotFormConfig = DEFAULT_HUBSPOT_CONFIG
) => {
  const app = new ConfiguraAdvance({
    target: document.getElementById(targetId),
    props: {
      config: {
        mainTitle: "Customize your Accora Configura Advance",
        bookADemoHref: "https://us.accora.care/book-a-demo",
        ...config,
        hubspotFormConfig,
      },
    },
  });

  return app;
};

/**
 * Configura Advance (UK)
 */

export const ConfiguraAdvanceUKConfigurator = (
  targetId: string,
  config: InitConfig,
  cognitoFormConfig: CognitoFormConfig = DEFAULT_COGNITO_CONFIG
) => {
  const app = new ConfiguraAdvanceUK({
    target: document.getElementById(targetId),
    props: {
      config: {
        ...config,
        mainTitle: "Customize your Accora Configura Advance",
        bookADemoHref: "https://accora.care/book-a-join-visit",
        cognitoFormConfig,
      },
    },
  });

  return app;
};

/**
 * Configura Comfort (UK)
 */

export const ConfiguraComfortUKConfigurator = (
  targetId: string,
  config: InitConfig,
  cognitoFormConfig: CognitoFormConfig = DEFAULT_COGNITO_CONFIG
) => {
  const app = new ConfiguraComfortUK({
    target: document.getElementById(targetId),
    props: {
      config: {
        ...config,
        mainTitle: "Customize your Accora Configura Comfort",
        bookADemoHref: "https://accora.care/book-a-join-visit",
        cognitoFormConfig,
      },
    },
  });

  return app;
};

(window as any).AccoraConfigurators = {
  Contesa: ContesaConfigurator,
  Empresa: EmpresaConfigurator,
  EmpresaUK: EmpresaUKConfigurator,
  AltidaUK: AltidaUKConfigurator,
  ConfiguraAdvance: ConfiguraAdvanceConfigurator,
  ConfiguraAdvanceUK: ConfiguraAdvanceUKConfigurator,
  ConfiguraComfortUK: ConfiguraComfortUKConfigurator,
  FloorbedOne: AccoraFloorbedOne,
  FloorbedOneUK: AccoraFloorbedOneUK,
};
