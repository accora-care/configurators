<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";

  const ukStyle = true;
</script>

<SelectionGrid visible={$configStore.selectorView === "PRESSURE"} {ukStyle}>
  <!-- BACKREST -->

  <SelectionGridItem
    active={$configStore.pressure === "Visco"}
    visible={false}
    title="Visco"
    description="This static pressure-reducing cushion comes as standard with the chair. "
    standard={true}
    {ukStyle}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          pressure: "Visco",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-comfort-uk/pressure--visco--preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.pressure === "CushionAir"}
    visible={false}
    title="CushionAir"
    description="A dynamic pressure relieving cushion which is recommended for users who have developed pressure damage."
    learnMoreUrl="/specialist-seating/chair-accessories/cushionair"
    {ukStyle}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          pressure: "CushionAir",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-comfort-uk/pressure--cushionAir--preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.pressure === "Allevia Duo Cushion"}
    visible={false}
    title="Allevia Duo Cushion"
    description="A hybrid cushion that can be used in various configurations to achieve the pressure relief that is required for the individual."
    learnMoreUrl="/specialist-seating/chair-accessories/allevia-duo-cushion"
    {ukStyle}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          pressure: "Allevia Duo Cushion",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/configura-comfort-uk/pressure--alleviaDuoCushion--preview.webp`}
      class="image-frame-img"
    />
  </SelectionGridItem>
</SelectionGrid>
