<script lang="ts">
  export let visible: boolean;
  export let title: string = "";
  export let ukStyle: boolean = false;
</script>

<div class="acc-grid-wrapper" class:acc-grid-hidden={!visible}>
  <div class="acc-grid-container" class:with-border={"Wooden Styles" === title || "Fabric Styles" === title}>
    {#if !!title}
      <span class="acc-grid-title">{title}</span>
    {/if}
    <div class="acc-grid" class:with-border={"Wooden Styles" === title || "Fabric Styles" === title} class:uk-style={ukStyle}>
      <slot />
    </div>
  </div>
</div>

<style lang="scss" global>
  .acc-grid-wrapper {
    overflow: hidden;

    .acc-grid-container {
      &.with-border {
        border: 1px solid var(--border-color);
        border-radius: 0.625rem;
        margin-top: calc(1.5625rem / var(--root-font-size));
        padding: 0 0.5rem calc(1.6rem / var(--root-font-size));
      }
    }
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

    &.with-border {
      border-bottom: none;
    }

    &.uk-style {
      grid-template-columns: 1fr;
      max-height: none;
    }
  }
  .acc-grid-title {
    font-size: calc(1.6rem / var(--root-font-size));
    display: block;
    padding-top: calc(2rem / var(--root-font-size));
    padding-left: 1.6em;
    text-align: center;
  }
  :global(.acc-grid-wrapper.acc-grid-hidden) {
    opacity: 0;
    height: 0px;
    max-height: 50px;
    border: none;
    padding: 0;
    border-bottom: none;
  }
</style>
