<script lang="ts">
  export let active: boolean;
  export let onClick: () => void;
  export let title: string = "";
  export let isQuickship: boolean = false;
  export let disabled: boolean = false;
  export let notAllowedMessage: string = "";
  import IconQuickship from "./assets/icon-quickship.svg";
</script>

<div
  class="acc-grid-item"
  class:active
  class:disabled={!!notAllowedMessage || disabled}
  on:click={onClick}
>
  <div>
    <slot />
    {#if !!notAllowedMessage}
      <span class="acc-exception">{notAllowedMessage}</span>
    {/if}
    {#if title}
      <div class="acc-grid-item-title">{title}</div>
    {/if}
  </div>
  {#if isQuickship}
    <div class="acc-grid-item-quickship">
      <IconQuickship /> <span class="acc-grid-item-qctext">Quickship</span>
    </div>
  {/if}
</div>

<style lang="scss" global>
  #acc-empresa-uk {
    --grid-item-background: #F6F6F6;
    --selected-grid-item-background: #fff;
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
    }
    &-title {
      font-size: calc(1.2rem / var(--root-font-size));
      line-height: calc(1.6rem / var(--root-font-size));
      text-align: center;
      font-weight: 300;
      margin-top: calc(0.8rem / var(--root-font-size));
    }
    &-quickship {
      background: #828282;
      display: flex;
      align-items: center;
      font-size: calc(1rem / var(--root-font-size));
      justify-content: center;
      padding: 0 calc(0.8rem / var(--root-font-size));
      height: calc(2rem / var(--root-font-size));
      border-radius: calc(1rem / var(--root-font-size));
      color: white;
      font-weight: 300;
      margin: 0 auto;
      margin-top: calc(0.8rem / var(--root-font-size));
      width: min-content;
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
  }
</style>
