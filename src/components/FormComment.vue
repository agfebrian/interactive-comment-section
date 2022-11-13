<template>
  <div class="form__comment">
    <textarea
      name=""
      id=""
      cols="30"
      rows="5"
      :placeholder="placeholder"
    ></textarea>
    <ButtonApp>{{ buttonName }}</ButtonApp>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

import ButtonApp from "./Button.vue";

const props = defineProps({
  placeholder: {
    type: String,
    require: false,
    default: "",
  },
  buttonName: {
    type: String,
    require: false,
    default: "BUTTON",
  },
});
</script>

<style scoped>
.form__comment {
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 10px;
}

textarea {
  width: 90%;
  resize: none;
  border-radius: 5px;
  padding: 10px 20px;
  outline-color: var(--color-neutral-dark-blue);
  border: 1px solid var(--color-neutral-dark-blue);
}
</style>
