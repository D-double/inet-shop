import Search from '../Search/Search';
import Sort from '../Sort/Sort';
import s from './Products.module.scss';
import ProductsItem from './ProductsItem';
import { useGetProducts } from '../../services/products';
import { IProduct } from '../../types';
import ProductsSkeleton from './ProductsSkeleton';
import filterStore from '../../store/filterStore';
import Pagination from '../Pagination/Pagination';

const Products = () => {
  const { sortValue, searchValue, currentPage, setCurrentPage, limit, skip, setSkip } = filterStore()
  const { data } = useGetProducts({ sort: sortValue, search: searchValue, offset: skip, limit: limit });
  // console.log(data);

  const products = data?.results.map((elem: IProduct) => (<ProductsItem key={elem.id} {...elem} />))
  // const skeletons = [... new Array(6)].map((_, i) => <ProductsSkeleton key={i} />)
  const skeletons = [...Array(6)].map((_, i) => <ProductsSkeleton key={i} />)
  // console.log(skeletons);
const сhangePage = (num: number) => {
  setCurrentPage(num)
  setSkip(num * limit - limit)
  window.scrollTo(0,0)
}

  return (
    <div className={s.products}>
      <div className={s.products__filter}>
        <h1 className={s.products__title}>Меню</h1>
        <Sort />
        <Search />
      </div>
  <div className={s.products__list}>
    {data ? products : skeletons}
  </div>
  {data && <Pagination totalCount={data.count} сhangePage={сhangePage} currentPage={currentPage} limit={limit} />}
</div>
  )
}

export default Products