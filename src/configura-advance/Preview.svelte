<script lang="ts">
  import Img from "../components/Img.svelte";

  import { configStore } from "./configStore";
  import { isSidePanelAllowed } from "./isSidePanelAllowed";
</script>

<div class="image-frame">
  <Img
    src={`/images/configura-advance/bottom-chair.png`}
    class="image-frame-img"
  />
  <!-- <Img
    src={`/images/configura-advance/dropdown-armrest.png`}
    class="image-frame-img"
  /> -->
  {#if $configStore.backrest === "normal"}
    <Img
      src={`/images/configura-advance/normal-head.png`}
      class="image-frame-img"
    />
  {:else}
    <Img
      src={`/images/configura-advance/postral-backrest.png`}
      class="image-frame-img"
    />
  {/if}
  {#if $configStore.headrest}
    <Img
      src={`/images/configura-advance/headrest.png`}
      class="image-frame-img"
    />
  {/if}
  {#if $configStore.lateralSupport}
    <Img
      src={`/images/configura-advance/lateral-support.png`}
      class="image-frame-img"
    />
  {/if}
</div>

<style lang="scss" global>
  .image-frame {
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
    }
  }
</style>
