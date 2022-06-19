<script lang="ts">
  export let visible: boolean;
</script>

<div class="container">
  <div class={visible ? "grid" : "grid grid-hidden"}>
    <slot />
  </div>
</div>

<style lang="scss">
  .container {
    overflow: hidden;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    column-gap: 0.5rem;
    row-gap: 0.5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-top: 1px solid var(--border-color);
    transition: 0.2s all;
    max-height: 1000px;
    overflow: hidden;
    @media screen and (max-width: 1200px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
    @media screen and (max-width: 450px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    & > * {
      transition: 0.4s all;
    }
    &.grid-hidden {
      opacity: 0;
      height: 0px;
      max-height: 50px;
      border: none;
      padding: 0;
      border-top: none;
    }
  }
</style>
