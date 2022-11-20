<template>
  <div class="form__comment">
    <textarea
      name=""
      id=""
      cols="30"
      rows="5"
      ref="textarea"
      :placeholder="placeholder"
    ></textarea>
    <img :src="currentUser.image?.png" :alt="currentUser.username" />
    <ButtonApp @submit="handleSubmit">{{ buttonName }}</ButtonApp>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref, watch, computed } from "vue";
import { useUserStore } from "../stores/user";

import ButtonApp from "./Button.vue";

const emit = defineEmits(["submit"]);
const props = defineProps({
  placeholder: {
    type: String,
    require: false,
    default: "",
  },
  value: {
    type: String,
    require: false,
  },
  buttonName: {
    type: String,
    require: false,
    default: "BUTTON",
  },
});

const userStore = useUserStore();

const currentUser = computed(() => userStore.getCurrentUser);

const textarea = ref<HTMLInputElement | null>(null);

watch(
  () => props.value,
  (newVal) => {
    textarea.value!.value = newVal!;
  }
);

const handleSubmit = () => {
  emit("submit");
};
</script>

<style scoped>
.form__comment {
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 10px;
}

img {
  width: 48px;
  height: 45px;
  border-radius: 50%;
  margin-right: auto;
  display: none;
}

textarea {
  width: 90%;
  resize: none;
  border-radius: 5px;
  padding: 10px 20px;
  outline-color: var(--color-neutral-dark-blue);
  border: 1px solid var(--color-neutral-dark-blue);
}

@media screen and (max-width: 400px) {
  .form__comment {
    flex-wrap: wrap;
    justify-content: end;
    align-items: center;
  }

  img {
    display: inline-block;
  }

  textarea {
    width: 100%;
  }
}
</style>
