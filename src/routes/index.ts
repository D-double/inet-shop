import { createBrowserRouter, createHashRouter } from "react-router";
import { Paths } from "./paths";
import Menu from "../pages/Menu";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import PrivateRoute from "../HOC/PrivateRoute";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import PublicRoute from "../HOC/PublicRoute";
import SingleProduct from "../pages/SingleProduct";

export const router = createBrowserRouter([
// export const router = createHashRouter([
//   { path: Paths.menu, element: <Menu/> },
  { 
    path: Paths.menu, 
    Component: PrivateRoute,
    children: [
      { index: true, Component: Menu },
    ] 
  },
  { 
    path: Paths.singleProduct, 
    Component: PrivateRoute,
    children: [
      { index: true, Component: SingleProduct },
    ] 
  },
  { 
    path: Paths.cart, 
    Component: PrivateRoute,
    children: [
      { index: true, Component: Cart },
    ] 
  },
  { 
    path: Paths.profile, 
    Component: PrivateRoute,
    children: [
      { index: true, Component: Profile },
    ] 
  },
  { 
    path: Paths.login, 
    Component: PublicRoute,
    children: [
      {index: true, Component: Login}
    ]
  },
  { 
    path: Paths.register, 
    Component: PublicRoute,
    children: [
      {index: true, Component: Register}
    ] 
  },
  { path: Paths.notFound, Component: NotFound },
]);