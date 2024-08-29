<template>
  <div class="main-left-list">
    <div class="search">
      <el-input
        v-model="searchValue"
        style="max-width: 600px"
        placeholder="搜索内容"
        size="default"
        class="input-with-select"
        clearable
      >
      </el-input>
      <el-button type="success" size="default" class="add-btn" @click="addBook">
        <el-icon><Plus /></el-icon
      ></el-button>
    </div>
    <ul v-if="menuDataIndex === 0">
      <el-input
        v-if="isShowInput"
        v-model.trim="addBookValue"
        placeholder="新增一个笔记本"
        size="default"
        class="input-with-add"
        clearable
        @change="addBookEvent"
      >
      </el-input>
      <li
        v-for="(item, index) in sortedBookList"
        :key="index"
        :style="{ background: selectedIndex === index ? '#c4c4c4' : '#ececea' }"
        @click="selectIcon(index)"
      >
        <span class="item-left"> {{ item.name }}</span>
        <span class="item-right">
          <el-popconfirm
            title="确定要删除这个笔记本吗?删除后不可恢复；本子下的旧笔记将转移到默认笔记本中；"
            @confirm="deleteBook(index)"
            confirm-button-text="删除"
            cancel-button-text="取消"
            width="320"
          >
            <template #reference>
              <el-icon color="#999"><RemoveFilled /></el-icon>
            </template>
          </el-popconfirm>
        </span>
      </li>
    </ul>
    <ul>
      <li v-for="item in bookName" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useStore } from '../store/index'

const store = useStore()

//获取menu菜单选中的数据
const menuDataIndex = computed(() => {
  return store.selectedIndex
})

let searchValue = ref('')
let booklist = reactive([
  { id: uuidv4(), name: '默认笔记本' },
  { id: uuidv4(), name: '全部笔记' }
])

let bookName = reactive([
  {
    id: uuidv4(),
    name: '11111111111'
  },
  {
    id: uuidv4(),
    name: '2222222222'
  },
  {
    id: uuidv4(),
    name: '3333333333'
  }
])

let addBookValue = ref('')
// 响应式变量来跟踪选中的图标索引
const selectedIndex = ref(0)

let isShowInput = ref(false)

// 选择图标的函数
const selectIcon = (index) => {
  selectedIndex.value = index
}
// 计算属性：过滤后的书籍列表
const filteredBookList = computed(() => {
  return booklist.filter((item) => {
    return item.name.includes(searchValue.value)
  })
})
// 计算属性：排序后的书籍列表
const sortedBookList = computed(() => {
  const defaultBook = filteredBookList.value.find((item) => item.name === '默认笔记本')
  const otherBooks = filteredBookList.value.filter((item) => item.name !== '默认笔记本')
  return defaultBook ? [defaultBook, ...otherBooks] : otherBooks
})
const addBook = () => {
  isShowInput.value = true
}

const addBookEvent = () => {
  booklist.unshift({ id: uuidv4(), name: addBookValue.value })
  addBookValue.value = ''
  isShowInput.value = false
}
const deleteBook = (index) => {
  booklist.splice(index, 1)
}
</script>
<style>
.main-left-list {
  width: 230px;
  height: 100%;
  background-color: #f7f7f7;
  position: fixed;
  top: 0;
  left: 60px;
  z-index: 999;
  border: 1px solid #dedede;
}
.main-left-list .search {
  height: 60px;
  line-height: 60px;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.main-left-list .search .input-with-select {
  width: calc(100% - 50px);

  -webkit-app-region: no-drag;
}
.main-left-list .search .input-with-select .el-input__wrapper {
  background-color: #e2e2e2;
}

.main-left-list .search .add-btn {
  width: 40px;
  background-color: #e2e2e2;
  border: none;
  color: #585858;
  -webkit-app-region: no-drag;
}
.main-left-list ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
  height: calc(100vh - 62px);
  overflow-y: auto;
  overflow-x: hidden;
}
.main-left-list ul li {
  line-height: 38px;
  border-bottom: 1px solid #eee;
  width: 100%;
  display: flex;
  align-items: left;
  cursor: pointer;
  padding-left: 10px;
  color: #555;
}

.main-left-list ul li .item-left {
  width: 80%;
}
.main-left-list ul li .item-right {
  width: 20%;
}
.main-left-list .input-with-add {
  margin-bottom: 10px;
}
</style>
