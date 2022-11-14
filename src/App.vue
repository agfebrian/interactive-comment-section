<script setup lang="ts">
import { ref, watch } from "vue";
import dataJson from "./services/data.json";

import AppUserComment from "./components/UserComment.vue";
import AppCommentDesktopView from "./components/CommentDesktopView.vue";

const data = ref<any>(dataJson);

watch(data.value.comments, (newVal) => newVal);
</script>

<template>
  <main class="container">
    <div v-for="(item, index) in data.comments" :key="index">
      <AppCommentDesktopView :item="item" />
      <div class="replies" v-if="item.replies.length">
        <div v-for="reply in item.replies">
          <AppCommentDesktopView :item="reply" />
        </div>
      </div>
    </div>

    <AppUserComment
      :item="dataJson.currentUser"
      placeholder="Add a comment"
      buttonName="SEND"
    />
  </main>
</template>

<style scoped>
@import "style.css";

.replies {
  padding: 0 0 0 30px;
  margin: 15px 0 0 38px;
  border-left: 2px solid hsl(211, 10%, 45%, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

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
