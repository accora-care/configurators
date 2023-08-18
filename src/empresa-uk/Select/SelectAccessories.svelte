<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";
</script>

<SelectionGrid visible={$configStore.selectorView === "ACCESSORIES"} ukStyle={true}>
  <SelectionGridItem
    active={$configStore.proTectSideRail === "Included"}
    title="ProTect side rail"
    description="A concealed side rail system incorporating mesh and integrated padding."
    learnMoreUrl="#"
    ukStyle={true}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          proTectSideRail:
            s.proTectSideRail === "Included" ? "Not included" : "Included",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/empresa-uk/accessory/Protect Rails - preview.png`}
      alt={"ProTect side rail"}
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.assistBar === "Short"}
    title={"Bed lever"}
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    learnMoreUrl="#"
    ukStyle={true}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          assistBar:
            s.assistBar === "Short" ? "None" : "Short",
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
    active={$configStore.liftingPole === "Included"}
    title="Lifting pole"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    learnMoreUrl="#"
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
      alt={"Lifting pole"}
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.safetyMat === "Included"}
    title="Safety mat"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    learnMoreUrl="#"
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
      alt={"Safety mat"}
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.foldingSideRails === "Included"}
    title="Folding side rails"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    learnMoreUrl="#"
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
      alt={"Folding side rails"}
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.fabricSideRails === "Included"}
    title="Fabric side rails"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    learnMoreUrl="#"
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
      alt={"Fabric side rails"}
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.widthAdjustmentKit === "Included"}
    title="Width adjustment kit"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    learnMoreUrl="#"
    ukStyle={true}
    visible={false}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          widthAdjustmentKit:
            s.widthAdjustmentKit === "Included" ? "Not included" : "Included",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/empresa-uk/accessory/Width Adjustment Kit - preview.png`}
      alt={"Width adjustment kit"}
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.foldingSideRailsWithBumper === "Included"}
    title="Folding side rails with bumper"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    learnMoreUrl="#"
    ukStyle={true}
    visible={false}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          foldingSideRailsWithBumper:
            s.foldingSideRailsWithBumper === "Included" ? "Not included" : "Included",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/empresa-uk/accessory/Folding Side Rails with Bumper - preview.png`}
      alt={"Folding side rails with bumper"}
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.bedWallBumper === "Included"}
    title="Bed wall bumper"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
    learnMoreUrl="#"
    ukStyle={true}
    visible={false}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          bedWallBumper:
            s.bedWallBumper === "Included" ? "Not included" : "Included",
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/empresa-uk/accessory/Bed Wall Bumper - preview.png`}
      alt={"Bed wall bumper"}
    />
  </SelectionGridItem>
</SelectionGrid>

<style lang="scss">
</style>
