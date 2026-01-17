import { create } from "zustand";
import type { ICartProduct, IProduct } from "../types";
import { devtools } from "zustand/middleware";

type Store = {
  cart: ICartProduct[];
  totalPrice: number;
  changeTotalPrice: ()=>void
  addToCart: (val: IProduct) => void;
  minusItem: (id: number)=>void
  delItem: (id: number)=>void
};

const data = localStorage.getItem('cart');
const localCart: ICartProduct[] = data ? JSON.parse(data) : [];
const total = localCart.reduce((acc, elem)=>{
  return acc + (+elem.price * elem.count)
}, 0)

export const cartStore = create<Store>()(
  devtools((set) => ({
    cart: localCart,
    totalPrice: total,
    changeTotalPrice: ()=>{
      set((state) => {
        const {cart} = state;
        const sum = cart.reduce((acc, elem)=>{
                      return acc + (+elem.price * elem.count)
                    }, 0);
        return { totalPrice: sum}  
      })
    },
    addToCart: (val) =>
      set((state) => {
        const {cart} = state;
        const find = cart.find((elem)=> elem.id == val.id)
        if (find) {
            return {
                cart: cart.map((elem)=> 
                    elem.id == val.id ? {...elem, count: elem.count + 1} : elem) 
            }
        } else {
            return { cart: [...state.cart, { ...val, count: 1 }] };            
        }
      }),
    minusItem: (id)=>
      set((state) => {
        const {cart} = state;
          return {
              cart: cart.map((elem)=> 
                  elem.id == id && elem.count > 1 ? {...elem, count: elem.count - 1} : elem) 
          }
      }),
    delItem: (id)=>
      set((state) => {
        const {cart} = state;
          return {
              cart: cart.filter((elem)=> elem.id != id)
          }
      }),
    
  }))
);
