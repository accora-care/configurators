<script lang="ts">
  import Img from "../components/Img.svelte";
  import PreviewFrame from "../components/PreviewFrame.svelte";

  import { configStore } from "./configStore";
</script>

<PreviewFrame>
  {#if $configStore.dropdownArmrest}
    <Img src={`/images/configura-advance/armrest_left--alternate.png`} />
  {:else}
    <Img src={`/images/configura-advance/armrest_left--standard.png`} />
  {/if}
  {#if $configStore.backrest === "normal"}
    <Img src={`/images/configura-advance/backrest--standard.png`} />
  {:else}
    <Img src={`/images/configura-advance/backrest--postural.png`} />
  {/if}
  <Img src={`/images/configura-advance/base.png`} />

  {#if $configStore.lateralSupport}
    <Img src={`/images/configura-advance/lat_support_left.png`} />
  {/if}
  {#if $configStore.lateralSupport}
    <Img src={`/images/configura-advance/lat_support_right.png`} />
  {/if}

  {#if $configStore.dropdownArmrest}
    <Img src={`/images/configura-advance/armrest_right--alternate.png`} />
  {:else}
    <Img src={`/images/configura-advance/armrest_right--standard.png`} />
  {/if}

  {#if $configStore.headrest}
    {#if $configStore.backrest === "normal"}
      <Img src={`/images/configura-advance/headrest--standard.png`} />
    {:else}
      <Img src={`/images/configura-advance/headrest--postural.png`} />
    {/if}
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
