<template>
  <div class="app-layout">
    <div class="app-siderbar">
      <Siderbar></Siderbar>
    </div>
    <div class="app-main">
      <Main></Main>
    </div>
  </div>
</template>

<script setup>
import Main from './main.vue';
import Siderbar from './siderbar.vue';
import { onMounted, reactive, ref } from 'vue';
onMounted(() => {});
const props = defineProps({});
// emits
const emits = defineEmits([]);
</script>
<style scoped lang='less'>
.app-layout {
  display: flex;
  width: 100vw;
  height: 100vh;
  .app-siderbar {
    width: 320px;
    height: 100vh;
  }
  .app-main {
    flex: 1;
    overflow-y: scroll;
  }
}
</style>
