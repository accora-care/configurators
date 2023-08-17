<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";
</script>

<SelectionGrid visible={$configStore.selectorView === "ACCESSORIES"}>
  <SelectionGridItem
    active={$configStore.proTectSideRail === "Included"}
    title="ProTect side rail"
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          proTectSideRail:
            s.proTectSideRail === "Included" ? "Not included" : "Included",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/empresa-uk/accessory/Protect Rails - preview.jpg`}
      alt={"ProTect side rail"}
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.liftingPole === "Included"}
    title="Lifting pole"
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          liftingPole:
            s.liftingPole === "Included" ? "Not included" : "Included",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/empresa-uk/accessory/Lifting Pole - preview.jpg`}
      alt={"Lifting pole"}
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.safetyMat === "Included"}
    title="Safety mat"
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          safetyMat: s.safetyMat === "Included" ? "Not included" : "Included",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/empresa-uk/accessory/Safety Mat - preview.jpg`}
      alt={"Safety mat"}
    />
  </SelectionGridItem>
</SelectionGrid>

<style lang="scss">
</style>
