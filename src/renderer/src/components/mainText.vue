<template>
  <div class="main-text">
    <div class="title-box">
      <el-input
        v-model="param.title"
        class="no-border"
        maxlength="20"
        placeholder="输入标题"
        show-word-limit
        type="text"
        size="large"
        clearable
      />
    </div>

    <div class="main-box">
      <el-input
        v-model="param.textarea"
        maxlength="4000"
        class="textarea-style"
        placeholder="输入内容"
        show-word-limit
        type="textarea"
        resize="none"
        clearable
      />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

let param = reactive({
  title: '',
  textarea: ''
})
</script>

<style>
.main-text {
  background-color: #f5f5f5;
  width: calc(100% - 290px);
  height: 100vh;
  overflow-y: auto;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 48px;
}

.main-text .title-box {
  padding: 10px 10px 0 10px;
  background-color: #fff;
}
.main-text .title-box .no-border {
  border: none;
  box-shadow: none;
  outline: none !important;
  width: 100%;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  color: #111;
}
.main-text .title-box .no-border .el-input__wrapper {
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
  background-color: transparent;
}

.main-text .main-box {
  background-color: #fff;
  overflow-y: auto;
}
.main-text .main-box .textarea-style {
  padding: 10px 10px 20px 15px;
  border: none;
  box-shadow: none;
  outline: none !important;
  width: 100%;
  height: calc(100vh - 100px);
  font-size: 14px;
  color: #111;
  display: flex;
}
.main-text .main-box .textarea-style .el-textarea__inner {
  border: none !important;
  box-shadow: none !important;
  flex: 1; /* 使 textarea 填满父级容器 */
}
</style>
