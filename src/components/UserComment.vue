<script lang="ts" setup>
import { defineProps, ref } from "vue";

import AppFormComment from "./FormComment.vue";

const props = defineProps({
  user: {
    type: Object,
    require: true,
    default: {
      name: "Rian",
      image: { png: "./images/avatars/image-juliusomo.png" },
    },
  },
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

const comment = ref<HTMLElement | null>(null);

const handleSubmit = () => {
  comment.value!.style.display = "none";
};
</script>

<template>
  <div ref="comment" class="comment">
    <img :src="user.image?.png" :alt="user.name" />
    <AppFormComment
      :placeholder="placeholder"
      :buttonName="buttonName"
      @submit="handleSubmit"
    />
  </div>
</template>

<style scoped>
.comment {
  width: 100%;
  padding: 15px;
  display: flex;
  gap: 10px;
  align-items: flex-start;
  border-radius: 10px;
  background-color: var(--color-neutral-white);
}

.comment > img {
  width: 48px;
  height: 45px;
  border-radius: 50%;
}
</style>
