export type HubspotFormConfig = {
  region: string;
  portalId: string;
  formId: string;
};

export type CognitoFormConfig = {
  key: string;
  form: string;
  productFieldName?: string;
  optionsFieldName?: string;
};

export type InitConfig = {
  mainTitle: string;
  bookADemoHref: string;
  footerText?: string;
  hubspotFormConfig?: HubspotFormConfig;
  cognitoFormConfig?: CognitoFormConfig;
  thankYouTitle?: string;
};

export type SubmitFormDescription = { label: string; value: string, code?: string }[];
