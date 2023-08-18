<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  export let value: string;

  import { configStore } from "../configStore";
  import { assistBarLongException } from "../isLongBarAllowed";

  let assistBarException = "";

  configStore.subscribe((state) => {
    assistBarException = assistBarLongException(state);
  });
</script>

<SelectionGrid visible={$configStore.selectorView === "ASSIST_BAR"}>
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
      src={`/images/empresa-uk/accessory/${"Short"} - preview.png`}
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
      src={`/images/empresa-uk/accessory/${"None"} - preview.jpg`}
      alt={"None "}
    />
  </SelectionGridItem>
</SelectionGrid>

<style lang="scss" global>
  .acc-exception {
    font-size: 0.6em !important;
    line-height: calc(1.4 / var(--root-font-size)) !important;
    display: block;
  }
</style>
