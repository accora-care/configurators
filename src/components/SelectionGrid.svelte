<script lang="ts">
  export let visible: boolean;
  export let title: string = "";
</script>

<div class="acc-grid-container">
  {#if !!title}
    <span class="acc-grid-title">{title}</span>
  {/if}
  <div class="acc-grid" class:acc-grid-hidden={!visible}>
    <slot />
  </div>
</div>

<style lang="scss" global>
  .acc-grid-container {
    overflow: hidden;
  }
  .acc-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    border-bottom: 1px solid var(--border-color);
    column-gap: calc(0.8rem / var(--root-font-size));
    row-gap: calc(0.8rem / var(--root-font-size));
    padding-top: calc(2.7rem / var(--root-font-size));
    padding-bottom: calc(1.6rem / var(--root-font-size));
    transition: 0.2s all;
    max-height: 1000px;
    overflow: hidden;
    @media screen and (max-width: 1300px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media screen and (max-width: 860px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    @media screen and (max-width: 560px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    & > * {
      transition: 0.4s all;
    }
  }
  .acc-grid-title {
    font-size: calc(1.6rem / var(--root-font-size));
    display: block;
    padding-top: calc(2rem / var(--root-font-size));
    padding-left: 1.6em;
  }
  :global(.acc-grid.acc-grid-hidden) {
    opacity: 0;
    height: 0px;
    max-height: 50px;
    border: none;
    padding: 0;
    border-bottom: none;
  }
</style>
