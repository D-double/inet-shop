import { NavLink } from 'react-router'
import { Paths } from '../../routes/paths'
import { cartIcon, logoutIcon, menuIcon, userIcon, userPhoto } from '../../utils'
import s from './user.module.scss'
import CustomBtn from '../UI/CustomBtn'
import { userStore } from '../../store/userStore'
import UserSkeleton from './UserSkeleton'
import { cartStore } from '../../store/cartStore'

const menu = [
    {url: Paths.menu, name: 'Меню', icon: menuIcon},
    {url: Paths.cart, name: 'Корзина', icon: cartIcon},
    {url: Paths.profile, name: 'Профиль', icon: userIcon},
]

const User = () => {
    const {logout, user} = userStore()
    const {cart} = cartStore()
    const totalCount = cart.reduce((acc, elem)=>{
        return acc + elem.count
    }, 0)
    const logoutUser = ()=>{
        logout()
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
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
                        <p className={s.user__email}>{user.email}</p>
                    </div>
                    <ul className={s.user__menu}>
                        {
                            menu.map((elem)=>(
                                <li key={elem.url}>
                                    <NavLink className={s.user__link} to={elem.url}>
                                        <img src={elem.icon} alt="" />
                                        <span className={s.user__text}>
                                            {elem.name}
                                        </span>
                                        {
                                            elem.url == Paths.cart && totalCount ? 
                                            <span className={s.user__count}>{totalCount}</span> : ''
                                        }
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </>
            ) : 
            <UserSkeleton/>
        }
        <CustomBtn
            text='Выйти'
            icon={logoutIcon}
            width={117}
            mt='auto'
            onClick={logoutUser}
            className={s.user__btn}
        />
    </div>
  )
}

export default User