import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { Comment, Reply } from "../types/Comment.interface";

export const useCommentStore = defineStore("comment", () => {
  const comments = ref<Comment[]>([]);

  const commentsList = computed(() => comments.value);

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

  return { comments, commentsList, setComments, pushReply, removeReply };
});
