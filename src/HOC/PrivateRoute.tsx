import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router";
import { Paths } from "../routes/paths";
import { useCurrentUser } from "../services/user";
import { userStore } from "../store/userStore";

const PrivateRoute = () => {
    const { setUser } = userStore();
    const accessToken = localStorage.getItem('access');
    const navigate = useNavigate()
    useEffect(()=>{
        if(!accessToken){
            navigate(Paths.login)
        }
    }, [accessToken])

    const {data} = useCurrentUser()
    useEffect(()=>{
        setUser(data)
    }, [data])
  return (
    <Outlet/>
  )
}

export default PrivateRoute