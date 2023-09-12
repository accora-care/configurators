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
    active={$configStore.sideRails === "Fabric"}
    title="Fabric Side Rails"
    description="Full-length mesh side rails with integrated padding are designed to create a safer environment for the bed user."
    learnMoreUrl="/bed-accessories/fabric-side-rails"
    ukStyle={true}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          sideRails: "Fabric" !== s.sideRails ? "Fabric" : "None",
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
    active={$configStore.sideRails === "Junior"}
    title="Integrated Junior Padded Side Rails"
    description="These side rails are compliant with the children's standard and offer even more safety."
    learnMoreUrl="/bed-accessories/integrated-junior-padded-side-rails"
    ukStyle={true}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          sideRails: "Junior" !== s.sideRails ? "Junior" : "None",
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

<style lang="scss" global>
  .acc-exception {
    font-size: 0.6rem !important;
    line-height: calc(1.4 / var(--root-font-size)) !important;
    display: block;
  }
</style>
