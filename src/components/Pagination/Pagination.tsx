import React, { FC } from 'react'
import ReactPaginate from 'react-paginate';
import s from './Pagination.module.scss'

interface IPaginationProps {
  totalCount: number;
  сhangePage: (num: number)=>void,
  currentPage: number,
  limit: number
}

const Pagination: FC<IPaginationProps> = ({totalCount, сhangePage, currentPage, limit}) => {
  const total = Math.ceil(totalCount / limit)
  return (
<ReactPaginate
  className={s.pagination}
  activeClassName={s.active}
  breakLabel="..."
  nextLabel=">"
  onPageChange={(page)=>{сhangePage(page.selected + 1)}}
  pageRangeDisplayed={3}
  pageCount={total}
  previousLabel="<"
  forcePage={currentPage - 1}
/>
  )
}

export default Pagination