<script lang="ts">
  import Img from "../components/Img.svelte";
  import PreviewFrame from "../components/PreviewFrame.svelte";

  import { configStore } from "./configStore";
</script>

<PreviewFrame>
  <Img src={`/images/configura-advance/bottom-chair.png`} />
  <!-- <Img
    src={`/images/configura-advance/dropdown-armrest.png`}
    
  /> -->
  {#if $configStore.backrest === "normal"}
    <Img src={`/images/configura-advance/normal-head.png`} />
  {:else}
    <Img src={`/images/configura-advance/postral-backrest.png`} />
  {/if}
  {#if $configStore.headrest}
    <Img src={`/images/configura-advance/headrest.png`} />
  {/if}
  {#if $configStore.lateralSupport}
    <Img src={`/images/configura-advance/lateral-support.png`} />
  {/if}
</PreviewFrame>
