<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";
</script>

<SelectionGrid visible={$configStore.selectorView === "ACCESSORIES"}>
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
      src={`/images/empresa/accessory/Lifting Pole - preview.jpg`}
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
      src={`/images/empresa/accessory/Safety Mat - preview.jpg`}
      alt={"Lifting pole"}
    />
  </SelectionGridItem>

  <SelectionGridItem
    visible={false}
    active={$configStore.lengthExtension === "Included"}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          lengthExtension:
            s.lengthExtension === "Included" ? "Not included" : "Included",
        };
      });
    }}
    title="length extension"
  >
    <SelectionGridItemImage
      src={`/images/contesa-uk/accessory/Length extension.jpg`}
      alt={"Lifting pole"}
    />
  </SelectionGridItem>
</SelectionGrid>

<style lang="scss">
</style>
