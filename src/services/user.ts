import api from './api'
import { useMutation, useQuery } from '@tanstack/react-query';
import { IRegister, ILogin, IProfileInfo, IProfileAvatar } from '../types';

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (userData: IRegister) => api.post('/auth/register', userData)
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (userData: ILogin) => api.post('/auth/login', userData),
    onSuccess: ({ data }) => {
      if (data && data.access) {
        localStorage.setItem('access_token', data.access)
        localStorage.setItem('refresh_token', data.refresh)
      }
    }
  });
};

export const useCurrentUser = () => {
  const access_token = localStorage.getItem('access_token')
  return useQuery({
    queryKey: ['current'],
    queryFn: () => api.get('/auth/users/profile'),
    enabled: !!access_token,
    select: (response) => response.data
  })
};


export const useProfileInfoMutation = () => {
  return useMutation({
    mutationFn: (userData: IProfileInfo) => {
      const {id, username, password, email} = userData;
      return api.put(`/auth/users/${id}/update`, {username, password, email})
    }
  });
};

export const useProfileAvatarMutation = () => {
  return useMutation({
    mutationFn: (userData: IProfileAvatar) => {
      const {id, avatar} = userData;
      return api.put(`/auth/users/${id}/update/avatar`, avatar)
    }
  });
};