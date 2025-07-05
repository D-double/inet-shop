import { FC, ReactNode } from 'react'
import { images } from '../assets/image.ts'
interface AuthLayoutProps {
  children: ReactNode
}
const AuthLayout:FC<AuthLayoutProps> = ({children}) => {
return (
  <div className='wrapper'>
    <div className="wrapper__logo">
      <img src={images.logo} alt="" className="wrapper__img" />
    </div>
    <div className="wrapper__form">
      {children}
    </div>
  </div>
)
}

export default AuthLayout
