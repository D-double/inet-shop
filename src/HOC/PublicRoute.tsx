import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router";
import { Paths } from "../routes/paths";

const PublicRoute = () => {
    const accessToken = localStorage.getItem('access');
    const navigate = useNavigate()
    useEffect(()=>{
        if(accessToken){
            navigate(Paths.menu)
        }
    }, [accessToken])

  return (
    <Outlet/>
  )
}

export default PublicRoute