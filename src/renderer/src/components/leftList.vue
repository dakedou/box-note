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
      <el-button
        v-if="menuDataIndex === 'pcc01'"
        type="success"
        size="default"
        class="add-btn"
        @click="addBook"
      >
        <el-icon><Plus /></el-icon
      ></el-button>
    </div>
    <ul v-if="menuDataIndex === 'pcc01'">
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
        :style="{ background: listSelectIndex == item.id ? '#c4c4c4' : '#ececea' }"
        @click="selectListIcon(item.id)"
      >
        <span class="item-left"> {{ item.name }}</span>
        <!-- ellipsis -->
        <span class="item-right">
          <el-popconfirm
            title="确定要删除这个笔记本吗?删除后不可恢复；本子下的旧笔记将转移到默认笔记本中；"
            @confirm="deleteBook(item)"
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
    <ul v-else>
      <template v-if="filteredBookName.length">
        <li
          v-for="item in filteredBookName"
          :key="item.id"
          :style="{ background: noteNameSelectIndex === item.id ? '#c4c4c4' : '#ececea' }"
          @click="selectNote(item.id)"
        >
          <span class="item-left ellipsis"> {{ item.name }}</span>
          <span class="item-right">
            <el-popconfirm
              title="确定要删除这条笔记吗?删除后不可恢复；"
              @confirm="deleteNote(item.id)"
              confirm-button-text="删除"
              cancel-button-text="取消"
              width="200"
            >
              <template #reference>
                <el-icon color="#999"><RemoveFilled /></el-icon>
              </template>
            </el-popconfirm>
          </span>
        </li>
      </template>
      <template v-else>
        <div class="no-data">暂无笔记</div>
      </template>
    </ul>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { v4 as uuidv4 } from 'uuid'
import { useStore } from '../store/index'

const store = useStore()

//获取menu菜单选中的数据
const menuDataIndex = computed(() => {
  return store.selectedIndex
})

let searchValue = ref('')
let booklist = reactive(store.listBooks)

let addBookValue = ref('')
// 响应式变量来跟踪选中的图标索引
let listSelectIndex = ref(store.listSelectIndex)

let isShowInput = ref(false)

// 选择图标的函数
const selectListIcon = (id) => {
  store.setListSelectIndex(id)
  listSelectIndex.value = store.listSelectIndex

  store.listBooks.forEach((item) => {
    if (item.id === id) {
      let params = { id: '', name: '', listName: item.name }
      store.setNotepaper(params) //清空便签
    }
  })
}

//选择笔记后的状态
let noteNameSelectIndex = ref('')
const selectNote = (id) => {
  noteNameSelectIndex.value = id
  store.setNoteNameSelectIndex(id)
}

// 计算属性：过滤后的书籍列表
const filteredBookList = computed(() => {
  return store.listBooks.filter((item) => {
    return item.name.includes(searchValue.value)
  })
})
const filteredBookName = computed(() => {
  return store.noteBook.filter((item) => {
    return item.name.includes(searchValue.value) // 修正这里
  })
})
// 计算属性：排序后的书籍列表
const sortedBookList = computed(() => {
  const defaultBook = filteredBookList.value.find((item) => item.name === '默认笔记本')
  const otherBooks = filteredBookList.value.filter((item) => item.name !== '默认笔记本')
  return defaultBook ? [defaultBook, ...otherBooks] : otherBooks
})

// 引用输入框

const addBook = () => {
  isShowInput.value = true
}

const addBookEvent = () => {
  const b = { id: uuidv4(), name: addBookValue.value }
  store.setListBooks(b)

  addBookValue.value = ''
  isShowInput.value = false
}
const deleteBook = (el) => {
  if (el.name === '默认笔记本') {
    ElMessage({
      message: '默认笔记本不能被删除',
      type: 'warning'
    })
    return // 直接返回，不执行删除
  }
  store.deleteListBooks(el.id)
}
const deleteNote = (index) => {
  store.noteBook = store.noteBook.filter((note) => note.id !== index)
}
//根据store.listSelectIndex变得修改listSelectIndex
watch(
  () => store.listSelectIndex,
  (newValue) => {
    listSelectIndex.value = newValue
  }
)

//读取数据

onMounted(() => {
  store.loadBookList()
  store.loadNoteList()
})
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
.no-data {
  text-align: center;
  color: #999;
  font-size: 14px;
  line-height: 38px;
}
</style>
