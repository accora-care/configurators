<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  export let value: string;

  import { configStore } from "../configStore";
</script>

<SelectionGrid visible={$configStore.selectorView === "ASSIST_BAR"}>
  <SelectionGridItem
    active={value === "Long"}
    title={"Long"}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          assistBar: "Long",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/empresa/accessory/${"Long"} - preview.jpg`}
      alt={"Long assist bar"}
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={value === "Short"}
    title={"Short"}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          assistBar: "Short",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/empresa/accessory/${"Short"} - preview.jpg`}
      alt={"Short assist bar"}
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={value === "Folding"}
    title={"Folding assist bars"}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          assistBar: "Folding",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/contesa-uk/accessory/Folding assist bar.png`}
      alt={"Short assist bar"}
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={value === "None"}
    title={"None"}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          assistBar: "None",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/empresa/accessory/${"None"} - preview.jpg`}
      alt={"None "}
    />
  </SelectionGridItem>
</SelectionGrid>

<style lang="scss" global>
  .acc-exception {
    font-size: 0.6em !important;
    line-height: 1.4 !important;
    display: block;
  }
</style>
