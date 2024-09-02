<template>
  <div class="title-bar">
    <!-- @mousedown="titleBar" -->
    <span style="background: #2e2e2e; display: block">笔记</span>
    <div class="title-btn">
      <button @click="minimize">—</button>
      <span>
        <button v-if="maxState" @click="maximize(true)">▭</button>
        <button v-else @click="maximize(false)">[&nbsp;&nbsp;]</button>
      </span>
      <button @click="close">X</button>
    </div>
  </div>
  <leftMenu />
  <leftList @focus-input="focusInputOnMain" />
  <maintext ref="maintextComponent" />
</template>

<script setup>
import { ref } from 'vue'
import leftMenu from './components/leftMenu.vue'
import leftList from './components/leftList.vue'
import maintext from './components/mainText.vue'

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

const maintextComponent = ref(null)
const focusInputOnMain = () => {
  // 通过 组件中的 input，并设置焦点
  if (maintextComponent.value && maintextComponent.value.focusInput()) {
    maintextComponent.value.focusInput()
  }
}
</script>
<style>
body {
  background: transparent;
  border: 1px solid #dedede;
  border-radius: 5px;
  overflow: hidden;
}
.title-bar {
  border-top-right-radius: 5px;
  width: 100%;
  background-color: #f5f5f5;
  color: #777;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  /*  align-items: center; */
  cursor: default; /* 使鼠标指针看起来是默认状态 */
  -webkit-app-region: drag;
  border-bottom: 1px solid #dedede;
}
.title-btn {
  -webkit-app-region: no-drag;
}
.title-bar button {
  background: none;
  border: none;
  color: #222;
  cursor: pointer;
  font-size: 14px;
  margin-left: 8px;
}
.content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
