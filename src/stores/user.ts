import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { User } from "../types/User.interface";

export const useUserStore = defineStore("user", () => {
  const currentUser = ref<User>({} as User);

  const getCurrentUser = computed(() => currentUser.value);

  const setCurrentUser = (val: User) => {
    currentUser.value = val;
  };

  return { currentUser, getCurrentUser, setCurrentUser };
});
