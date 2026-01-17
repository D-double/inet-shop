import { Link, useParams } from "react-router";
import s from "./per-product.module.scss";
import { Paths } from "../../routes/paths";
import CustomBtn from "../UI/CustomBtn";
import { nonameIcon, starIcon } from "../../utils";
import { useGetProductById } from "../../services/products";
import PerProductSkeleton from "./PerProductSkeleton";
import { cartStore } from "../../store/cartStore";
import { toast } from "react-toastify";

const PerProduct = () => {
  const { id } = useParams();
  const { data } = useGetProductById(id);
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
//   console.log(cart);
  return data ? (
    <div className={s.single}>
      <nav className={s.single__nav}>
        <Link to={Paths.menu} className={s.single__link}>
          {"<"}
        </Link>
        <h1 className="title">{data.title}</h1>
        <CustomBtn
          onClick={addHandler}
          text="В корзину"
          width={143}
          icon={nonameIcon}
          className={s.single__cart}
        />
      </nav>
      <div className={s.single__content}>
        <img src={data.image} alt="" className={s.single__img} />
        <div>
          <div className={s.single__card}>
            <h3>Цена</h3>
            <p>
              {data.price} <span>₽</span>
            </p>
          </div>
          <div className={s.single__card}>
            <h3>Рейтинг</h3>
            <div className={s.single__rating}>
              {data.rating}
              <img src={starIcon} alt="" />
            </div>
          </div>
          <p className={s.single__desc}>{data.description}</p>
        </div>
      </div>
    </div>
  ) : (
    <PerProductSkeleton />
  );
};

export default PerProduct;
