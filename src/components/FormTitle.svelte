<script lang="ts">
  import type { InitConfig } from "../Config.types";
  export let title: string;
</script>

<div class="acc-form-title">{title}</div>

<style lang="scss" global>
  .acc-form-title {
    height: 74px;
    background: var(--primary);
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 1.6rem 3.2rem;
    text-align: center;
    border-radius: var(--radius) var(--radius) 0 0;
    color: white;
    font-size: 1.8rem;
    line-height: 2.4rem;
    font-weight: 400;
    @media screen and (max-width: 860px) {
      display: none;
    }
  }
</style>
