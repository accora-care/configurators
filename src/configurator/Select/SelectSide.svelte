<script lang="ts">
  import SelectionGrid from "../components/SelectionGrid.svelte";
  import SelectionGridItem from "../components/SelectionGridItem.svelte";
  import { configStore } from "../configStore";
</script>

<SelectionGrid visible={$configStore.selectorView === "SIDE_PANEL"}>
  <SelectionGridItem
    active={$configStore.sidePanel === "Included"}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          sidePanel: "Included",
        };
      });
    }}
  >
    <div class="side-panel-item">Include side panels</div>
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.sidePanel === "Excluded"}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          sidePanel: "Excluded",
        };
      });
    }}
  >
    <div class="side-panel-item">Without side panels</div>
  </SelectionGridItem>
</SelectionGrid>

<style lang="scss">
  .side-panel-item {
    font-size: 0.875rem;
  }
</style>
