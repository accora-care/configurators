<script lang="ts">
  import Chevron from "./assets/chevron.svg";

  export let length: number;
  export let title: string;
  export let value: string;
  export let targetSelectView: SELECTOR_VIEW;
  import { configStore, SELECTOR_VIEW } from "./configStore";
</script>

<div
  class={$configStore.selectorView === targetSelectView
    ? "customization-block active"
    : "customization-block"}
  on:click={() => {
    configStore.update((s) => ({
      ...s,
      selectorView: targetSelectView,
    }));
  }}
>
  <div class="iconContainer">
    <slot />
  </div>

  <div class="wrapper">
    <div class="value">
      <div class="title">{title}</div>
      {value}
    </div>
    <div class="custom-select-container">
      <div class="sticker">{length} options available</div>
      <Chevron class="chvrn" />
    </div>
  </div>
</div>

<style lang="scss">
  .wrapper {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .value {
    font-size: 14px;
    flex-grow: 1;
    padding-right: 32px;

    .title {
      font-weight: 500;
      font-size: 16px;
    }
  }
  .customization-block {
    display: flex;
    align-items: center;
    padding-right: 1rem;
    border-bottom: 1px solid var(--border-color);
    cursor: pointer;
    & + & {
      border-top: 1px solid rgba(235, 236, 239, 1);
      padding-top: 1rem;
      margin-top: 1rem;
    }
    .iconContainer {
      padding: 16px;
      flex-shrink: 0;
    }
  }

  .customization-block.active {
    .value,
    .title {
      color: var(--primary);
    }
  }
  .customization-block:hover {
    .title {
      color: var(--primary);
    }
  }
  .custom-select-container {
    height: 24px;
    display: inline-block;
    min-width: 170px;

    position: relative;
    .sticker {
      background: #f6f6f6;
      border-radius: 5px;
      position: absolute;
      top: 0;
      height: 100%;
      pointer-events: none;
      padding: 0 0.5rem;
      right: 32px;

      /* 6 options available */

      position: absolute;
      display: flex;
      align-items: center;

      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      text-align: center;

      color: #333232;
    }
  }
  :global(.chvrn) {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    cursor: pointer;
  }
</style>
