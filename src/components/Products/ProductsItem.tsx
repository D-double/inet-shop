import type { FC } from 'react'
import { nonameIcon, starIcon } from '../../utils'
import s from './products.module.scss'
import type { IProduct } from '../../types'
import { Link } from 'react-router'
import { cartStore } from "../../store/cartStore";
import { toast } from "react-toastify";

const ProductsItem: FC<IProduct> = (data) => {
  const {id, image, price, rating, title, description} = data
  const { addToCart } = cartStore();
  const addHandler = () => {
    if (data) {
      addToCart(data);
      toast.success("Товар добавлен в корзину!", {
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
  };
  return (
    <div className={s.products__item}>
        <Link to={'/product/'+id}>
          <img src={image} alt="" className={s.products__img} />
        </Link>
        <p className={s.products__price}>{price} <span>₽</span></p>
        <button className={s.products__btn} onClick={addHandler}>
            <img src={nonameIcon} alt="" />
        </button>
        <div className={s.products__wrapper}>
            <p className={s.products__rating}>
                {rating}
                <img src={starIcon} alt="" />
            </p>
            <h3 className={s.products__name + ' text-limit'}>{title}</h3>
            <p className={s.products__desc + ' text-limit'}>{description}</p>
        </div>
    </div>
  )
}

export default ProductsItem