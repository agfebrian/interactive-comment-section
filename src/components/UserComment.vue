<script lang="ts" setup>
import { defineProps } from "vue";

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
</script>

<template>
  <div class="comment">
    <img :src="user.image?.png" :alt="user.name" />
    <AppFormComment :placeholder="placeholder" :buttonName="buttonName" />
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
