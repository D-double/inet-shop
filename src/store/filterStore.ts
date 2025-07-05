import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface IFilterStore {
  sortValue: string;
  setSortValue: (value: string) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  currentPage: number;
  setCurrentPage:(value:number) => void
  limit: number;
  skip: number;
  setSkip: (value: number) => void
}

const filterStore = create<IFilterStore>()(devtools(
(set) => ({
  sortValue: '',
  setSortValue: (value) => set({ sortValue: value }),
  searchValue: '',
  setSearchValue: (value) => set({ searchValue: value }),
  currentPage: 1,
  setCurrentPage: (value) => set({ currentPage: value }),
  limit: 6,
  skip: 0,
  setSkip: (value:number) => set({skip: value})
})
))

export default filterStore