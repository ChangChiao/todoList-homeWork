<script setup lang="ts">
import { reactive, ref, computed, provide } from "vue";
import ContentVue from "./components/Content.vue";
import NavVue from "./components/Nav.vue";
import { isOpenMenuType, handleMenuType} from "./symbol";
import { Todo, TodoKeys } from "./types/todo";
const emptyObj = () => ({
  id: new Date().getTime(),
  title: "",
  content: "",
  startDate: "",
  endDate: "",
  cover: "",
});

const todoList = reactive<Todo[]>([emptyObj()]);

const activeIndex = ref(0);

const activeTodo = computed(() => {
  return todoList[activeIndex.value];
});

const addTodo = () => {
  todoList.push(emptyObj());
  activeIndex.value = todoList.length - 1;
};

type EditParam = {
  key: TodoKeys;
  value: Todo[TodoKeys];
};


const editTodo = ({ key, value }: EditParam) => {
  const target = todoList[activeIndex.value];  
  (target[key] as any) = value;
};

const deleteTodo = () => {
  todoList.splice(activeIndex.value, 1);
  activeIndex.value = 0;
};

const selectTodo = (index: number) => {
  activeIndex.value = index;
};

const isOpenMenu = ref(false);
provide(isOpenMenuType, isOpenMenu);

const handleMenu = () => {
  isOpenMenu.value = !isOpenMenu.value;
}
provide(handleMenuType, handleMenu);
</script>

<template>
  <main class="flex w-screen overflow-hidden">
    <NavVue
      :isOpenMenu="isOpenMenu"
      :todoList="todoList"
      :activeIndex="activeIndex"
      @select-todo="selectTodo"
      @add-todo="addTodo"
    />
    <ContentVue
      :activeTodo="activeTodo"
      @delete-todo="deleteTodo"
      @edit-todo="editTodo"
    />
    <div v-if="isOpenMenu" class="fixed w-full h-full bg-black/70 left-0 top-0"></div>
  </main>
</template>

<style scoped></style>
