<template>
  <div class="main-text">
    <div class="title-box">
      <el-input
        v-model="param.title"
        class="no-border"
        maxlength="20"
        placeholder="标题"
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
        placeholder="暂无内容"
        show-word-limit
        type="textarea"
        resize="none"
      />
    </div>
    <div class="save-button">
      <el-button type="success" alt="或者Ctrl + S" @click="saveEvent">保存</el-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'

let param = reactive({
  title: '',
  textarea: ''
})

const saveEvent = (event) => {
  // 阻止默认的保存行为
  event.preventDefault()

  if (param.title == '') {
    ElMessage({
      message: '标题不能为空',
      type: 'error'
    })
    return
  } else if (param.textarea == '') {
    ElMessage({
      message: '内容不能为空',
      type: 'error'
    })
  } else {
    ElMessage({
      message: '保存成功',
      type: 'success'
    })
  }
  console.log(param)
}
const handleKeydown = (event) => {
  // 检查是否按下 Ctrl + S
  if (event.ctrlKey && event.key === 's') {
    saveEvent(event)
  }
}
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
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
  margin-bottom: 10px;
  border: none;
  box-shadow: none;
  outline: none !important;
  width: 100%;
  height: calc(100vh - 110px);
  font-size: 14px;
  color: #111;
  display: flex;
}
.main-text .main-box .textarea-style .el-textarea__inner {
  border: none !important;
  box-shadow: none !important;
  flex: 1; /* 使 textarea 填满父级容器 */
}

.main-text .save-button {
  position: fixed;
  bottom: 8px;
  right: 80px;
}
</style>
