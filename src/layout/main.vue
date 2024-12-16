<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue"
const props = defineProps({});
// emits
const emits = defineEmits([])
</script>
<style scoped lang='scss'></style>
