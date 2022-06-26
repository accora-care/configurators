<script lang="ts">
  export let cls: string = "";
</script>

<img class={"acc-grid-item-preview-image " + cls} alt="" {...$$restProps} />

<style lang="scss" global>
  .acc-grid-item-preview-image {
    width: 100%;
    display: block;
    border-radius: 4px;
  }
</style>
