<script lang="ts">
  import { settingsStore } from "../common/settings";
  import type { InitConfig, SubmitFormDescription } from "../Config.types";
  import BookingForm from "../components/booking-form/BookingForm.svelte";

  export let config: InitConfig;
  export let descriptionFormField: SubmitFormDescription;
  export let title: string;
</script>

<div class="acc-submit">
  <div class="acc-submit-content">
    {#if !!config.hubspotFormConfig || !!config.cognitoFormConfig}
      <span
        class="acc-submit-button"
        on:click={() => {
          settingsStore.update((s) => {
            return {
              ...s,
              isQuoteOpen: title,
            };
          });
        }}
      >
        Request a quote
      </span>
    {:else}
      <a class="acc-submit-button" href={config.bookADemoHref}>Book a demo</a>
    {/if}
  </div>
</div>
{#if $settingsStore.isQuoteOpen === title && !!descriptionFormField}
  <BookingForm
    {title}
    {descriptionFormField}
    {config}
    handleClose={() => {
      settingsStore.update((s) => {
        return {
          ...s,
          isQuoteOpen: null,
        };
      });
    }}
  >
    <slot />
  </BookingForm>
{/if}

<style lang="scss" global>
  .acc-submit {
    margin-top: calc(1.6rem / var(--root-font-size));
    background: white;
    box-shadow: var(--box-shadow-block);
    border-radius: var(--radius);
    overflow: hidden;
    margin-bottom: calc(3.2rem / var(--root-font-size));
    cursor: pointer;
    &-content {
      padding: calc(2.4rem / var(--root-font-size));
    }

    .booking-info {
      font-family: "Poppins Light", "Poppins";
      font-weight: 300;
      text-align: center;
      font-size: calc(1.4rem / var(--root-font-size));
      margin-top: calc(1.8rem / var(--root-font-size));
    }
  }

  .acc-submit-button,
  .acc-submit-button:visited {
    background: var(--primary);
    font-size: calc(1.6rem / var(--root-font-size));
    height: calc(4.8rem / var(--root-font-size));
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    margin: 0 auto;
    width: auto;
    width: fit-content;
    padding-left: 2em;
    padding-right: 2em;
    color: white;
    border-radius: calc(0.4rem / var(--root-font-size));
    text-decoration: none !important;
    transition: 0.15s all;
    &:hover {
      background-color: var(--primary-hover);
    }
  }
</style>
