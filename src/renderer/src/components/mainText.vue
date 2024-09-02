<template>
  <div class="main-text">
    <div class="title-box">
      <el-input
        ref="inputRef"
        v-model="param.name"
        class="no-border"
        maxlength="20"
        placeholder="标题"
        show-word-limit
        type="text"
        size="large"
        clearable
      />
    </div>
    <div class="menu-box-tag">
      <div class="tag">
        <el-tag effect="light"> {{ param.listName }} </el-tag>
      </div>
      <div class="save-button">
        <el-button type="success" alt="或者Ctrl + S" @click="saveEvent">保存</el-button>
      </div>
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
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, watch, defineExpose } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from '../store/index'
import { v4 as uuidv4 } from 'uuid'

const store = useStore()

let param = reactive(store.notepaper)

const saveEvent = (event) => {
  // 阻止默认的保存行为
  event.preventDefault()

  if (param.name == '') {
    ElMessage({
      message: '标题不能为空',
      type: 'error'
    })
    return
  }
  // else if (param.textarea == '') {
  //   ElMessage({
  //     message: '内容不能为空',
  //     type: 'error'
  //   })
  // }
  else {
    if (!param.id) {
      param.id = uuidv4()
    }

    ElMessage({
      message: '保存成功',
      type: 'success'
    })
  }
  console.log('param', param)
  //判断store.noteBook数组中包含param.id的元素是否存在
  let isExist = store.noteBook.some((item) => {
    return item.id === param.id
  })
  if (isExist) {
    store.noteBook.forEach((item) => {
      if (item.id === param.id) {
        item.name = param.name
        item.listName = param.listName
        item.textarea = param.textarea
      }
    })
  } else {
    store.setNoteBook({ listId: store.listSelectIndex, ...param })
  }
}
const handleKeydown = (event) => {
  // 检查是否按下 Ctrl + S
  if (event.ctrlKey && event.key === 's') {
    saveEvent(event)
  }
}

watch(
  () => store.noteNameSelectIndex,
  (newVal) => {
    if (newVal) {
      let pnk = store.noteBook.filter((item) => {
        console.log(item)
        return item.id.includes(newVal)
        // 修正这里
      })
      // 直接修改 param 的属性，而不是替换 param 的引用
      param.id = pnk[0].id
      param.name = pnk[0].name
      param.listName = pnk[0].listName
      param.textarea = pnk[0].textarea
    }
  }
)
watch(
  () => store.notepaper,
  (newVal) => {
    if (newVal) {
      param.id = uuidv4()
      param.name = ''
      param.listName = store.notepaper.listName
      param.textarea = ''
    }
  }
)

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// 提供一个方法给父组件调用，以设置焦点
const inputRef = ref(null)
const focusInput = () => {
  inputRef.value?.focus()
}
defineExpose({ focusInput })
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
  padding: 10px 0 0 0px;
  background-color: #fff;
}
.main-text .title-box .no-border {
  border: none;
  box-shadow: none;
  outline: none !important;
  width: 100%;
  border-bottom: 1px solid #eee;
  font-size: 16px;
}
.main-text .title-box .no-border .el-input__wrapper {
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
  background-color: transparent;
  padding-left: 25px;
}
.main-text .title-box .no-border .el-input__wrapper .el-input__inner {
  font-weight: 700;
  color: #111;
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
  height: calc(100vh - 140px);
  font-size: 14px;
  color: #111;
  display: flex;
}
.main-text .main-box .textarea-style .el-textarea__inner {
  border: none !important;
  box-shadow: none !important;
  flex: 1; /* 使 textarea 填满父级容器 */
}

.menu-box-tag {
  background-color: rgb(245, 245, 245);
  width: 90%;
  height: 30px;
  /* display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px;
  box-sizing: border-box; */
  border-bottom: 1px solid #eee;
}
.menu-box-tag .save-button {
  float: right;
}

.menu-box-tag .tag {
  padding-left: 25px;
  display: inline-block;
}
</style>
