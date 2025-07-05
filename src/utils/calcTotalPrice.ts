import { ICartProduct } from "../store/cartStore"
const calcTotalPrice = (carts: ICartProduct[]): number => {
  return carts.reduce((sum, obj) => {
    return +obj.price * obj.amount! + sum
  }, 0)
}

export default calcTotalPrice