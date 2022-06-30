<script lang="ts">
  import { getImageUrl } from "../imageUrl";
  let { class: clz } = $$restProps;
  export let src: string = "";
  export let alt: string = "";
</script>

<img src={getImageUrl(src)} class={clz} {alt} />
