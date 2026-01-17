import type { IProduct } from "../types";
import api from "./api";
import { useQuery, type UseQueryResult } from '@tanstack/react-query'

interface IParams {
    sort: string
    search: string
    limit: number, 
    offset: number
}

export const useGetProducts = ({sort, search, limit, offset}: IParams)=>{
    // console.log(sort);
    return useQuery({
        queryKey: ['products', sort, search, limit, offset],
        queryFn: ()=> api.get(`/products?ordering=${sort}&search=${search}&limit=${limit}&offset=${offset}`),
        select: (response)=> response.data
    })
}

export const useGetProductById = (id: string | undefined): UseQueryResult<IProduct>=>{    
    return useQuery({
        queryKey: ['single', id],
        queryFn: ()=> api.get(`/products/${id}`),
        select: (response)=> response.data,
        enabled: !!id
    })
}