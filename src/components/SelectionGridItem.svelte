<script lang="ts">
  export let active: boolean;
  export let onClick: () => void;
  export let title: string = "";
  export let description: string = "";
  export let learnMoreUrl: string = "";
  export let isQuickship: boolean = false;
  export let disabled: boolean = false;
  export let notAllowedMessage: string = "";
  export let visible: boolean = true;
  export let ukStyle: boolean = false;
  import IconQuickship from "./assets/icon-quickship.svg";
</script>

<div
  class="acc-grid-item"
  class:active
  class:disabled={!!notAllowedMessage || disabled}
  class:uk-style={ukStyle}
  on:click={onClick}
>
  
  {#if ukStyle}
    <div class="acc-grid-item-image">
      <slot />
    </div>
    <div class="acc-grid-item-details">
      <div>
        {#if !!notAllowedMessage}
          <span class="acc-exception">{notAllowedMessage}</span>
        {/if}
        {#if title}
          <div class="acc-grid-item-title-wrapper">
            <div class="acc-grid-item-title">{title}</div>
            {#if ! visible}
              <div class="acc-grid-item-not-visible">
                <IconQuickship /> <span class="acc-grid-item-qctext">Not Visible</span>
              </div>
            {/if}
          </div>
        {/if}
      </div>
      {#if description}
        <p class="acc-grid-item-description">{description}</p>
      {/if}
      {#if learnMoreUrl}
        <a href={learnMoreUrl} class="acc-grid-item-link">Learn more</a>
      {/if}
      {#if isQuickship}
        <div class="acc-grid-item-quickship">
          <IconQuickship /> <span class="acc-grid-item-qctext">Quickship</span>
        </div>
      {/if}
    </div>
  {:else}
    <div>
      <slot />
      {#if !!notAllowedMessage}
        <span class="acc-exception">{notAllowedMessage}</span>
      {/if}
      {#if title}
        <div class="acc-grid-item-title">{title}</div>
      {/if}
    </div>
    {#if ! visible}
      <div class="acc-grid-item-not-visible">
        <IconQuickship /> <span class="acc-grid-item-qctext">Not Visible</span>
      </div>
    {/if}
    {#if isQuickship}
      <div class="acc-grid-item-quickship">
        <IconQuickship /> <span class="acc-grid-item-qctext">Quickship</span>
      </div>
    {/if}
  {/if}
</div>

<style lang="scss" global>
  #acc-empresa-uk,
  #acc-altida-uk,
  #acc-floorbed1-uk,
  #acc-configura-advance-uk,
  #acc-configura-comfort-uk {
    --grid-item-background: #F6F6F6;
    --selected-grid-item-background: #fff;

    .acc-exception {
      font-size: 0.6rem !important;
    }
  }

  .acc-grid-item {
    padding: calc(0.8rem / var(--root-font-size));
    border-radius: calc(0.4rem / var(--root-font-size));
    transition: 0.2s all;
    border: 1px solid transparent;
    cursor: pointer;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: var(--grid-item-background);

    &.active {
      border: 1px solid var(--primary);
      background: var(--selected-grid-item-background);
    }
    &:hover {
      background: rgba(0, 0, 0, 0.02);
    }
    &-wrapper {
      overflow: hidden;
      margin-top: calc(0.8rem / var(--root-font-size));
    }
    &-title {
      font-size: calc(1.2rem / var(--root-font-size));
      line-height: calc(1.6rem / var(--root-font-size));
      text-align: center;
      font-family: "Poppins Light", "Poppins";
      font-weight: 300;
    }
    &-quickship,
    &-not-visible {
      background: #828282;
      display: flex;
      align-items: center;
      font-size: calc(1rem / var(--root-font-size));
      justify-content: center;
      padding: 0 calc(0.8rem / var(--root-font-size));
      height: calc(2rem / var(--root-font-size));
      border-radius: calc(1rem / var(--root-font-size));
      color: white;
      font-family: "Poppins Light", "Poppins";
      font-weight: 300;
      margin: 0 auto;
      width: min-content;
      white-space: nowrap;
    }
    &-qctext {
      margin-left: calc(0.4rem / var(--root-font-size));
      word-break: keep-all;
    }

    &.disabled {
      pointer-events: none;
      cursor: not-allowed;
      .label-desc {
        opacity: 0.4;
      }
      img {
        opacity: 0.4;
      }
    }

    &.uk-style {
      display: grid;
      grid-template-columns: 1fr 3fr;
      text-align: left;
      gap: 2rem;

      .acc-grid-item-preview-image {
        &[src$=".svg"] {
          background-color: var(--grid-item-background);
          padding: 1.25rem;
        }
      }

      .acc-grid-item-details {
        color: black;

        .acc-grid-item-title-wrapper {
          display: flex;
          align-items: center;
          column-gap: calc(1rem / var(--root-font-size));
          margin-bottom: calc(0.5rem / var(--root-font-size));
          width: fit-content;
          flex-wrap: wrap;

          .acc-grid-item-title {
            text-align: left;
            font-size: calc(1.4rem / var(--root-font-size));
            line-height: normal;
          }

          .acc-grid-item-not-visible {
            justify-content: flex-start;
            text-align: left;
            margin: 0;
          }
        }

        .acc-grid-item-description {
          font-size: calc(1rem / var(--root-font-size));
          line-height: normal;
          margin-bottom: calc(0.5rem / var(--root-font-size));
        }

        .acc-grid-item-link {
          font-size: calc(1.2rem / var(--root-font-size));
          line-height: normal;
          color: var(--primary);
        }
      }
    }
  }
</style>
