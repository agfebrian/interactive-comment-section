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

  const pushComment = (val: Comment) => {
    comments.value.push(val);
  };

  const pushReply = (name: string, val: Reply) => {
    const comment = comments.value.find((item) => item.user.username == name);
    comment?.replies.push(val);
  };

  const updateReply = (author: string, idReply: number, content: string) => {
    const comment = comments.value.filter(
      (item) => item.user.username == author
    );
    const reply = comment[0].replies.filter((item) => item.id == idReply);

    if (reply.length) {
      reply.forEach((item) => {
        item.content = content.split(" ").slice(1, content.length).join(" ");
      });
    } else {
      comment.map((item) => (item.content = content));
    }
  };

  const removeReply = (author: string, idReply: number) => {
    const comment = comments.value.find((item) => item.user.username == author);
    const replyIndex = comment?.replies.findIndex((item) => item.id == idReply);

    if (replyIndex != -1) {
      comment?.replies.splice(replyIndex!, 1);
    } else {
      const index = comments.value.findIndex((item) => item.id == idReply);
      comments.value.splice(index, 1);
    }
  };

  const setReplyingTo = (val: string) => {
    replyingTo.value = val;
  };

  const incrementScore = (idReply: number) => {
    const comment = comments.value.filter((item) => item.id == idReply);
    if (comment.length) {
      comment.map((item) => item.score++);
    } else {
      comments.value.forEach((item) => {
        const reply = item.replies.filter((item) => item.id == idReply);
        reply.map((item) => item.score++);
      });
    }
  };

  const decrementScore = (idReply: number) => {
    const comment = comments.value.filter((item) => item.id == idReply);
    if (comment.length) {
      comment.map((item) => {
        item.score ? item.score-- : 0;
      });
    } else {
      comments.value.forEach((item) => {
        const reply = item.replies.filter((item) => item.id == idReply);
        reply.map((item) => {
          item.score ? item.score-- : 0;
        });
      });
    }
  };

  return {
    comments,
    commentsList,
    getReplyingTo,
    setComments,
    pushComment,
    pushReply,
    updateReply,
    removeReply,
    setReplyingTo,
    incrementScore,
    decrementScore,
  };
});
