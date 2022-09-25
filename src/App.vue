<script setup lang="ts">
import AppCommentDesktopView from "./components/CommentDesktopView.vue";
</script>

<template>
  <main class="container">
    <AppCommentDesktopView />
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
