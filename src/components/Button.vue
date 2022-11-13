<script lang="ts" setup></script>

<template>
  <button class="btn">
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
}
</style>
