export type HubspotFormConfig = {
  region: string;
  portalId: string;
  formId: string;
};

export type InitConfig = {
  mainTitle: string;
  bookADemoHref: string;
  footerText?: string;
  hubspotFormConfig?: HubspotFormConfig;
  thankYouTitle?: string;
};

export type SubmitFormDescription = { label: string; value: string }[];
