<script lang="ts">
  import Img from "../components/Img.svelte";
  import PreviewFrame from "../components/PreviewFrame.svelte";

  import { configStore } from "./configStore";
</script>

<PreviewFrame>
  <Img
    src={$configStore.dropdownArmrest
      ? `/images/configura-advance/armrest_left--alternate.png`
      : `/images/configura-advance/armrest_left--standard.png`}
  />

  <Img
    src={$configStore.backrest === "normal"
      ? `/images/configura-advance/backrest--standard.png`
      : `/images/configura-advance/backrest--postural.png`}
  />
  <Img src={`/images/configura-advance/base.png`} />

  {#if $configStore.lateralSupport}
    <Img src={`/images/configura-advance/lat_support_left.png`} />
    <Img src={`/images/configura-advance/lat_support_right.png`} />
  {/if}

  <Img
    src={$configStore.dropdownArmrest
      ? `/images/configura-advance/armrest_right--alternate.png`
      : `/images/configura-advance/armrest_right--standard.png`}
  />

  {#if $configStore.headrest && $configStore.backrest === "postural"}
    <Img src={`/images/configura-advance/headrest--postural.png`} />
  {/if}

  <!-- <Img
    src={`/images/configura-advance/dropdown-armrest.png`}
    
  /> -->
  <!-- {#if $configStore.backrest === "normal"}
    <Img src={`/images/configura-advance/normal-head.png`} />
  {:else}
    <Img src={`/images/configura-advance/postral-backrest.png`} />
  {/if}

  {#if $configStore.lateralSupport}
    <Img src={`/images/configura-advance/lateral-support.png`} />
  {/if} -->
</PreviewFrame>
