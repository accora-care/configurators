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
  {#if "Fabric Side Rails" === $configStore.sideRails}
    <Img src={`/images/floorbed1-uk/1200/sideRails.png`} />
  {/if}
  {#if "Integrated Junior Padded Side Rails" === $configStore.sideRails}
    <Img src={`/images/floorbed1-uk/1200/sideRails.png`} />
  {/if}
  {#if $configStore.bumpers || $configStore.juniorKit}
    <Img src={`/images/floorbed1-uk/1200/bumpers.png`} />
  {/if}
  {#if "Bed Lever" === $configStore.lever}
    <Img src={`/images/floorbed1-uk/1200/lever.png`} />
  {/if}
  {#if "Short Bed Lever" === $configStore.lever}
    <Img src={`/images/floorbed1-uk/1200/lever.png`} />
  {/if}
  {#if $configStore.pumpHolder}
    <Img src={`/images/floorbed1-uk/1200/pumpHolder.png`} />
  {/if}
  {#if $configStore.safetySleeve || $configStore.juniorKit}
    <Img src={`/images/floorbed1-uk/1200/safetySleeve.png`} />
  {/if}
  {#if "High Safety Mat" === $configStore.safetyMat}
    <Img src={`/images/floorbed1-uk/1200/safetyMat.png`} />
  {/if}
  {#if "High Safety Mat with Slide Sheets" === $configStore.safetyMat}
    <Img src={`/images/floorbed1-uk/1200/safetyMat.png`} />
  {/if}
</PreviewFrame>
