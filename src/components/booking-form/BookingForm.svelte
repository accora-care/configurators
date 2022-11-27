<script lang="ts">
  import { onMount } from "svelte";
  import Portal from "svelte-portal";
  import type {
    HubspotFormConfig,
    SubmitFormDescription,
  } from "../../Config.types";
  export let handleClose: VoidFunction;
  export let descriptionFormField: SubmitFormDescription;
  export let title: string;
  export let hubspotFormConfig: HubspotFormConfig;

  const onReady = () => {
    const quoteRequestDetails = descriptionFormField
      .map((item) => `${item.label}: ${item.value}`)
      .join("\n");
    Array.from(document.getElementsByName("quote_request_details")).forEach(
      (el) => {
        console.log("ELLLL", el);
        (el as any).value = `${title}\n${quoteRequestDetails}`;
      }
    );
  };

  onMount(async () => {
    // @ts-ignore
    hbspt.forms.create({
      ...hubspotFormConfig,
      target: "#acc-quote-form",
      submitButtonClass: "button nav___button-book",
      cssClass: "acc-hubspot-form",
      onFormReady: onReady,
    });
  });
</script>

<Portal target="body">
  <div class="acc-modal-wrapper">
    <div class="acc-modal">
      <div class="acc-close-btn" on:click={handleClose} />
      <div class="acc-modal-scrollarea">
        <div class="acc-modal-header">
          <h3>Get a quote - {title}</h3>
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
        <div class="acc-modal-content" id="acc-quote-form">
          <script>
          </script>
        </div>
      </div>
    </div>
  </div>
</Portal>

<style lang="scss" global>
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
    h3 {
      font-size: 2em;
    }
  }
  .acc-modal-wrapper {
    --primary: rgba(25, 162, 144, 1);
    --border-color: rgba(234, 234, 234, 1);
    --radius: 0.5rem;
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
        top: 8px;
        left: 0;
        border-radius: 1px;
        height: 4px;
        width: 100%;
        background: #333;
        display: block;
        transform: rotate(45deg);
      }
      &:before {
        transform: rotate(-45deg);
      }
    }
  }
  .acc-modal-content {
    padding: 3em;
    @media screen and (max-width: 768px) {
      padding: 2em;
    }
  }
  .acc-modal #acc-quote-form {
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
      width: auto !important;
      flex-grow: 1;
    }
    .legal-consent-container {
      font-size: 0.75em;
    }
  }
</style>
