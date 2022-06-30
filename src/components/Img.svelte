<script lang="ts">
  import { getImageUrl } from "../imageUrl";
  let { src, class: clz, ...rest } = $$restProps;
</script>

<img src={getImageUrl(src)} class={clz} alt="" {...rest} />
