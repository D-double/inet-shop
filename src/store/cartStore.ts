import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { IProduct } from '../types';
import calcTotalPrice from '../utils/calcTotalPrice';

export interface ICartProduct extends IProduct {
  amount: number;
}
interface ICartStore {
  cart: ICartProduct[],
  addToCart: (product: IProduct) => void
  totalPrice: number;
  minusItem: (id: number) => void;
  removeItem: (id: number) => void;
}

const data = localStorage.getItem('cart')
const carts: ICartProduct[] = data ? JSON.parse(data) : []
const total = carts.reduce((sum, obj) => {
  return +obj.price * obj.amount! + sum
}, 0)

const cartStore = create<ICartStore>()(devtools(
  (set) => ({
    cart: carts,
    totalPrice: total,
    addToCart: (product) => {
      set((state) => {
        const { cart } = state;
        const find = cart.find((elem) => elem.id == product.id);
        let newCart = cart;
        if (find) {
          newCart = cart.map((elem) => (
            elem.id == product.id ? { ...elem, amount: elem.amount + 1 } : elem
          ))

        } else {
          newCart = [...cart, { ...product, amount: 1 }]
        }
        return { cart: newCart, totalPrice: calcTotalPrice(newCart) }
      })
    },
    minusItem: (id: number) => {
      set((state) => {
        const { cart } = state;
        const newCart = cart.map((item) =>
          item.id === id && item.amount && item.amount > 1 ? { ...item, amount: item.amount - 1 } : item
        );
        return { cart: newCart, totalPrice: calcTotalPrice(newCart) }
      })
    },
    removeItem: (id:number) => {
      set((state) => {
        const { cart } = state;
        const filteredCart = cart.filter(obj => obj.id !== id)
        return { cart: filteredCart, totalPrice: calcTotalPrice(filteredCart) }
      })
    }
  })
))
export default cartStore
