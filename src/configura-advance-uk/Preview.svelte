<script lang="ts">
  import Img from "../components/Img.svelte";
  import PreviewFrame from "../components/PreviewFrame.svelte";

  import { BACKREST_OPTIONS, configStore } from "./configStore";

  // let backrestImage = '';

  // configStore.subscribe((state) => {
  //   backrestImage = getBackrestImage(state) || '';
  // });

  const getBackrestImage = (backrest: BACKREST_OPTIONS) => {
    switch (backrest) {
      case "Adjustable Lateral Support":
        return `/images/configura-advance-uk/posture-backrest--adjustableLateralSupport.png`;
      case "Lateral Support Backrest":
        return `/images/configura-advance-uk/posture-backrest--lateralSupportBackrest.png`;
      case "Postural Backrest":
        // return `/images/configura-advance-uk/posture-backrest--posturalBackrest.png`;
      case "Cocoon":
        // return `/images/configura-advance-uk/posture-backrest--cocoon.png`;
      case "Waterfall":
        // return `/images/configura-advance-uk/posture-backrest--waterfall.png`;
    }

    return '';
  };
</script>

<PreviewFrame>
  <Img
    src={$configStore.dropdownArmrest
      ? `/images/configura-advance-uk/armrest_left--alternate.png`
      : `/images/configura-advance-uk/armrest_left--standard.png`}
  />

  <Img src={getBackrestImage($configStore.backrest)} />

  {#if $configStore.profiledHeadrest}
    <!-- <Img src={`/images/configura-advance-uk/accessory--profiledHeadrest.png`} /> -->
  {/if}

  <Img
    src={$configStore.dropdownArmrest
      ? `/images/configura-advance-uk/base--alternate.png`
      : `/images/configura-advance-uk/base--standard.png`}
  />

  {#if "External Lateral Supports" === $configStore.lateralSupport}
    <Img src={`/images/configura-advance-uk/lat_support_left.png`} />
    <Img src={`/images/configura-advance-uk/lat_support_right.png`} />
  {/if}

  <Img
    src={$configStore.dropdownArmrest
      ? `/images/configura-advance-uk/armrest_right--alternate.png`
      : `/images/configura-advance-uk/armrest_right--standard.png`}
  />

  <!-- <Img
    src={`/images/configura-advance-uk/dropdown-armrest.png`}
    
  /> -->
  <!-- {#if $configStore.backrest === "normal"}
    <Img src={`/images/configura-advance-uk/normal-head.png`} />
  {:else}
    <Img src={`/images/configura-advance-uk/postral-backrest.png`} />
  {/if}

  {#if $configStore.lateralSupport}
    <Img src={`/images/configura-advance-uk/lateral-support.png`} />
  {/if} -->
</PreviewFrame>
