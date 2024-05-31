<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";
</script>

<SelectionGrid
  visible={$configStore.selectorView === "MATTRESSES"}
  ukStyle={true}
>
  <SelectionGridItem
    active={$configStore.mattresses === "Allevia Comfort"}
    title="Allevia Comfort"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    learnMoreUrl="/bed-accessories/pump-holder"
    ukStyle={true}
    visible={false}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          mattresses:
            "Allevia Comfort" !== s.mattresses ? "Allevia Comfort" : "None",
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
    active={$configStore.mattresses === "Allevia Comfort FirmEdge"}
    title="Allevia Comfort FirmEdge"
    description="Fits down both sides of a standard mattress in between the mattress and the side rail."
    learnMoreUrl="/bed-accessories/pump-holder"
    ukStyle={true}
    visible={false}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          mattresses:
            "Allevia Comfort FirmEdge" !== s.mattresses
              ? "Allevia Comfort FirmEdge"
              : "None",
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
    active={$configStore.mattresses === "Allevia Duo"}
    title="Allevia Duo"
    description="Allows our FloorBed to be extended by 200mm length."
    learnMoreUrl="/bed-accessories/pump-holder"
    ukStyle={true}
    visible={false}
    pumpOptions={true}
    on:pumpOption={(e) => {
      configStore.update((s) => {
        return {
          ...s,
          pumpOption: e.detail,
        };
      });
    }}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          mattresses: "Allevia Duo" !== s.mattresses ? "Allevia Duo" : "None",
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
    active={$configStore.mattresses === "Allevia Duo Plus"}
    title="Allevia Duo Plus"
    description="Includes mattress frame extension and mattress extension foam to provide an  extra 200mm in length."
    learnMoreUrl="/bed-accessories/pump-holder"
    ukStyle={true}
    visible={false}
    pumpOptions={true}
    on:pumpOption={(e) => {
      configStore.update((s) => {
        return {
          ...s,
          pumpOption: e.detail,
        };
      });
    }}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          mattresses:
            "Allevia Duo Plus" !== s.mattresses ? "Allevia Duo Plus" : "None",
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
    active={$configStore.mattresses === "Allevia Sense"}
    title="Allevia Sense"
    description="xxx"
    learnMoreUrl="/bed-accessories/pump-holder"
    ukStyle={true}
    visible={false}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          mattresses:
            "Allevia Sense" !== s.mattresses ? "Allevia Sense" : "None",
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
