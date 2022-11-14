<script setup lang="ts">
import { defineProps, computed, ref } from "vue";
import { useUserStore } from "../stores/user";
import { useCommentStore } from "../stores/comment";

import AppModal from "./Modal.vue";
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
  author: {
    type: String,
    require: true,
  },
});

const userStore = useUserStore();
const commentStore = useCommentStore();

const currentUser = computed(() => userStore.getCurrentUser);
const comments = computed(() => commentStore.commentsList);

const modalConfirm = ref<boolean>(false);
const selectedReply = ref<{ author: string; idReply: number }>({
  author: "",
  idReply: 0,
});

const replyTo = (id: number) => {
  const _target = document.querySelector(`[data-id="${id}"]`) as HTMLElement;
  const textarea = _target.querySelector(
    ".form__comment > textarea"
  ) as HTMLInputElement;

  let mentionTo: string = "";
  const { user } = comments.value.find((c) => c.id == id) || {};

  if (user) {
    mentionTo = user?.username;
  } else {
    const comment = comments.value.find((c) => c.user.username == props.author);
    mentionTo = comment?.replies.find((r) => r.id == id)!.user.username!;
  }

  commentStore.setReplyingTo(props.author!);
  textarea.value = `@${mentionTo} `;
  _target.style.display = "flex";
  textarea.focus();
};

const editReply = (author: string, idReply: number) => {
  //
};

const showModalConfirm = (author: string, idReply: number) => {
  selectedReply.value = { author: author, idReply: idReply };
  modalConfirm.value = true;
};

const closeModalConfirm = () => {
  modalConfirm.value = false;
};

const applyModalConfirm = () => {
  const { author, idReply } = selectedReply.value;
  deleteReply(author, idReply);
  modalConfirm.value = false;
};

const deleteReply = (author: string, idReply: number) => {
  commentStore.removeReply(author, idReply);
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
          @submit="showModalConfirm(author!, item.id)"
        >
          <font-awesome-icon
            icon="fa-solid fa-trash"
            style="margin-right: 3px"
          />
          Delete
        </AppButton>
        <AppButton
          :text="true"
          @submit="editReply(item.user.username, item.id)"
        >
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

  <AppModal
    :show-modal="modalConfirm"
    @close="closeModalConfirm"
    @apply="applyModalConfirm"
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
