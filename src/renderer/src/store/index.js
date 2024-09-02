import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
export const useStore = defineStore('main', {
  state: () => ({
    // 存储全局状态
    selectedIndex: 'pcc01', //菜单选中状态1
    listSelectIndex: 'morenbijiben', //笔记本选中状态2
    listBooks: [
      { id: 'morenbijiben', name: '默认笔记本' },
      { id: uuidv4(), name: '全部笔记' }
    ], //笔记本列表
    noteBook: [], //笔记列表
    notepaper: {
      id: '',
      name: '',
      listName: '',
      textarea: ''
    }, //笔记内容
    noteNameSelectIndex: '' //笔记选中状态3
  }),
  actions: {
    setSelectedIndex(index) {
      this.selectedIndex = index
      console.log('pinia:', this.selectedIndex)
    },
    setNoteBook(noteBook) {
      this.noteBook.unshift(noteBook)
    },
    setListSelectIndex(index) {
      console.log('变动了', index)
      this.listSelectIndex = index
    },
    setNoteNameSelectIndex(index) {
      this.noteNameSelectIndex = index
    },
    setNotepaper(note) {
      // console.log('笔记本里记载着', note)
      this.notepaper = note
    },
    setListBooks(listBooks) {
      this.listBooks = listBooks
    }
  }
})
