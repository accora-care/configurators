<div class="acc-preview-frame">
  <slot />
</div>

<style lang="scss" global>
  .acc-preview-frame {
    /* width: #{16 * 70}px; */
    width: 100%;
    height: 0;
    padding-top: 60%;
    position: relative;
    /* background: rgba(0, 0, 0, 0.1); */
    img {
      height: 100%;
      width: 100%;
      max-height: 640px;
      object-fit: contain;
      position: absolute;
      top: 0;
      /* top: calc((100vh - 100%) / 2); */
      /* left: -20%; */
      transform: translateX(-10%);
      @media screen and (max-width: 860px) {
        transform: none;
      }
    }
  }
</style>
