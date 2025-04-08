<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import { configStore } from "../configStore";
  import Radio from "../../components/Radio.svelte";
  import { isSidePanelAllowed } from "../isSidePanelAllowed";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";
</script>

<SelectionGrid
  {...$$restProps}
  visible={$configStore.selectorView === "SIDE_PANEL"}
>
  <SelectionGridItem
    active={$configStore.sidePanel === "No Side Panels"}
    title="No side panels"
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          sidePanel: "No Side Panels",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/empresa-uk/sidePanels_preview/noSidePanel.png`}
      alt="No side panels"
    />
  </SelectionGridItem>

  <SelectionGridItem
    active={$configStore.sidePanel === "With Side Panels"}
    title="With side panels{!isSidePanelAllowed($configStore) ? ' - not available' : ''}"
    disabled={!isSidePanelAllowed($configStore)}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          sidePanel: "With Side Panels",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/empresa-uk/sidePanels_preview/withSidePanel.png`}
      alt="With side panels"
    />
  </SelectionGridItem>
</SelectionGrid>

<style lang="scss" global>
  .acc-radios-wrapper {
    grid-column: 1 / all;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: calc(1.6rem / var(--root-font-size));
  }
</style>
