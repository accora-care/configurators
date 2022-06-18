<script lang="ts">
  export let active: boolean;
  export let onClick: () => void;
  export let title: string = "";
</script>

<div class="grid-item-wrapper">
  <div class={active ? "grid-item active" : "grid-item"} on:click={onClick}>
    <slot />
  </div>
  {#if title}
    <div class="title">{title}</div>
  {/if}
</div>

<style lang="scss">
  .grid-item {
    padding: 0.75rem;
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
  }

  .title {
    font-size: 0.875rem;
    text-align: center;
    font-weight: 300;
    margin-top: 0.25rem;
  }
</style>
