<script setup lang="ts">
import { reactive, ref, computed, onMounted, onBeforeUnmount } from "vue";
import ContentVue from "./components/Content.vue";
import NavVue from "./components/Nav.vue";
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
  console.log('target', target);
  console.log('key', key);
  
  console.log('value', value);
  
  (target[key] as any) = value;
};

const deleteTodo = () => {
  todoList.splice(activeIndex.value, 1);
  activeIndex.value = 0;
};

const selectTodo = (index: number) => {
  activeIndex.value = index;
};
</script>

<template>
  <main class="flex">
    <NavVue
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
  </main>
</template>

<style scoped></style>
