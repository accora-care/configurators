<script lang="ts">
  import Img from "./Img.svelte";

  let { class: cls, ...rest } = $$restProps;
</script>

<Img class={"acc-grid-item-preview-image " + cls} alt="" {...rest} />

<style lang="scss" global>
  .acc-grid-item-preview-image {
    width: 100%;
    display: block;
    border-radius: 4px;
  }
</style>
