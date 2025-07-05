import { closeIcon} from '../../utils';
import s from './CartBlock.module.scss';
import { FC } from 'react';
import cartStore, { ICartProduct } from '../../store/cartStore';
import { IProduct } from '../../types';
import { toast } from 'react-toastify';

const CartItem: FC<ICartProduct> = ({id, image, price, title, amount}) => {
const { addToCart, minusItem, removeItem } = cartStore()
const remove = () => {
  removeItem(id)
  toast.success('Товар удален из корзины', {
    position: "top-right",
    autoClose: 2000, // Закрытие уведомления через 3 секунды
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
  return (
<div className={s.cart__item}>
  <div className={s.cart__info}>
    <img src={image} alt="" className={s.cart__img} />
    <h2 className={s.cart__name}>{title}</h2>
    <p className={s.cart__price}>{price} ₽</p>
  </div>
  <div className={s.cart__controls}>
    <button className={s.cart__minus} onClick={() => minusItem(id)}>-</button>
    <span className={s.cart__amount}>{amount}</span>
<button className={s.cart__plus} onClick={()=>{addToCart({id} as IProduct)}}>
  +
</button>
<button className={s.cart__del} onClick={() => remove()}>
  <img src={closeIcon} alt="" />
</button>
  </div>
</div>
  )
}

export default CartItem