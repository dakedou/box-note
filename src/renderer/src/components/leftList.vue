<template>
  <div class="main-left-list">
    <div class="search">
      <el-input
        v-model="searchValue"
        style="max-width: 600px"
        placeholder="搜索内容"
        size="default"
        class="input-with-select"
      >
      </el-input>
      <el-button type="success" size="default" class="search-btn">
        <el-icon><Search /></el-icon
      ></el-button>
    </div>
    <ul>
      <li
        v-for="(item, index) in booklist"
        :key="index"
        :style="{ background: selectedIndex === index ? '#c4c4c4' : '#ececea' }"
        @click="selectIcon(index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
let searchValue = ref('')
let booklist = [
  { id: '01', name: '新建笔记' },
  { id: '02', name: '全部笔记' }
]
// 响应式变量来跟踪选中的图标索引
const selectedIndex = ref(0)
// 选择图标的函数
const selectIcon = (index) => {
  selectedIndex.value = index
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

.main-left-list .search .search-btn {
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
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.main-left-list ul li {
  line-height: 38px;
  border-bottom: 1px solid #eee;
  width: 100%;
  display: block;
  align-items: left;
  cursor: pointer;
  padding-left: 10px;
  color: #555;
}
</style>
