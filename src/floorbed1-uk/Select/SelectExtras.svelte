<script lang="ts">
  import SelectionGrid from "../../components/SelectionGrid.svelte";
  import SelectionGridItem from "../../components/SelectionGridItem.svelte";
  import SelectionGridItemImage from "../../components/SelectionGridItemImage.svelte";

  import { configStore } from "../configStore";
  import { getPumpHolderException, getBedExtensionException, getMattressExtensionFoamException, getBedExtensionKitException } from "../isOptionAllowed";

  let pumpHolderException = "";
  let bedExtensionException = "";
  let mattressExtensionFoamException = "";
  let bedExtensionKitException = "";

  configStore.subscribe((state) => {
    pumpHolderException = getPumpHolderException(state);
    bedExtensionException = getBedExtensionException(state);
    mattressExtensionFoamException = getMattressExtensionFoamException(state);
    bedExtensionKitException = getBedExtensionKitException(state);
  });
</script>

<SelectionGrid visible={$configStore.selectorView === "EXTRAS"} ukStyle={true}>
  <SelectionGridItem
    notAllowedMessage={pumpHolderException}
    active={$configStore.pumpHolder}
    title="Mattress Pump Holder"
    description="The pump holder easily fits over the end of the bed to hold the pump of an alternating air mattresses."
    ukStyle={true}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          pumpHolder: !s.pumpHolder,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/pumpHolder_preview.png`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    active={$configStore.mattressInfill}
    title="Mattress Infill"
    description="Fits down both sides of a standard mattress in between the mattress and the side rail."
    ukStyle={true}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          mattressInfill: !s.mattressInfill,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/option_preview.png`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
  notAllowedMessage={bedExtensionException}
    active={$configStore.bedExtension}
    title="Bed Extension"
    description="Allows our FloorBed to be extended by 200mm length."
    ukStyle={true}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          bedExtension: !s.bedExtension,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/option_preview.png`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    notAllowedMessage={mattressExtensionFoamException}
    active={$configStore.mattressExtensionFoam}
    title="Mattress Extension Foam"
    description="200 mm (20 cm) mattress infill to be used when the bed is extended by 200 mm."
    ukStyle={true}
    onClick={() => {
      configStore.update((s) => {
        return {
          ...s,
          mattressExtensionFoam: !s.mattressExtensionFoam,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/option_preview.png`}
      class="image-frame-img"
    />
  </SelectionGridItem>
  <SelectionGridItem
    notAllowedMessage={bedExtensionKitException}
    active={$configStore.bedExtensionKit}
    title="Bed Extension Kit"
    description="Includes mattress frame extension and mattress extension foam to provide an  extra 200mm in length."
    ukStyle={true}
    onClick={() => {
      configStore.update((s) => {
        const nextState = !s.safetyMat;
        return {
          ...s,
          bedExtensionKit: !s.bedExtensionKit,
          bedExtension: false,
          mattressExtensionFoam: false,
        };
      });
    }}
  >
    <SelectionGridItemImage
      src={`/images/floorbed1-uk/option_preview.png`}
      class="image-frame-img"
    />
  </SelectionGridItem>
</SelectionGrid>
