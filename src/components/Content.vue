<script setup lang="ts">
import { computed } from "vue";
import { Todo } from "../types/todo";
import Datepicker from "@vuepic/vue-datepicker";
const validType = ["image/jpg", "image/jpeg", "image/png"];

interface ContentProps {
  activeTodo: Todo;
}
const props = defineProps<ContentProps>();
const emit = defineEmits(["editTodo", "deleteTodo"]);

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

const beforeDate = computed(() => {
    const date = props.activeTodo?.endDate
    if(date === '') return undefined;
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() - 1)
    return newDate
})

const afterDate = computed (() => {
    const date = props.activeTodo?.startDate
    if(date === '') return undefined;
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + 1)
    return newDate
})
</script>

<template>
  <section class="px-5 w-[calc(100vw-250px)]">
    <header class="flex justify-end text-xl h-[66px] items-center">
      <font-awesome-icon
        @click="() => emit('deleteTodo')"
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
    <div class="flex justify-between items-center mt-6">
      <div class="w-[48%]">
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
          <div class="float-right text-sm text-gray-500">{{activeTodo?.content?.length}} / 200</div>
        </div>
        <div class="flex items-center mt-4 justify-between">
          <Datepicker
            :format="'yyyy/MM/dd'"
            placeholder="請選擇起始時間"
            :max-date="beforeDate"
            :modelValue="activeTodo?.startDate"
            :enable-time-picker="false"
            @update:modelValue="(val:string) => updateDate('startDate', val)"
          />
          ~
          <Datepicker
            :format="'yyyy/MM/dd'"
            placeholder="請選擇結束時間"
            :min-date="afterDate"
            :modelValue="activeTodo?.endDate"
            :enable-time-picker="false"
            @update:modelValue="(val:string) => updateDate('endDate', val)"
          />
        </div>
      </div>
      <div class="w-[48%]">
        <div class="bg-secondary h-[150px] rounded-lg overflow-hidden">
          <img :src="activeTodo?.cover" alt="" />
        </div>
        <label class="btn w-full leading-[44px]" for="file">Upload Image</label>
        <input class="hidden" id="file" type="file" @change="uploadCover" />
      </div>
    </div>
  </section>
</template>
