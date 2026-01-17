import { create } from 'zustand'
import type { IUser } from '../types'
import { devtools } from 'zustand/middleware'

type Store = {
  user: null | IUser
  setUser: (user: IUser) => void
  logout: ()=>void
}

export const userStore = create<Store>()(devtools( (set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
  logout: () => set({ user: null }),
})))