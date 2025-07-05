import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Paths } from '../routes/paths'

const PublicRoute = () => {
    const access_token = localStorage.getItem('access_token')
    const navigate = useNavigate()

    useEffect(() => {
        if (access_token) {
            navigate(Paths.menu)
        }
    }, [access_token])

    return <Outlet />
}

export default PublicRoute