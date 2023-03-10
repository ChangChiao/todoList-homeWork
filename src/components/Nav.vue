<script setup lang="ts">
import { computed } from "vue";
import { Todo } from "../types/todo";
import Burger from "./Burger.vue";
interface NavProps {
  todoList: Todo[];
  activeIndex: number;
  isOpenMenu: boolean;
}
const props = defineProps<NavProps>();
const emit = defineEmits(["addTodo", "selectTodo"]);

const isUpperLimit = computed(() => {
  return props.todoList.length >= 10;
});

const addTodo = () => {
  if (isUpperLimit.value) return;
  emit("addTodo");
};
</script>

<template>
  <nav
    :class="[
      isOpenMenu? 'translate-x-0' : '-translate-x-[250px]',
      'h-screen w-[250px] fixed z-20 duration-300 md:translate-x-0 md:relative bg-primary-normal',
    ]"
  >
    <h1 class="py-3 px-5 text-xl flex justify-between">
        Demo Todo List
        <Burger class="md:hidden" />
    </h1>
    <ul>
      <li
        @click="() => emit('selectTodo', i)"
        :class="[
          i === activeIndex && 'active',
          'h-12 px-5 mb-1 cursor-pointer truncate relative leading-[44px] bg-primary-dark',
        ]"
        v-for="(item, i) in todoList"
        :key="item.id"
      >
        {{ i + 1 }}. {{ item.title }}
      </li>
    </ul>
    <button
      :disabled="isUpperLimit"
      :class="['btn', isUpperLimit && 'bg-gray-300']"
      @click="addTodo"
    >
      Add Item
    </button>
  </nav>
</template>

<style scoped>
.active {
  @apply after:content-['']
    after:absolute
    after:w-0
    after:h-0
    after:right-0
    after:border-white
    after:border-[24px]
    after:border-l-transparent
    after:border-t-transparent
    after:border-b-transparent;
}
</style>
