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
    <ButtonApp @submit="handleSubmit">{{ buttonName }}</ButtonApp>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref, computed } from "vue";
import { useUserStore } from "../stores/user";
import { useCommentStore } from "../stores/comment";

import ButtonApp from "./Button.vue";

const emit = defineEmits(["submit"]);
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

const userState = useUserStore();
const commentState = useCommentStore();

const textarea = ref<HTMLInputElement | null>(null);

const user = computed(() => userState.getCurrentUser);

const handleSubmit = () => {
  const message = textarea.value?.value;
  if (message?.includes("@")) {
    const currentUser = user.value;
    const replyingTo = message.split(" ")[0].slice(1);
    commentState.pushReply(replyingTo, {
      id: new Date().getTime(),
      content: message.split(" ").slice(1).join(" "),
      createdAt: "1 week ago",
      score: 0,
      replyingTo: replyingTo,
      user: currentUser,
    });
  }
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

textarea {
  width: 90%;
  resize: none;
  border-radius: 5px;
  padding: 10px 20px;
  outline-color: var(--color-neutral-dark-blue);
  border: 1px solid var(--color-neutral-dark-blue);
}
</style>
