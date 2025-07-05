import s from './PerProduct.module.scss'
import { Link, useParams } from 'react-router-dom'
import CustomBtn from '../UI/CustomBtn'
import { cartIcon, starIcon } from '../../utils'
import { useGetProductById } from '../../services/products'
import PerProductSkeleton from './PerProductSkeleton'
import cartStore from '../../store/cartStore'
import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import { Paths } from '../../routes/paths'

const PerProduct = () => {
  const { id } = useParams();
  const { data } = useGetProductById(id)
  const { cart, addToCart } = cartStore()
  const addToCartHandler = () => {
    addToCart(data!)
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
  console.log(cart);

  return data ? (
    <div className={s.product}>
      <div className={s.product__nav}>
        <Link to={Paths.menu} className={s.product__back}>{'<'}</Link>
        <h2 className={s.product__title}>{data.title}</h2>
        <CustomBtn onClick={addToCartHandler} text="В корзину" icon={cartIcon} width={150} height={43} />
      </div>
      <div className={s.product__content}>
        <img src={data.image} alt="" className={s.product__img} />
        <div className={s.product__info}>
          <div className={s.product__card}>
            <h3>Цена</h3>
            <p>{data.price} <span>₽</span></p>
          </div>
          <div className={s.product__card}>
            <h3>Рейтинг</h3>
            <div className={s.product__rating}>
              {data.rating}
              <img src={starIcon} alt="" />
            </div>
          </div>
          <p className={s.product__desc}>{data.description}</p>
        </div>
      </div>
    </div>
  ) : <PerProductSkeleton />
}

export default PerProduct