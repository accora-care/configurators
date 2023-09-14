<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";
  import { getFabricSideRailsException } from "../isOptionAllowed";

  let fabricSideRailsException = "";

  configStore.subscribe((state) => {
    fabricSideRailsException = getFabricSideRailsException(state);
  });
</script>

<SelectionGrid visible={$configStore.selectorView === "SIDE_RAILS"} ukStyle={true}>
  <SelectionGridItem
    notAllowedMessage={fabricSideRailsException}
    active={$configStore.sideRails === "Fabric Side Rails"}
    title="Fabric Side Rails"
    description="Full-length mesh side rails with integrated padding are designed to create a safer environment for the bed user."
    learnMoreUrl="/bed-accessories/fabric-side-rails"
    ukStyle={true}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          sideRails: "Fabric Side Rails" !== s.sideRails ? "Fabric Side Rails" : "None",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/sideRails_preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.sideRails === "Integrated Junior Padded Side Rails"}
    title="Integrated Junior Padded Side Rails"
    description="These side rails are compliant with the children's standard and offer even more safety."
    learnMoreUrl="/bed-accessories/integrated-junior-padded-side-rails"
    ukStyle={true}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          sideRails: "Integrated Junior Padded Side Rails" !== s.sideRails ? "Integrated Junior Padded Side Rails" : "None",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/juniorSideRails_preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
</SelectionGrid>
