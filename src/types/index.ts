export interface IRegister {
  username: string
  email: string,
  password: string,
  password2: string,
}

export interface ILogin {
  username: string
  password: string,
}

export interface IProduct {
  id: number
  title: string
  description: string
  image: string
  rating:  number
  price: string
  quantity: number | null
}

export interface IProfile {
  username: string
  email: string,
  password: string,
  avatar: FileList,
}

export interface IProfileInfo {
  id: number,
  username: string
  email: string,
  password: string,
}
export interface IProfileAvatar {
  id: number,
  avatar: FormData
}