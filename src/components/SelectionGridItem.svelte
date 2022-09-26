<script lang="ts">
  export let active: boolean;
  export let onClick: () => void;
  export let title: string = "";
  export let isQuickship: boolean = false;
  export let disabled: boolean = false;
  import IconQuickship from "./assets/icon-quickship.svg";
</script>

<div class="acc-grid-item" class:active class:disabled on:click={onClick}>
  <div>
    <slot />
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
  .acc-grid-item {
    padding: 0.8rem;
    border-radius: 0.4rem;
    transition: 0.2s all;
    border: 1px solid transparent;
    cursor: pointer;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &.active {
      border: 1px solid var(--primary);
    }
    &:hover {
      background: rgba(0, 0, 0, 0.02);
    }
    &-wrapper {
      overflow: hidden;
    }
    &-title {
      font-size: 1.2rem;
      line-height: 1.6rem;
      text-align: center;
      font-weight: 300;
      margin-top: 0.8rem;
    }
    &-quickship {
      background: #828282;
      display: flex;
      align-items: center;
      font-size: 1rem;
      justify-content: center;
      padding: 0 0.8rem;
      height: 2rem;
      border-radius: 1rem;
      color: white;
      font-weight: 300;
      margin: 0 auto;
      margin-top: 0.8rem;
      width: min-content;
    }
    &-qctext {
      margin-left: 0.4rem;
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
