<script lang="ts">
  import Img from "./Img.svelte";
  let { class: cls, src, ...rest } = $$restProps;
</script>

<Img class={"acc-grid-item-preview-image " + cls} alt="" {...rest} {src} />

<style lang="scss" global>
  .acc-grid-item-preview-image {
    width: 100%;
    display: block;
    border-radius: 0.4rem;
  }
</style>
