<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";

  const ukStyle = true;
</script>

<SelectionGrid visible={$configStore.selectorView === "ARMRESTS"} ukStyle={ukStyle}>
  <!-- ARMRESTS -->
  <SelectionGridItem
    active={!$configStore.dropdownArmrest}
    title="Fixed armrests"
    description="Static, non-adjustable armrests, providing a stable and consistent resting place for the arms."
    ukStyle={ukStyle}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          dropdownArmrest: false,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-comfort-uk/armrest--fixed--preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.dropdownArmrest}
    title="Dropdown armrests"
    description="Fitting on either side of the chair these armrests can help facilitate sideways transfers, for example using a slideboard."
    ukStyle={ukStyle}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          dropdownArmrest: true,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-comfort-uk/armrest--dropdown--preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
</SelectionGrid>
