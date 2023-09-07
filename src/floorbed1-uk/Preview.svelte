<script lang="ts">
  import Img from "../components/Img.svelte";
  import PreviewFrame from "../components/PreviewFrame.svelte";

  import { configStore } from "./configStore";
</script>

<PreviewFrame>
  <Img src={`/images/floorbed1-uk/1200/bed-frame.png`} />
  {#if $configStore.liftingPole}
    <Img src={`/images/floorbed1-uk/1200/liftingPole.png`} />
  {/if}
  <Img src={`/images/floorbed1-uk/1200/mattress.png`} />
  {#if "Fabric" === $configStore.sideRails}
    <Img src={`/images/floorbed1-uk/1200/sideRails.png`} />
  {/if}
  {#if "Junior" === $configStore.sideRails}
    <Img src={`/images/floorbed1-uk/1200/sideRails.png`} />
  {/if}
  {#if $configStore.bumpers || $configStore.juniorKit}
    <Img src={`/images/floorbed1-uk/1200/bumpers.png`} />
  {/if}
  {#if "Standard" === $configStore.lever}
    <Img src={`/images/floorbed1-uk/1200/lever.png`} />
  {/if}
  {#if "Short" === $configStore.lever}
    <Img src={`/images/floorbed1-uk/1200/lever.png`} />
  {/if}
  {#if $configStore.pumpHolder}
    <Img src={`/images/floorbed1-uk/1200/pumpHolder.png`} />
  {/if}
  {#if "High" === $configStore.safetyMat}
    <Img src={`/images/floorbed1-uk/1200/safetyMat.png`} />
  {/if}
  {#if "High with Slide Sheets" === $configStore.safetyMat}
    <Img src={`/images/floorbed1-uk/1200/safetyMat.png`} />
  {/if}
</PreviewFrame>
