<script setup lang="ts">
import { inject } from "vue";
import { TodoList } from "../symbol";
const todoList = inject(TodoList);
console.log('todoList', todoList)
</script>

<template>
    <nav class="h-screen w-[250px] bg-primary-normal">
        <h1 class="py-3 px-5 text-xl">Demo Todo List</h1>
        <ul>
            <li class="h-12 px-5 relative leading-[44px] bg-primary-dark" v-for="(item, i) in todoList" :key="item.id">
               {{ i + 1 }}. {{ item.title }}
            </li>
        </ul>
        <button class="rounded-lg mt-5 bg-primary-light text-center w-56 h-[44px]">
            Add Item
        </button>
    </nav>
</template>

<style scoped>

</style>