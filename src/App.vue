<script setup lang="ts">
import { reactive, ref, provide } from "vue";
import ContentVue from './components/Content.vue';
import NavVue from './components/Nav.vue';
import { TodoList } from "./symbol";
const todoList = reactive([
  {
    id:1232,
    title: 'test',
    content: 'lalalalalala',
    startDate: "",
    endDate: "",
    cover: "",
  }
]);

provide(TodoList, todoList);
const activeIndex = ref(0);

</script>

<template>
  <main class="flex">
    <NavVue />
    <ContentVue />
  </main>
</template>

<style scoped>
</style>
