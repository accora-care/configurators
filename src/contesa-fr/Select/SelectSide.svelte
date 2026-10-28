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
    title="Sans longs pans"
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
      alt="Sans longs pans"
    />
  </SelectionGridItem>

  <SelectionGridItem
    active={$configStore.sidePanel === "With Side Panels"}
    title="Avec longs pans{!isSidePanelAllowed($configStore) ? ' – non disponible' : ''}"
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
      alt="Avec longs pans"
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
