import { defineStore } from 'pinia'
export const useStore = defineStore('main', {
  state: () => ({
    // 存储全局状态
    selectedIndex: 1 //菜单选中状态
  }),
  actions: {
    setSelectedIndex(index) {
      this.selectedIndex = index
      console.log('pinia:', this.selectedIndex)
    }
  }
})
