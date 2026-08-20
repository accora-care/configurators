<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";
</script>

<SelectionGrid
  visible={$configStore.selectorView === "ACCESSORIES"}
  ukStyle={true}
>
  <SelectionGridItem
    active={$configStore.fabricSideRails === "Included"}
    title="Barrières latérales en tissu"
    ukStyle={true}
    visible={false}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          fabricSideRails:
            s.fabricSideRails === "Included" ? "Not included" : "Included",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/empresa-uk/accessory/Fabric Side Rails - preview.png`}
      alt={"Fabric Side Rails"}
    />
  </SelectionGridItem>

  <SelectionGridItem
    active={$configStore.foldingSideRails === "Included"}
    title="Barrière ¾ escamotables"
    ukStyle={true}
    visible={false}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          foldingSideRails:
            s.foldingSideRails === "Included" ? "Not included" : "Included",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/empresa-uk/accessory/Folding Side Rails - preview.png`}
      alt={"Folding Side Rails"}
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.assistBar === "Short"}
    title={"Barre d'appui fixe"}
    ukStyle={true}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          assistBar: s.assistBar === "Short" ? "None" : "Short",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/empresa-uk/accessory/${"Short"} - preview.png`}
      alt={"Bed Lever"}
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.liftingPole === "Included"}
    title="Potence"
    ukStyle={true}
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
      src={`/images/empresa-uk/accessory/Lifting Pole - preview.png`}
      alt={"Lifting Pole"}
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.safetyMat === "Included"}
    title="Prolongement de matelas"
    ukStyle={true}
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
      src={`/images/empresa-uk/accessory/Safety Mat - preview.png`}
      alt={"High Safety Mat"}
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.lengthExtension === "Included"}
    title="Extension de longueur"
    ukStyle={true}
    visible={false}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          lengthExtension:
            s.lengthExtension === "Included" ? "Not included" : "Included",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/contesa-fr/accessory/Length extension.jpg`}
      alt={"Length extension"}
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.foldingBedLever === "Included"}
    title="Barre d'appui amovible"
    ukStyle={true}
    visible={false}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          foldingBedLever:
            s.foldingBedLever === "Included" ? "Not included" : "Included",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/contesa-fr/accessory/Folding assist bar.png`}
      alt={"Bed Wall Bumper"}
    />
  </SelectionGridItem>
</SelectionGrid>

<style lang="scss">
</style>
