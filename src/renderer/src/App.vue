<template>
  <div class="title-bar">
    <!-- @mousedown="titleBar" -->
    <span>笔记盒子</span>
    <div class="title-btn">
      <button @click="minimize">_</button>
      <span>
        <button v-if="maxState" @click="maximize(true)">口</button>
        <button v-else @click="maximize(false)">[&nbsp;&nbsp;]</button>
      </span>
      <button @click="close">X</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
//判断最大化还是最小化
let maxState = ref(true)

const minimize = () => {
  window.electron.ipcRenderer.send('minimize-window')
}
const maximize = (el) => {
  maxState.value = !maxState.value
  window.electron.ipcRenderer.send('maximize-window', el)
}
const close = () => {
  window.electron.ipcRenderer.send('close-window')
}
// 允许拖动窗口
// const titleBar = () => {
//   window.electron.ipcRenderer.send('drag-window')
// }
</script>
<style>
/* body {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f0f0f0;
} */
.title-bar {
  width: 100%;
  background-color: #333;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  /*  align-items: center; */
  cursor: default; /* 使鼠标指针看起来是默认状态 */
  -webkit-app-region: drag;
}
.title-btn {
  -webkit-app-region: no-drag;
}
.title-bar button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
}
.content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
