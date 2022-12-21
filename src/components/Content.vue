<script setup lang="ts">
import { computed } from "vue";
import { Todo } from "../types/todo";
import Datepicker from "@vuepic/vue-datepicker";
import Burger from "./Burger.vue";
const validType = ["image/jpg", "image/jpeg", "image/png"];

interface ContentProps {
  activeTodo: Todo;
}
const props = defineProps<ContentProps>();
const emit = defineEmits(["editTodo", "deleteTodo"]);


// update todo
const editTitle = (e: Event) => {
  const target = <HTMLInputElement>e.target;
  emit("editTodo", { key: "title", value: target.value });
};

const editContent = (e: Event) => {
  const target = <HTMLTextAreaElement>e.target;
  emit("editTodo", { key: "content", value: target.value });
};

const uploadCover = (e: Event) => {
  const target = <HTMLInputElement>e.target;
  const file = target.files![0];

  if (!validType.includes(file.type)) {
    alert("請上傳副檔名為png、jpg的圖片");
    return;
  }
  const imgSrc = URL.createObjectURL(file);
  emit("editTodo", { key: "cover", value: imgSrc });
};

const updateDate = (type: string, date: string) => {
  emit("editTodo", { key: type, value: date });
};

// for date

const beforeDate = computed(() => {
  const date = props.activeTodo?.endDate;
  if (date === "") return undefined;
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - 1);
  return newDate;
});

const afterDate = computed(() => {
  const date = props.activeTodo?.startDate;
  if (date === "") return undefined;
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return newDate;
});

</script>

<template>
  <section class="px-5 w-full md:w-[calc(100vw-250px)]">
    <header
      class="flex justify-between md:justify-end text-2xl h-[66px] items-center"
    >
      <!-- <div class="block md:hidden relative w-7 h-7">
        <input class="hidden peer" @change="emit('handleMenu')" type="checkbox" id="menu-toggle" />
        <label id="burger" for="menu-toggle"></label>
      </div> -->
      <Burger />
      <font-awesome-icon
        @click="emit('deleteTodo')"
        class="cursor-pointer"
        icon="fa-regular fa-trash-can"
      />
    </header>
    <input
      @input="editTitle"
      placeholder="title..."
      type="text"
      :value="activeTodo?.title"
      maxlength="50"
      class="block w-full px-5"
    />
    <div class="md:flex justify-between items-center mt-4">
      <div class="w-full md:w-[48%]">
        <div class="h-[150px] bg-secondary rounded-lg p-4">
          <textarea
            @input="editContent"
            class="h-[100px] w-full"
            placeholder="content..."
            name=""
            id=""
            :value="activeTodo?.content"
            maxlength="200"
          ></textarea>
          <div class="float-right text-sm text-gray-500">
            200 / {{ activeTodo?.content?.length }}
          </div>
        </div>
        <div class="flex items-center mt-4 justify-between">
          <Datepicker
            :format="'yyyy/MM/dd'"
            placeholder="請選擇起始日期"
            :max-date="beforeDate"
            :modelValue="activeTodo?.startDate"
            :enable-time-picker="false"
            @update:modelValue="(val:string) => updateDate('startDate', val)"
          />
          <span class="px-4">~</span>
          <Datepicker
            :format="'yyyy/MM/dd'"
            placeholder="請選擇結束日期"
            :min-date="afterDate"
            :modelValue="activeTodo?.endDate"
            :enable-time-picker="false"
            @update:modelValue="(val:string) => updateDate('endDate', val)"
          />
        </div>
      </div>
      <div class="w-ful mt-4 md:w-[48%] md:mt-0">
        <div class="bg-secondary h-[150px] rounded-lg overflow-hidden">
          <img class="" :src="activeTodo?.cover" alt="" />
        </div>
        <label class="btn w-full leading-[44px]" for="file">Upload Image</label>
        <input class="hidden" id="file" type="file" @change="uploadCover" />
      </div>
    </div>
  </section>
</template>

<!-- <style scoped>
#burger,
#burger:before,
#burger:after {
  @apply absolute
    bg-black
    w-[24px]
    h-[5px]
    duration-200
    cursor-pointer
    z-10;
}

#burger {
  @apply top-[0px]
    before:content-['']
    before:top-[10px]
    before:left-0
    after:content-['']
    after:top-[20px]
    after:left-0
    duration-200
    peer-checked:bg-white
    peer-checked:before:top-[10px]
    peer-checked:before:left-[0px]
    peer-checked:before:rotate-45
    peer-checked:before:duration-200
    peer-checked:after:top-[10px]
    peer-checked:after:left-[0px]
    peer-checked:after:-rotate-45
    peer-checked:after:duration-200;
}
</style> -->
