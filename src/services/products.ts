import api from './api'
import { IProduct } from '../types';
import { useQuery, UseQueryResult } from '@tanstack/react-query'; 

interface IParams {
  sort: string,
  search: string,
  offset: number,
  limit: number
}

export const useGetProducts = ({sort, search, offset, limit}: IParams) => {
return useQuery({
  queryKey: ['products', sort, search, offset, limit], 
  queryFn: () => api.get(`/products?ordering=${sort}&search=${search}&offset=${offset}&limit=${limit}`), 
  select: (response) => response.data
}) 
}


export const useGetProductById = (id: string | undefined): UseQueryResult<IProduct> => {
  return useQuery({
    queryKey: ['product', id], 
    queryFn: () => api.get(`/products/${id}`), 
    select: (response) => response.data
  })
}