<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import ContentVue from './components/Content.vue';
import NavVue from './components/Nav.vue';
import { TodoKeys } from "./types/todo";
const todoList = reactive([
  {
    id:'12',
    title: 'test',
    content: 'lalalalalala',
    startDate: "",
    endDate: "",
    cover: "",
  }
]);

const activeIndex = ref(0);

const activeTodo = computed(()=>{
  return todoList[activeIndex.value]
})

const edit = ({key, value}: {key: TodoKeys, value: string}) => {
  todoList[activeIndex.value][key] = value
}

</script>

<template>
  <main class="flex">
    <NavVue :todoList="todoList" :activeIndex="activeIndex" />
    <ContentVue :activeTodo="activeTodo" @edit="edit" />
  </main>
</template>

<style scoped>
</style>
