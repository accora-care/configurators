<script lang="ts">
  export let cls: string = "";
</script>

<img class={"preview-image " + cls} alt="" {...$$restProps} />

<style lang="scss">
  .preview-image {
    width: 100%;
    display: block;
    border-radius: 4px;
  }
</style>
