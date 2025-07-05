import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface IUser {
  id: string;
  email: string;
  avatar?: string | ArrayBuffer | null;
  username: string
}

interface IUserStore {
  user: null | IUser,
  isAuth: boolean,
  setUser: (data: IUser) => void,
  logout: () => void
}

const userStore = create<IUserStore>()(devtools(
  (set) => ({
    user: null,
    isAuth: false,
    setUser: (data) => set({ user: data, isAuth: true }),
    logout: () => set({ user: null, isAuth: false })
  })
))

export default userStore