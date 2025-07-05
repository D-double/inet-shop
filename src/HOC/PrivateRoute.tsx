import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useCurrentUser } from '../services/user'
import userStore from '../store/userStore'
import { Paths } from '../routes/paths'

const PrivateRoute = () => {
  const {setUser} = userStore();
  const access_token = localStorage.getItem('access_token')
  const navigate = useNavigate()
  const {data} = useCurrentUser();
  
  useEffect(() => {
    if(!access_token) {
      navigate(Paths.login)
    }
  }, [access_token])

  useEffect(()=>{
    if(data){
      setUser(data)
    }
  }, [data])
  return <Outlet/>
}

export default PrivateRoute