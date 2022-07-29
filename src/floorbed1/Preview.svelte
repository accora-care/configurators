<script lang="ts">
  import Img from "../components/Img.svelte";

  import { configStore } from "./configStore";
</script>

<div class="image-frame">
  <Img src={`/images/floorbed1/1200/bed-frame.png`} class="image-frame-img" />
  {#if $configStore.liftingPole}
    <Img
      src={`/images/floorbed1/1200/liftingPole.png`}
      class="image-frame-img"
    />
  {/if}
  <Img src={`/images/floorbed1/1200/mattress.png`} class="image-frame-img" />
  {#if $configStore.sideRails}
    <Img src={`/images/floorbed1/1200/sideRails.png`} class="image-frame-img" />
  {/if}
  {#if $configStore.bumpers}
    <Img src={`/images/floorbed1/1200/bumpers.png`} class="image-frame-img" />
  {/if}
  {#if $configStore.lever}
    <Img src={`/images/floorbed1/1200/lever.png`} class="image-frame-img" />
  {/if}
  {#if $configStore.pumpHolder}
    <Img
      src={`/images/floorbed1/1200/pumpHolder.png`}
      class="image-frame-img"
    />
  {/if}
  {#if $configStore.safetyMat}
    <Img src={`/images/floorbed1/1200/safetyMat.png`} class="image-frame-img" />
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
