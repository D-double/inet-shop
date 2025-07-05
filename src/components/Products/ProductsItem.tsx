
import { FC } from 'react';
import s from './Products.module.scss';
import { IProduct } from '../../types';
import { basketIcon, starIcon } from '../../utils';
import { Link } from 'react-router-dom';
import cartStore from '../../store/cartStore';
import { toast } from 'react-toastify';
import { Paths } from '../../routes/paths';

const ProductsItem: FC<IProduct> = (data) => {
  const { image, rating, title, description, price, id } = data;
  const { addToCart } = cartStore()
  const addToCartHandler = () => {
    addToCart(data)
    toast.success('Товар добавлен в корзину', {
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
    <div className={s.products__item}>
      <Link to={`${Paths.product}/${id}`}>
        <img src={image} alt="" className={s.products__img} />
      </Link>
      <p className={s.products__price}>{price}</p>
      <button onClick={addToCartHandler} className={s.products__btn}>
        <img src={basketIcon} alt="" />
      </button>
      <p className={s.products__rating}>
        {rating}
        <img src={starIcon} alt="" />
      </p>
      <h3 className={s.products__name}>{title}</h3>
      <p className={s.products__desc}>{description}</p>
    </div>
  )
}

export default ProductsItem