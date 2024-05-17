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
  export let standard: boolean = false;
  export let ukStyle: boolean = false;
  export let pumpOptions: boolean = false;
  import IconQuickship from "./assets/icon-quickship.svg";
  import PumpOption from "./PumpOption.svelte";

  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  let pumpOption = "withPump";

  const handlePumpOption = (value: string) => {
    dispatch("pumpOption", value);
    pumpOption = value;
  };
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
            {#if !visible}
              <div class="acc-grid-item-not-visible">
                <span class="acc-grid-item-nvtext">Not Visible</span>
              </div>
            {/if}
            {#if standard}
              <div class="acc-grid-item-is-standard">
                <span class="acc-grid-item-sttext">Standard</span>
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
    {#if pumpOptions && active}
      <div class="acc-grid-item-pump-options">
        <PumpOption
          title="With pump"
          option="withPump"
          {pumpOption}
          {handlePumpOption}
        />
        <PumpOption
          title="WithOut pump"
          option="withOutPump"
          {pumpOption}
          {handlePumpOption}
        />
      </div>
    {/if}
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
    {#if !visible}
      <div class="acc-grid-item-not-visible">
        <span class="acc-grid-item-nvtext">Not Visible</span>
      </div>
    {/if}
    {#if standard}
      <div class="acc-grid-item-is-standard">
        <span class="acc-grid-item-sttext">Standard</span>
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
    --grid-item-background: #f6f6f6;
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

    &-image {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-title {
      font-size: calc(1.2rem / var(--root-font-size));
      line-height: calc(1.6rem / var(--root-font-size));
      text-align: center;
      font-family: "Poppins Light", "Poppins";
      font-weight: 300;
    }
    &-quickship,
    &-not-visible,
    &-is-standard {
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
    &-qctext,
    &-nvtext,
    &-sttext {
      margin-left: calc(0.4rem / var(--root-font-size));
      word-break: keep-all;
    }
    &-sttext {
      margin-left: 0;
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
          padding: calc(3.2rem / var(--root-font-size));

          @media screen and (max-width: 460px) {
            padding: calc(1.6rem / var(--root-font-size));
          }
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

      .acc-grid-item-pump-options {
        display: flex;
        grid-column: 1 / 3;
        justify-content: space-between;
        gap: calc(2rem / var(--root-font-size));
        margin-bottom: calc(1rem / var(--root-font-size));

        .acc-grid-item-pump-option {
          display: flex;
          align-items: center;
          border: 1px solid rgba(196, 196, 196, 0.5);
          padding: 12px;
          border-radius: 5px;
          flex: 1;
          transition: 250ms border-color;

          &:hover {
            border-color: var(--primary);
          }

          &.active {
            border-color: var(--primary);
          }

          &-icon {
            background-color: rgba(196, 196, 196, 1);
            width: 23px;
            height: 23px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            margin-right: calc(1rem / var(--root-font-size));
            transition: 250ms background-color;
          }

          &:hover .acc-grid-item-pump-option-icon {
            background-color: var(--primary);
          }

          &.active .acc-grid-item-pump-option-icon {
            background-color: var(--primary);
          }

          &-text {
            font-size: calc(1.2rem / var(--root-font-size));
            line-height: calc(1.6rem / var(--root-font-size));
            text-align: center;
            font-family: "Poppins Light", "Poppins";
            font-weight: 300;
          }
        }

        @media screen and (max-width: 460px) {
          flex-direction: column;
          gap: 1rem;
        }
      }
    }
  }
</style>
