<script setup lang="ts">
import { inject } from "vue";
import { handleMenuType, isOpenMenuType } from "../symbol"
const handleMenu = inject(handleMenuType)
const isOpenMenu = inject(isOpenMenuType)
</script>

<template>
  <div class="block md:hidden relative w-7 h-7">
    <input
      class="hidden peer"
      @change="handleMenu && handleMenu();"
      type="checkbox"
      :checked="isOpenMenu"
      id="menu-toggle"
    />
    <label id="burger" for="menu-toggle"></label>
  </div>
</template>

<style scoped>
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
    peer-checked:bg-primary-normal
    peer-checked:before:top-[10px]
    peer-checked:before:left-[0px]
    peer-checked:before:rotate-45
    peer-checked:before:duration-200
    peer-checked:after:top-[10px]
    peer-checked:after:left-[0px]
    peer-checked:after:-rotate-45
    peer-checked:after:duration-200;
}
</style>
