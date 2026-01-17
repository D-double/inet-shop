import { useEffect, useState, type FC } from 'react';
import ReactPaginate from 'react-paginate';
import s from './pagination.module.scss'
import type { ISelectedItem } from '../../types';

interface IPaginationProps {
    totalCount: number,
    changePage: (page: ISelectedItem)=> void,
    currentPage: number,
    limit: number
}

const Pagination: FC<IPaginationProps> = ({totalCount, changePage, currentPage, limit}) => {
  const [pageRange, setPageRange] = useState(3)
  const [marginPages, setMarginPages] = useState(1)
  const totalPage = Math.ceil(totalCount / limit);
  const resizePaginate = ()=>{
    if(window.innerWidth < 500) {
      setPageRange(0);
      setMarginPages(0);
    } else {
      setPageRange(3);
      setMarginPages(1);
    }    
  }
  window.addEventListener('resize', resizePaginate)
  useEffect(resizePaginate, [currentPage])
  return (
    <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={changePage}
        pageRangeDisplayed={pageRange} // 0
        marginPagesDisplayed={marginPages} // 0
        pageCount={totalPage}
        previousLabel="<"
        className={s.pagination}
        activeLinkClassName={s.active}
        forcePage={currentPage}

      />
  )
}

export default Pagination