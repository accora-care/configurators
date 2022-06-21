<script lang="ts">
  import SelectionGrid from "../components/SelectionGrid.svelte";
  import SelectionGridItem from "../components/SelectionGridItem.svelte";
  import { configStore } from "../configStore";
  import Radio from "./Radio.svelte";
</script>

<SelectionGrid
  {...$$restProps}
  visible={$configStore.selectorView === "SIDE_PANEL"}
>
  <div class="radios-wrapper">
    <Radio
      name="sidePanel"
      value="Included"
      bind:group={$configStore.sidePanel}
    >
      With side<br /> panels
    </Radio>
    <div>
      <Radio
        name="sidePanel"
        bind:group={$configStore.sidePanel}
        value="Excluded"
      >
        Without side<br /> panels
      </Radio>
    </div>
  </div>
  <!-- <SelectionGridItem
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
  </SelectionGridItem> -->
</SelectionGrid>

<style lang="scss">
  .side-panel-item {
    font-size: 0.875rem;
  }

  .radios-wrapper {
    grid-column: 1 / all;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
</style>
