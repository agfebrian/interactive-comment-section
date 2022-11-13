<script setup lang="ts">
import { onMounted, ref } from "vue";
import dataJson from "./services/data.json";

import AppUserComment from "./components/UserComment.vue";
import AppCommentDesktopView from "./components/CommentDesktopView.vue";

const data = ref([]);

onMounted(() => {
  data.value = dataJson as any;
});
</script>

<template>
  <main class="container">
    <template v-for="(item, index) in dataJson.comments" :key="index">
      <AppCommentDesktopView :item="item" />
    </template>

    <AppUserComment
      :item="dataJson.currentUser"
      placeholder="Add a comment"
      buttonName="SEND"
    />
  </main>
</template>

<style scoped>
@import "style.css";

.container {
  width: 100%;
  display: flex;
  gap: 15px;
  margin: 0 auto;
  max-width: 700px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
}
</style>
