import { cartStore } from '../../store/cartStore'
import s from './cart.module.scss'
import CartItem from './CartItem'

const CartBlock = () => {
  const {cart, totalPrice} = cartStore();
  console.log(cart);
  return (
    <div className={s.cart}>
      <h1 className='title'>Корзина</h1>
      <div className={s.cart__list}>
        {
          cart && cart.map((elem)=>(
            <CartItem key={elem.id} {...elem}/>
          ))
        }
      </div>
      <div className={s.cart__total}>
        <p>Итог</p>
        <div>
          {totalPrice}
          <span>₽</span>
        </div>
      </div>
    </div>
  )
}

export default CartBlock