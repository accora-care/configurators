<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";

  import { getMattressesException } from "../isOptionAllowed";

  let mattressesException = "";

  configStore.subscribe((state) => {
    mattressesException = getMattressesException(state);
  });
</script>

<SelectionGrid
  visible={$configStore.selectorView === "MATTRESSES"}
  ukStyle={true}
>
  <SelectionGridItem
    notAllowedMessage={mattressesException}
    active={$configStore.mattresses === "Allevia Comfort"}
    title="Allevia Comfort"
    description="This mattress has a base layer of high-density foam for support, with a top layer of soft, pressure-reducing visco foam."
    learnMoreUrl="/mattresses/allevia-comfort"
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
    description="This mattress has a base layer of high-density foam for support, with a top layer of soft, pressure-reducing visco foam. It also features a firm edge which offers more support for transfers."
    learnMoreUrl="/mattresses/allevia-comfort-firmedge"
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
    description="This mattress uses a step-up/step-down hybrid foam system with extra quiet pump and foam-filled alternating cells that provide comfort as well as therapy."
    learnMoreUrl="/mattresses/allevia-duo"
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
    notAllowedMessage={mattressesException}
    active={$configStore.mattresses === "Allevia Duo Plus"}
    title="Allevia Duo Plus"
    description="This mattress uses a step-up/step-down hybrid foam system with foam-filled alternating cells. It features a heel slope to minimise surface contact and a top layer of visco foam for comfort."
    learnMoreUrl="/mattresses/allevia-duo-plus"
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
    notAllowedMessage={mattressesException}
    active={$configStore.mattresses === "Allevia Sense"}
    title="Allevia Sense"
    description="This mattress uses a dynamic mattress system with alternating cells for pressure relief. The cells are 18 cm deep to provide deep immersion, and the heel slope is created by lower heel cells.
    "
    learnMoreUrl="/mattresses/allevia-sense"
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
