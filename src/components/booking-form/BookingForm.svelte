<script lang="ts">
  import { onMount } from "svelte";
  import Portal from "svelte-portal";
  import type {
    HubspotFormConfig,
    InitConfig,
    SubmitFormDescription,
  } from "../../Config.types";
  import Img from "../Img.svelte";
  export let handleClose: VoidFunction;
  export let descriptionFormField: SubmitFormDescription;
  export let title: string;
  export let config: InitConfig;

  let submitted = false;

  const onReady = () => {
    const quoteRequestDetails = descriptionFormField
      .map((item) => `${item.label}: ${item.value}`)
      .join("\n");
    Array.from(document.getElementsByName("quote_request_details")).forEach(
      (el) => {
        (el as any).value = `${title}\n${quoteRequestDetails}`;
      }
    );
  };

  onMount(async () => {
    if (config.hubspotFormConfig) {
      // @ts-ignore
      hbspt.forms.create({
        ...config.hubspotFormConfig,
        target: "#acc-quote-form",
        submitButtonClass: "button nav___button-book",
        cssClass: "acc-hubspot-form",
        onFormReady: onReady,
        onFormSubmitted: () => {
          submitted = true;
        },
      });
    }
    else if (config.cognitoFormConfig) {
      // @ts-ignore
      const cognitoApi = Cognito(config.cognitoFormConfig.key);
      const cognitoForm = cognitoApi.mount(config.cognitoFormConfig.form, '#acc-quote-form');
      
      if (config.cognitoFormConfig.productFieldName) {
        cognitoForm.prefill({
          [config.cognitoFormConfig.productFieldName]: title,
        });
      }

      if (config.cognitoFormConfig.optionsFieldName) {
        const configuratorOptions = [];

        descriptionFormField.forEach((item) => {
          if (item.value) {
            configuratorOptions.push(`${item.label}: ${item.value}`);
          }
        });

        cognitoForm.prefill({
          [config.cognitoFormConfig.optionsFieldName]: configuratorOptions.join(", "),
        });
      }
    }
  });
</script>

<Portal target="body">
  <div class="acc-modal-wrapper">
    <div class="acc-modal">
      <div class="acc-close-btn" on:click={handleClose} />
      <div class="acc-modal-scrollarea">
        {#if !submitted}
          <div class="acc-modal-header">
            <h3>Request a quote - {title}</h3>
            <div class="acc-preview-description">
              <div class="acc-form-preview-container">
                <slot />
              </div>
              <ul class="acc-booking-list">
                {#each descriptionFormField as item}
                  {#if item.value}
                    <li class="acc-booking-item">
                      <span class="acc-booking-item-title">{item.label}</span>:
                      <span class="acc-booking-item-value">{item.value}</span>
                    </li>
                  {/if}
                {/each}
              </ul>
            </div>
          </div>
        {:else}
          <div class="acc-thank-you-title">
            <Img class="acc-form-check" src="/icons/checked.png" alt="Ok" />
            <h3>{config.thankYouTitle || "Thank you for your request"}</h3>
          </div>
        {/if}
        <div class="acc-modal-content">
          <div id="acc-quote-form" />
        </div>
        {#if submitted}
          <div class="acc-modal-footer">
            <a class="acc-submit-button" href={"/"}>Go back to homepage</a>
            <span class="acc-close-text" on:click={handleClose}
              >Close this form</span
            >
          </div>
        {/if}
      </div>
    </div>
  </div>
</Portal>

<style lang="scss" global>
  .acc-form-check {
    width: 32px;
    height: 32px;
    display: block;
    margin-bottom: 2em;
  }
  .acc-preview-description {
    display: flex;
    align-items: center;
    padding-top: 2em;
    padding-bottom: 2em;
  }
  .acc-form-preview-container {
    width: 200px;
  }
  .acc-booking-list {
    padding-left: 0;
  }
  .acc-booking-item {
    list-style-type: none;
    font-size: 0.75em;
    padding-left: 0;
    padding-top: 0;
    .acc-booking-item-title {
      font-family: "Poppins Medium", "Poppins";
      font-weight: 500;
    }
  }

  .acc-modal-header {
    padding: 3em;

    padding-bottom: 0;
    @media screen and (max-width: 768px) {
      padding: 2em;
      padding-bottom: 0;
    }
    border-bottom: 1px solid var(--border-color);
  }
  .acc-modal-wrapper {
    --primary: rgba(0, 136, 113, 1);
    --primary-hover: rgba(25, 162, 144, 1);
    --border-color: rgba(234, 234, 234, 1);
    --radius: 0.5em;
    --box-shadow-block: 0 0 40px 0 rgba(0, 0, 0, 0.07);
    font-size: 16px;
    position: fixed;
    z-index: 10000;
    height: -webkit-fill-available;
    height: calc(100vh);
    background-color: rgba(0, 0, 0, 0.4);
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    h3 {
      font-size: 2em;
    }
    .acc-close-text {
      display: inline-block;
      padding: 1em;
      color: var(--text-primary);
      opacity: 0.7;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
      text-decoration: none;
    }
  }
  .acc-modal-scrollarea {
    overflow-y: auto; /* has to be scroll, not auto */
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
  }
  .acc-modal {
    max-height: 90vh;
    border-radius: 12px;
    background: white;
    position: relative;
    transform: translateX(0);
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 768px) {
      height: calc(100vh - calc(100vh - 100%));
      border-radius: 0;
      max-height: max-content;
    }

    .acc-close-btn {
      position: fixed;
      top: 1.5em;
      right: 1.5em;
      height: 20px;
      width: 20px;
      cursor: pointer;
      &:before,
      &:after {
        content: "";
        position: absolute;
        top: 9px;
        left: 0;
        border-radius: 1px;
        height: 2px;
        width: 100%;
        background: #666;
        display: block;
        transform: rotate(45deg);
      }
      &:before {
        transform: rotate(-45deg);
      }
      &:hover {
        &:before,
        &:after {
          background: #222;
        }
      }
    }
  }
  .acc-modal-content,
  .acc-thank-you-title,
  .acc-modal-footer {
    padding: 3em;
    @media screen and (max-width: 768px) {
      padding: 2em;
    }
    max-width: 900px;
  }
  .acc-thank-you-title {
    padding-bottom: 0 !important;
  }
  .acc-modal-footer {
    padding-top: 0 !important;
    text-align: center;
  }
  .acc-modal #acc-quote-form {
    .submitted-message {
      background: transparent;
      color: var(--text-primary);
      text-align: left;
      display: block;
      padding: 0;
      font-family: "Poppins Regular", "Poppins";
      font-weight: 400;
    }
    form {
      width: 100%;
      max-width: 760px;
    }
    .hs-error-msgs.inputs-list {
      padding-left: 0;
      li {
        font-size: 0.75em;
        padding-left: 0;
        list-style-type: none;
      }
    }
    fieldset {
      display: flex;
      flex-wrap: wrap;
      gap: 1em;
      max-width: none;
      margin-bottom: 1em;
      flex-direction: row;
      & > * {
        flex-grow: 1;
      }
      .input {
        margin-right: 0;
        width: 100%;
      }
      .input input {
        width: 100%;
      }
    }
    .hs-form-field {
      margin-bottom: 0;
    }
    .hs-form-field,
    fieldset.form-columns-1 .hs-form-field,
    fieldset.form-columns-2 .hs-form-field {
      width: 1px !important;
      min-width: 200px;
      flex-grow: 1;
    }
    .legal-consent-container {
      font-size: 0.75em;
    }
    input[type="submit"] {
      cursor: pointer;
    }
  }
</style>
