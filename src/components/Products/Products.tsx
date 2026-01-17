import { useGetProducts } from '../../services/products'
import { filterStore } from '../../store/filterStore'
import type { IProduct, ISelectedItem } from '../../types'
import Pagination from '../Pagination/Pagination'
import Search from '../Search/Search'
import Sort from '../Sort/Sort'
import s from './products.module.scss'
import ProductsItem from './ProductsItem'
import ProductsSkeleton from './ProductsSkeleton'

const Products = () => {
    const {sortVal, searchVal, currentPage, setCurrentPage, limit, offset, setOffset} = filterStore()
    const {data} = useGetProducts({sort: sortVal, search: searchVal, limit, offset})
    const products = data && data.results.map((elem: IProduct)=>(
                    <ProductsItem key={elem.id} {...elem}/>
                ))
    const skeleton = [...Array(6)].map((_, index)=>(<ProductsSkeleton key={index}/>))

    const changePage = (page: ISelectedItem)=>{
        setCurrentPage(page.selected)
        setOffset(page.selected * limit)
        window.scrollTo(0, 0)
    }
  return (
    <div className={s.products}>
        <div className={s.products__filter}>
            <h1 className="title">Меню</h1>
            <Sort/>
            <Search/>
        </div>
        <div className={s.products__list}>
            {
                data ? 
                products : 
                skeleton
            }
        </div>
        {
            data && <Pagination totalCount={data.count} changePage={changePage} currentPage={currentPage} limit={limit} />
        }
    </div>
  )
}

export default Products