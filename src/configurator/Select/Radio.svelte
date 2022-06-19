<script lang="ts">
  export let value: string;
  export let name: string;
  export let label: string;
  export let group: string;
  export let disabled: boolean = false;
</script>

<div class="tbs-radio-container">
  <label class="tbs-form-label-radio">
    <input
      class="tbs-input-radio"
      type="radio"
      bind:group
      {name}
      {value}
      required
      {disabled}
    />
    <span class="tbs-custom-radio">
      <span class="tbs-checkmark">
        <div class="tbs-checkmark_stem" />
        <div class="tbs-checkmark_tick" />
      </span>
      {label}</span
    >
  </label>
</div>

<style lang="scss">
  .tbs-radio-container {
    position: relative;
    flex-grow: 1;
  }
  .tbs-form-label-radio {
    color: var(--text-primary);
    display: flex;
    align-items: center;
    padding-left: 0;
    width: 100%;
  }

  .tbs-input-radio {
    display: none;
  }

  .tbs-custom-radio {
    cursor: pointer;
    height: 100%;
    width: 100%;
    padding: 0 1rem;

    display: flex;
    align-items: center;
    top: 0;
    left: 0;
    border-radius: var(--radius);
    border: 1px solid var(--border-color);
    margin-right: 8px;
    flex-shrink: 0;
    transition: 0.2s all;
    color: var(--text-secondary);
    background: var(--bg-primary);
  }

  .tbs-custom-radio .tbs-checkmark {
    background: var(--border-color);
  }

  .tbs-checkmark {
    display: inline-block;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    border: 1px solid var(--primary);
    -ms-transform: rotate(45deg); /* IE 9 */
    -webkit-transform: rotate(45deg); /* Chrome, Safari, Opera */
    transform: rotate(45deg);
    margin-right: 0.5rem;
  }
  .tbs-checkmark_stem {
    position: absolute;
    width: 2px;
    height: 9px;
    left: 11px;
    top: 6px;
    border-radius: 1px;
  }

  .tbs-checkmark_tick {
    position: absolute;
    width: 5px;
    height: 2px;
    background-color: white;
    left: 8px;
    top: 13px;
    border-radius: 1px;
  }

  .tbs-checkmark_stem,
  .tbs-checkmark_tick {
    background-color: var(--primary);
    transition: 0.1s all;
    opacity: 0.3;
  }

  .tbs-form-label-radio:hover {
    .tbs-custom-radio {
      .tbs-checkmark_stem,
      .tbs-checkmark_tick {
        opacity: 1;
      }
    }
  }

  .tbs-input-radio:checked + .tbs-custom-radio {
    border-color: var(--primary);
    .tbs-checkmark {
      background: var(--primary);
    }
    .tbs-checkmark_stem,
    .tbs-checkmark_tick {
      background: white !important;
      opacity: 1;
    }
  }
  .tbs-input-radio:disabled + .tbs-custom-radio {
    cursor: not-allowed;
    background: var(--bg-secondary);
  }
</style>
