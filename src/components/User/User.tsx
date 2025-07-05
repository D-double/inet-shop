import React from 'react'
import s from './User.module.scss';
import { userPhoto, menuIcon, cartIcon, userIcon, logoutIcon } from '../../utils';
import { NavLink, useNavigate } from 'react-router-dom';
import CustomBtn from '../UI/CustomBtn';
import userStore from '../../store/userStore';
import UserSceleton from './UserSceleton';
import cartStore from '../../store/cartStore';
import { Paths } from '../../routes/paths';
const links = [
  { url: Paths.menu, name: 'Меню', icon: menuIcon },
  { url: Paths.cart, name: 'Корзина', icon: cartIcon },
  { url: Paths.profile, name: 'Профиль', icon: userIcon },
]

const User = () => {
  const { logout, user } = userStore();
  const { cart } = cartStore();
  const totalCount = cart.reduce((acc, val) => {
    return acc + val.amount
  }, 0)
  console.log(totalCount);
  const navigate = useNavigate()
  const logoutUser = () => {
    logout()
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate(Paths.login)
  }
  const userImg = user?.avatar ? import.meta.env.VITE_IMG_URL + user.avatar : userPhoto;
  return (
    <div className={s.user}>
      {
        user ? (
          <>
            <div className={s.user__info}>
              <img src={userImg} alt="" className={s.user__img} />
              <h2 className={s.user__name}>{user.username}</h2>
              <a href="" className={s.user__email}>{user.email}</a>
            </div>
            <ul className={s.user__menu}>
              {links.map((link) => (
                <li key={link.url}>
                  <NavLink to={link.url} className={s.user__link}>
                    <img src={link.icon} alt="" />
                    {link.name}
                    {totalCount && link.url == Paths.cart && <span className={s.user__count}>{totalCount}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
            <CustomBtn
              text="Выйти"
              icon={logoutIcon}
              width={117}
              height={43}
              mt='auto'
              onClick={logoutUser}
            />
          </>
        ) : <UserSceleton />}
    </div>
  )
}

export default User