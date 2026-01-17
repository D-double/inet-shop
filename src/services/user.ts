import type { ILogin, IRegister } from "../types";
import api from "./api";
import {
  useQuery,
  useMutation,  
} from '@tanstack/react-query'

export const useRegisterMutation = ()=>{
    return useMutation({
        mutationFn: (userData: IRegister)=> api.post('/auth/register', userData)
    })
}

export const useLoginMutation = ()=>{
    return useMutation({
        mutationFn: (userData: ILogin)=> api.post('/auth/login', userData),
        onSuccess: ( {data} )=>{
            if (data && data.access) {
                localStorage.setItem('access', data.access)
                localStorage.setItem('refresh', data.refresh)
            }           
        }
    })
}

export const useCurrentUser = ()=>{
    const accessToken = localStorage.getItem('access');
    return useQuery({
        queryKey: ['current'],
        queryFn: ()=> api.get('/auth/users/profile'),
        enabled: !!accessToken,
        select: (response)=> response.data
    })
}

interface IProfileInfo {
    id: number,
    username: string,
    email: string,
    password: string
}

interface IProfileAvatar {
    id: number,
    avatar: FormData
}

export const useProfileMutation = ()=>{
    return useMutation({
        mutationFn: (userData: IProfileInfo)=> {
            const {id, username, email, password} = userData
            return api.put(`/auth/users/${id}/update`, {username, email, password})
        }        
    })
}

export const useProfileAvatarMutation = ()=>{
    return useMutation({
        mutationFn: (userData: IProfileAvatar)=> {
            const {id, avatar} = userData
            return api.put(`/auth/users/${id}/update/avatar`, avatar)
        }        
    })
}