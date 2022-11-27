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
    {#if !!config.hubspotFormConfig}
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
        Get a quote
      </span>
    {:else}
      <a class="acc-submit-button" href={config.bookADemoHref}>Book a demo</a>
    {/if}
    <p class="booking-info">
      {config.footerText ||
        "Quick Ship Options | 14 Day Free Trial | Assembly and Support"}
    </p>
  </div>
</div>
{#if $settingsStore.isQuoteOpen === title && !!descriptionFormField}
  <BookingForm
    {title}
    {descriptionFormField}
    hubspotFormConfig={config.hubspotFormConfig}
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
    margin-top: 1.6rem;
    background: white;
    box-shadow: var(--box-shadow-block);
    border-radius: var(--radius);
    overflow: hidden;
    margin-bottom: 3.2rem;
    cursor: pointer;
    &-content {
      padding: 2.4rem;
    }

    .booking-info {
      font-weight: 300;
      text-align: center;
      font-size: 1.4rem;
      margin-top: 1.8rem;
    }
  }

  .acc-submit-button,
  .acc-submit-button:visited {
    background: var(--primary);
    font-size: 1.6rem;
    height: 4.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    border: none;
    margin: 0 auto;
    width: 100%;
    max-width: 200px;
    color: white;
    border-radius: 0.4rem;
    text-decoration: none !important;
    &:hover {
      box-shadow: inset 0 0 100px 0 rgba(0, 0, 0, 0.06);
    }
  }
</style>
