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

    setListSelectIndex(index) {
      this.listSelectIndex = index
    },
    setListBooks(listBooks) {
      if (Array.isArray(listBooks)) {
        this.listBooks = listBooks
        console.log('笔记本列表arr', this.listBooks)
      } else if (typeof listBooks === 'object' && listBooks !== null) {
        this.listBooks.unshift(listBooks)
        console.log('笔记本列表obj', this.listBooks)
        window.electron.saveJson({ bookList: JSON.stringify(this.listBooks) })
      }
    },
    async loadBookList() {
      //读取笔记本列表
      try {
        const data = await window.electron.readJson() // 调用读取 JSON 的方法

        console.log('读取笔记本列表：：：：：：：：：：：', JSON.parse(data.bookList))
        this.setListBooks(JSON.parse(data.bookList))
      } catch (error) {
        console.error('读取 JSON 文件时出错:', error)
      }
    },
    setNoteNameSelectIndex(index) {
      this.noteNameSelectIndex = index
    },
    setNoteBook(noteBook) {
      this.noteBook.unshift(noteBook)
      //添加笔记
      // console.log('添加笔记', this.noteBook)
      // window.electron.saveJson({ a: JSON.stringify(this.noteBook) })
    },
    setNotepaper(note) {
      // console.log('笔记本里记载着', note)
      this.notepaper = note
      console.log({ name: this.note })
      window.electron.saveJson({ name: this.note })
    }
  }
})
