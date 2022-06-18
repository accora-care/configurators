<script lang="ts">
  import SelectionGrid from "../assets/components/SelectionGrid.svelte";
  import SelectionGridItem from "../assets/components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../assets/components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";
</script>

<SelectionGrid visible={$configStore.selectorView === "ACCESSORIES"}>
  <SelectionGridItem
    active={$configStore.liftingPole === "true"}
    title="Lifting pole"
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          liftingPole: s.liftingPole === "true" ? "false" : "true",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/empresa/accessory/Lifting Pole - preview.jpg`}
      alt={"Lifting pole"}
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.safetyMat === "true"}
    title="Safety mat"
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          safetyMat: s.safetyMat === "true" ? "false" : "true",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/empresa/accessory/Safety Mat - preview.jpg`}
      alt={"Lifting pole"}
    />
  </SelectionGridItem>
</SelectionGrid>

<style lang="scss">
</style>
