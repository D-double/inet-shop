import { closeIcon } from '../../utils'
import s from './cart.module.scss'
import type { FC } from 'react'
import type { ICartProduct, IProduct } from '../../types'
import { cartStore } from '../../store/cartStore'
import { toast } from 'react-toastify'

const CartItem: FC<ICartProduct> = ({id, title, price, count, image}) => {
    const {addToCart, minusItem, delItem} = cartStore()
    const removeCart = ()=>{
        delItem(id);
        toast.error("Товар удален!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
  return (
    <div className={s.cart__item}>
        <div className={s.cart__info}>
            <img src={image} alt="" className={s.cart__img} />
            <h3 className={s.cart__name}>{title}</h3>
            <p className={s.cart__price}>{+price * count} ₽</p>
        </div>
        <div className={s.cart__controls}>
            <button onClick={()=>{minusItem(id)}} className={s.cart__minus}>—</button>
            <span className={s.cart__count}>{count}</span>
            <button onClick={()=>{ addToCart({id} as IProduct)}} className={s.cart__plus}>+</button>
            <button onClick={removeCart} className={s.cart__del}>
                <img src={closeIcon} alt="" />
            </button>
        </div>
    </div>
  )
}

export default CartItem