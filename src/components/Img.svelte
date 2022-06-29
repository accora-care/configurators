<script lang="ts">
  import { getImageUrl } from "../imageUrl";
  let { src, class: clz, ...rest } = $$restProps;
  console.log(clz, rest);
</script>

<img src={getImageUrl(src)} class={clz} alt="" {...rest} />
