<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";
  import {
    getMatressInfillException,
    getBedExtensionException,
    getMattressExtensionFoamException,
    getBedExtensionKitException,
  } from "../isOptionAllowed";

  let matressInfillException = "";
  let bedExtensionException = "";
  let mattressExtensionFoamException = "";
  let bedExtensionKitException = "";

  configStore.subscribe((state) => {
    matressInfillException = getMatressInfillException(state);
    bedExtensionException = getBedExtensionException(state);
    mattressExtensionFoamException = getMattressExtensionFoamException(state);
    bedExtensionKitException = getBedExtensionKitException(state);
  });
</script>

<SelectionGrid
  visible={$configStore.selectorView === "MATTRESSES"}
  ukStyle={true}
>
  <SelectionGridItem
    active={$configStore.alleviaComfort}
    title="Allevia Comfort"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    learnMoreUrl="/bed-accessories/pump-holder"
    ukStyle={true}
    visible={false}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          alleviaComfort: !s.alleviaComfort,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/allevia_comfort.png`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.alleviaComfortFirmEdge}
    title="Allevia Comfort FirmEdge"
    description="Fits down both sides of a standard mattress in between the mattress and the side rail."
    learnMoreUrl="/bed-accessories/pump-holder"
    ukStyle={true}
    visible={false}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          alleviaComfortFirmEdge: !s.alleviaComfortFirmEdge,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/allevia_comfort_firm_edge.png`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.alleviaDuo}
    title="Allevia Duo"
    description="Allows our FloorBed to be extended by 200mm length."
    learnMoreUrl="/bed-accessories/pump-holder"
    ukStyle={true}
    visible={false}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          alleviaDuo: !s.alleviaDuo,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/allevia_duo.png`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.alleviaDuoPlus}
    title="Allevia Duo Plus"
    description="Includes mattress frame extension and mattress extension foam to provide an  extra 200mm in length."
    learnMoreUrl="/bed-accessories/pump-holder"
    ukStyle={true}
    visible={false}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          alleviaDuoPlus: !s.alleviaDuoPlus,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/allevia_duo_plus.png`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.alleviaSense}
    title="Allevia Sense"
    description="xxx"
    learnMoreUrl="/bed-accessories/pump-holder"
    ukStyle={true}
    visible={false}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          alleviaSense: !s.alleviaSense,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/allevia_sense.png`}
      class="image-frame-img"
    />
  </SelectionGridItem>
</SelectionGrid>
