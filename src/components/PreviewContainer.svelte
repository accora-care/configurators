<div class="acc-image-frame-container">
  <div class="acc-image-frame-container__sticky">
    <slot />
  </div>
</div>

<style lang="scss" global>
  .acc-image-frame-container {
    flex-grow: 2;
    flex-shrink: 1;
    .acc-image-frame-container__sticky {
      position: sticky;
      /* top: 0; */

      top: 15vh;
      margin: 0 auto;
    }
  }
</style>
