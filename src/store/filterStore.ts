import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type Store = {
  sortVal: string
  setSortVal: (sort: string) => void  
  searchVal: string
  setSearchVal: (search: string) => void 
  currentPage: number
  setCurrentPage: (val: number)=> void,
  limit: number,
  offset: number,
  setOffset: (val: number)=> void
}

export const filterStore = create<Store>()(devtools( (set) => ({
  sortVal: '',
  setSortVal: (sort) => set({ sortVal: sort }),
  searchVal: '',
  setSearchVal: (search)=> set({searchVal: search}),
  currentPage: 0,
  setCurrentPage: (val)=> set({currentPage: val}),
  limit: 6,
  offset: 0,
  setOffset: (val)=> set({offset: val})
})))