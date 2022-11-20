<script lang="ts" setup>
import { defineProps } from "vue";
import { useCommentStore } from "../stores/comment";

const props = defineProps({
  count: {
    type: Number,
    require: true,
  },
  idReply: {
    type: Number,
    require: true,
  },
});

const commentStore = useCommentStore();

const increment = () => {
  commentStore.incrementScore(props.idReply!);
};

const decrement = () => {
  commentStore.decrementScore(props.idReply!);
};
</script>

<template>
  <div class="counter">
    <div class="plus" @click="increment">+</div>
    <div class="count">{{ count }}</div>
    <div class="min" @click="decrement">-</div>
  </div>
</template>

<style scoped>
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
  font-weight: 900;
  cursor: pointer;
  color: var(--color-neutral-grayish-blue);
}

@media only screen and (max-width: 400px) {
  .counter {
    height: 40px;
    width: 100px;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
