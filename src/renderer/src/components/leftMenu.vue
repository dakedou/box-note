<template>
  <div class="main-left-menu">
    <ul>
      <li
        v-for="ico in iconList"
        :key="ico.id"
        :style="{ color: selectedIndex === ico.id ? '#05c160' : '#979797' }"
        @click="selectIcon(ico)"
      >
        <el-popover
          placement="right"
          :title="ico.name"
          trigger="hover"
          :show-arrow="false"
          popper-class="poper-main"
        >
          <template #reference>
            <el-icon size="32"><component :is="ico.icon" /> </el-icon>
          </template>
        </el-popover>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElIcon } from 'element-plus'
import { useStore } from '../store/index'

const store = useStore()
let iconList = [
  { id: 'pcc01', icon: 'CirclePlus', name: '新建笔记' },
  { id: 'pcc02', icon: 'Notebook', name: '全部笔记' }
]
// 响应式变量来跟踪选中的图标索引
const selectedIndex = ref('pcc01')

if (selectedIndex.value === 1) {
  store.setNotepaper({ listName: '默认笔记本' })
}

// 选择图标的函数
const selectIcon = (ico) => {
  console.log('Dian-menu', ico.id)
  selectedIndex.value = ico.id
  store.setSelectedIndex(ico.id)
  if (selectedIndex.value === 'pcc01') {
    console.log('morem')
    store.setListSelectIndex('morenbijiben')
  }

  if (store.noteBook.length > 0) {
    store.setNoteNameSelectIndex(store.noteBook[0].id)
    store.setNotepaper({ listName: '默认笔记本' })
  } else {
    store.setNoteNameSelectIndex('')
  }
}
</script>

<style>
.main-left-menu {
  width: 60px;
  height: 100%;
  background-color: #2e2e2e;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 998;
}
.main-left-menu ul {
  list-style-type: none;
  margin-top: 60px;
}
.main-left-menu ul li {
  height: 60px;
  width: 60px;
  /* background-color: #f5f5f5; 
  border-bottom: 1px solid #e0e0e0;*/
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.poper-main {
  padding: 0 !important;
  margin: 0 !important;
  width: auto !important;
  min-width: auto !important;
}
.poper-main .el-popover__title {
  font-size: 12px;
  margin: 0 !important;
  padding: 3px 5px !important;
}
</style>
