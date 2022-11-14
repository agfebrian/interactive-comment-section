import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { Comment, Reply } from "../types/Comment.interface";

export const useCommentStore = defineStore("comment", () => {
  const comments = ref<Comment[]>([]);
  const replyingTo = ref<string>("");

  const commentsList = computed(() => comments.value);
  const getReplyingTo = computed(() => replyingTo.value);

  const setComments = (val: Comment[]) => {
    comments.value = val;
  };

  const pushReply = (name: string, val: Reply) => {
    const comment = comments.value.find((item) => item.user.username == name);
    comment?.replies.push(val);
  };

  const removeReply = (author: string, idReply: number) => {
    const comment = comments.value.find((item) => item.user.username == author);
    const replyIndex = comment?.replies.findIndex((item) => item.id == idReply);
    comment?.replies.splice(replyIndex!, 1);
  };

  const setReplyingTo = (val: string) => {
    replyingTo.value = val;
  };

  return {
    comments,
    commentsList,
    getReplyingTo,
    setComments,
    pushReply,
    removeReply,
    setReplyingTo,
  };
});
