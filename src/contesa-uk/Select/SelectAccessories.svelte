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
    title="Fabric Side Rails"
    description="Full-length mesh side rails with integrated padding are designed to create a safer environment for the bed user."
    learnMoreUrl="/bed-accessories/fabric-side-rails"
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
    active={$configStore.assistBar === "Short"}
    title={"Bed Lever"}
    description="The bed lever securely fixes to either side of the bed frame providing support for bed mobility and transfers."
    learnMoreUrl="/bed-accessories/bed-lever"
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
    title="Lifting Pole"
    description="The lifting pole can be used by individuals to help with bed mobility."
    learnMoreUrl="/bed-accessories/lifting-pole"
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
    title="High Safety Mat"
    description="Even-plane safety mat providing an extended surface for individuals who are prone to falling out of bed."
    learnMoreUrl="/bed-accessories/high-safety-mat"
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
    title="Length Extension"
    description="Allows the bed to be extended by 200 mm length to accommodate taller individuals."
    learnMoreUrl="/bed-accessories/width-adjustment-kit"
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
      src={`/images/contesa-uk/accessory/Length extension.jpg`}
      alt={"Length extension"}
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.foldingBedLever === "Included"}
    title="Folding Bed Lever"
    description="The bed lever securely attaches to either side of the bed frame, providing support for bed mobility and transfers. It can be folded away when not in use."
    learnMoreUrl="/bed-accessories/wall-bumper"
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
      src={`/images/contesa-uk/accessory/Folding assist bar.png`}
      alt={"Bed Wall Bumper"}
    />
  </SelectionGridItem>
</SelectionGrid>

<style lang="scss">
</style>
