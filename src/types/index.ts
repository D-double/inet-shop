export interface IRegister {
  username: string;
  email: string;
  password: string;
  password2: string;
}

export interface IProfile {
  username: string;
  email: string;
  password: string;
  avatar: FileList;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IUser {
  avatar: null | string;
  email: string;
  id: number;
  username: string;
}

export interface IProduct {
  description: string;
  id: number;
  image: string;
  price: string;
  quantity: number;
  rating: number;
  title: string;
}

export interface ISelectedItem { 
    selected: number
}

export interface ICartProduct extends IProduct {
  count: number
}