<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["submit"]);
const props = defineProps({
  text: {
    type: Boolean,
    require: false,
    default: false,
  },
  color: {
    type: String,
    require: false,
  },
});
</script>

<template>
  <button
    @click="emit('submit')"
    :style="{ color: color }"
    :class="[`${text ? 'text' : ''}`, 'btn']"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn {
  background-color: var(--color-primary-blue);
  border: none;
  border-radius: 5px;
  color: white;
  padding: 10px 20px;
  cursor: pointer;
}

.text {
  padding: 0;
  font-weight: 500;
  color: var(--color-primary-blue);
  background-color: transparent;
}

.btn:hover {
  opacity: 0.5;
}
</style>
