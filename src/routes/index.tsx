import PrivateRoute from "../HOC/PrivateRoute";
import PublicRoute from "../HOC/PublicRoute";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Menu from "../pages/Menu";
import MenuProduct from "../pages/MenuProduct";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import { Paths } from "./paths";
import { createBrowserRouter, createHashRouter } from "react-router-dom";

export const router = createHashRouter([
    {
        path: Paths.menu,
        element: <PrivateRoute/>,
        children: [
            {
                index: true,
                element: <Menu/>
            }
        ]
    },
    {
        path: Paths.menuProduct,
        element: <PrivateRoute/>,
        children: [
            {
                index: true,
                element: <MenuProduct/>
            }
        ]
    },
    {
        path: Paths.cart,
        element: <PrivateRoute/>,
        children: [
            {
                index: true,
                element: <Cart/>
            }
        ]        
    },
    {
        path: Paths.profile,
        element: <PrivateRoute/>,
        children: [
            {
                index: true,
                element: <Profile/>
            }
        ]        
    },
    {
        path: Paths.login,
        element: <PublicRoute/>,
        children: [
            {
                index: true,
                element: <Login/>
            }
        ]
    },
    {
        path: Paths.register,
        element: <PublicRoute/>,
        children: [
            {
                index: true,
                element: <Register/>,
            }
        ]
    },
])