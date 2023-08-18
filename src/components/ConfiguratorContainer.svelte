<div class="acc-configurator">
  <slot />
</div>

<style lang="scss" global>
  .acc-configurator {
    font-family: "Poppins Regular", "Poppins";
    box-sizing: border-box;
    position: relative;
    * {
      box-sizing: border-box;
    }
    --primary: rgba(0, 136, 113, 1);
    --primary-hover: rgba(25, 162, 144, 1);
    --border-color: rgba(234, 234, 234, 1);
    --radius: calc(0.5rem / var(--root-font-size));
    --box-shadow-block: 0 0 40px 0 rgba(0, 0, 0, 0.07);
    --grid-item-background: none;
    --selected-grid-item-background: none;
    --link-color: rgba(0, 136, 113, 1);

    p {
      margin-bottom: 0;
    }
    display: flex;
    @media screen and (max-width: 860px) {
      flex-direction: column;
    }
  }
</style>
