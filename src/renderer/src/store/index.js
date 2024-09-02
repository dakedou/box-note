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
      } else if (typeof listBooks === 'object' && listBooks !== null) {
        this.listBooks.unshift(listBooks)
        //给本地文件添加笔记本
        window.electron.booksnamesaveJson({ bookList: JSON.stringify(this.listBooks) })
      }
    },
    async loadBookList() {
      //读取笔记本列表
      try {
        const data = await window.electron.booksnamereadJson() // 调用读取 JSON 的方法
        console.log('读取笔记本列表：：：：：：：：：：：', JSON.parse(data.bookList))
        this.setListBooks(JSON.parse(data.bookList))
      } catch (error) {
        console.error('读取 JSON 文件时出错:', error)
      }
    },
    deleteListBooks(id) {
      this.listBooks = this.listBooks.filter((item) => item.id !== id)
      window.electron.booksnamesaveJson({ bookList: JSON.stringify(this.listBooks) })
    },
    setNoteNameSelectIndex(index) {
      this.noteNameSelectIndex = index
    },
    setNoteBook(noteBook) {
      //添加笔记

      if (Array.isArray(noteBook)) {
        console.log('888888888')
        this.noteBook = noteBook
      } else if (typeof noteBook === 'object' && noteBook !== null) {
        console.log('lllllllllllll')
        this.noteBook.unshift(noteBook)
        //给本地文件添加笔记本
        window.electron.notesnamesaveJson({ noteBookList: JSON.stringify(this.noteBook) })
      }
    },
    async loadNoteList() {
      //读取笔记列表
      try {
        const data = await window.electron.notesnamereadJson() // 调用读取 JSON 的方法
        console.log('读取笔记列表：：：：：：：：：：：', JSON.parse(data.noteBookList))
        this.noteBook = JSON.parse(data.noteBookList)
      } catch (error) {
        console.error('读取 JSON 文件时出错:', error)
      }
    },
    setNotepaper(note) {
      // console.log('笔记本里记载着', note)
      this.notepaper = note
      // console.log({ name: this.note })
      // window.electron.saveJson({ name: this.note })
    }
  }
})
