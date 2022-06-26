<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import { configStore } from "../configStore";
  import Radio from "../../components/Radio.svelte";
</script>

<SelectionGrid
  {...$$restProps}
  visible={$configStore.selectorView === "SIDE_PANEL"}
>
  <div class="acc-radios-wrapper">
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
</SelectionGrid>

<style lang="scss" global>
  .acc-radios-wrapper {
    grid-column: 1 / all;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
</style>
