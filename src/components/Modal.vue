<script lang="ts" setup>
import { defineEmits, defineProps } from "vue";

import AppButton from "./Button.vue";

const emit = defineEmits(["close", "apply"]);
const props = defineProps({
  showModal: {
    type: Boolean,
    require: true,
  },
});
</script>

<template>
  <div class="modal" v-show="showModal">
    <div class="wrapper" @click="emit('close')"></div>
    <div class="box">
      <div class="content">
        <h3>Delete comment</h3>
        <p>
          Are you sure want to delete this comment? This will remove the comment
          and can't be undone.
        </p>
      </div>
      <div class="footer">
        <AppButton
          bgcolor="hsl(212, 24%, 26%, 0.8)"
          @submit="emit('close')"
          style="width: 50%"
        >
          NO, CANCEL
        </AppButton>
        <AppButton
          bgcolor="hsl(358, 75%, 66%)"
          @submit="emit('apply')"
          style="width: 50%"
        >
          YES, DELETE
        </AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: hsl(211, 10%, 45%, 0.8);
}

.wrapper {
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  position: absolute;
}

.box {
  width: 30%;
  min-height: 30%;
  z-index: 2;
  gap: 15px;
  display: flex;
  padding: 20px;
  border-radius: 5px;
  flex-direction: column;
  background-color: white;
  justify-content: space-between;
}

.box > .content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.box > .content h3 {
  color: var(--color-neutral-dark-blue);
}

.box > .content p {
  font-size: 0.9em;
  line-height: 1.2em;
  color: hsl(212, 24%, 26%, 0.8);
}

.box > .footer {
  width: 100%;
  display: flex;
  gap: 15px;
}
</style>
