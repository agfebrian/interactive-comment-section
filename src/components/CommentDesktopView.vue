<script setup lang="ts">
import { defineProps, ref } from "vue";
import dataJson from "../services/data.json";

import AppButton from "./Button.vue";
import AppUserComment from "./UserComment.vue";

const props = defineProps({
  item: {
    type: Object,
    required: false,
    default: {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: {
          png: "./images/avatars/image-amyrobson.png",
          webp: "./images/avatars/image-amyrobson.webp",
        },
        username: "amyrobson",
      },
      replies: [],
    },
  },
});

const currentUser = ref<{ username: string }>(dataJson.currentUser);

const replyTo = (id: number) => {
  const _target = document.querySelector(`[data-id="${id}"]`) as HTMLElement;
  const textarea = _target.querySelector(
    ".form__comment > textarea"
  ) as HTMLInputElement;

  const { user } = dataJson.comments.find((c) => c.id == id) || {};
  textarea.value = `@${user?.username} `;
  _target.style.display = "flex";
  textarea.focus();
};
</script>

<template>
  <div class="grid">
    <div class="aside">
      <div class="counter">
        <div class="plus">+</div>
        <div class="count">{{ item.score }}</div>
        <div class="min">-</div>
      </div>
    </div>
    <div class="header">
      <img :src="item.user.image.png" alt="user" />
      <p class="title">{{ item.user.username }}</p>
      <p class="date">{{ item.createdAt }}</p>

      <AppButton
        :text="true"
        @submit="replyTo(item.id)"
        v-if="item.user.username != currentUser.username"
      >
        <font-awesome-icon icon="fa-solid fa-reply" style="margin-right: 3px" />
        Reply
      </AppButton>
      <div v-else style="margin-left: auto">
        <AppButton
          :text="true"
          color="hsl(358, 75%, 66%)"
          style="margin-right: 15px"
        >
          <font-awesome-icon
            icon="fa-solid fa-trash"
            style="margin-right: 3px"
          />
          Delete
        </AppButton>
        <AppButton :text="true">
          <font-awesome-icon icon="fa-solid fa-pen" style="margin-right: 3px" />
          Edit
        </AppButton>
      </div>
    </div>
    <div class="content">
      <p>
        <span class="replying__to" v-if="item.replyingTo"
          >@{{ item.replyingTo }}</span
        >
        {{ item.content }}
      </p>
    </div>
  </div>

  <AppUserComment
    :data-id="item.id"
    style="display: none; margin-top: 5px"
    :item="item.currentUser"
    placeholder="Add a comment"
    button-name="REPLY"
  />
</template>

<style scoped>
.grid {
  width: 100%;
  display: grid;
  gap: 10px;
  padding: 15px;
  border-radius: 10px;
  background-color: var(--color-neutral-white);
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(3, 1fr);
}

.aside {
  padding: 0 5px 0 0;
  grid-row-start: 1;
  grid-row-end: 4;
}

.header {
  grid-column-start: 2;
  grid-column-end: 13;
  display: flex;
  align-items: center;
}

.header > img {
  width: 35px;
  border-radius: 50%;
}

.header > .title {
  font-weight: 500;
  margin-left: 10px;
}

.header > .date {
  font-weight: 400;
  margin-left: 10px;
}

.header > button {
  margin-left: auto;
}

.content {
  grid-column-start: 2;
  grid-column-end: 13;
  grid-row-start: 2;
  grid-row-end: 4;
}

.replying__to {
  color: var(--color-primary-blue);
}

.counter {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  border-radius: 10px;
  background-color: var(--color-neutral-very-light-gray);
}

.count {
  margin: 5px 0;
  color: var(--color-neutral-dark-blue);
}

.plus,
.min {
  padding: 5px 0;
  font-size: 0.8em;
  color: var(--color-neutral-grayish-blue);
}
</style>
