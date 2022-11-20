<script setup lang="ts">
import { computed } from "vue";
import dataJson from "./services/data.json";
import { useUserStore } from "./stores/user";
import { useCommentStore } from "./stores/comment";

import AppUserComment from "./components/UserComment.vue";
import AppComment from "./components/Comment.vue";

const userStore = useUserStore();
const commentStore = useCommentStore();

const data = computed(() => commentStore.commentsList);
const user = computed(() => userStore.getCurrentUser);
const { comments, currentUser } = dataJson;

commentStore.setComments(comments);
userStore.setCurrentUser(currentUser);

const addComment = () => {
  const el = document.querySelector(
    "#user__comment > .form__comment > textarea"
  ) as HTMLInputElement;

  commentStore.pushComment({
    id: new Date().getTime(),
    content: el.value,
    createdAt: "1 second ago",
    score: 0,
    user: currentUser,
    replies: [],
  });

  el.value = "";
};
</script>

<template>
  <main class="container">
    <div v-for="(item, index) in data" :key="index" style="width: 100%">
      <AppComment :item="item" :author="item.user.username" />
      <div class="replies" v-if="item.replies.length">
        <div v-for="reply in item.replies">
          <AppComment :item="reply" :author="item.user.username" />
        </div>
      </div>
    </div>

    <AppUserComment
      :item="user"
      id="user__comment"
      placeholder="Add a comment"
      @handle-submit="addComment"
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

@media only screen and (max-width: 400px) {
  .container {
    padding: 15px;
  }

  .replies {
    padding: 0 0 0 15px;
    margin: 15px 0 0;
  }
}
</style>
