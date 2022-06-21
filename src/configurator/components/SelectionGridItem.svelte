<script lang="ts">
  export let active: boolean;
  export let onClick: () => void;
  export let title: string = "";
  export let isQuickship: boolean = false;
  import IconQuickship from "../assets/icon-quickship.svg";
</script>

<div class="grid-item-wrapper">
  <div class={active ? "grid-item active" : "grid-item"} on:click={onClick}>
    <slot />
    {#if title}
      <div class="title">{title}</div>
    {/if}
    {#if isQuickship}
      <div class="quickship">
        <IconQuickship /> <span class="qctext">Quickship</span>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .grid-item {
    padding: 0.5rem;
    border-radius: 4px;
    transition: 0.2s all;
    border: 1px solid transparent;
    cursor: pointer;

    &.active {
      border: 1px solid var(--primary);
    }
    &:hover {
      background: rgba(0, 0, 0, 0.02);
    }
    text-align: center;
  }

  .title {
    font-size: 0.75rem;
    line-height: 1rem;
    text-align: center;
    font-weight: 300;
    margin-top: 0.5rem;
  }
  .quickship {
    background: #828282;
    display: flex;
    align-items: center;
    font-size: 0.625rem;
    justify-content: center;
    padding: 0 0.5rem;
    height: 20px;
    border-radius: 10px;
    color: white;
    font-weight: 300;
    margin: 0 auto;
    margin-top: 0.5rem;
    width: min-content;
  }
  .qctext {
    margin-left: 0.25rem;
  }
</style>
