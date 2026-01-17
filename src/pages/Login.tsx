import { Link, useNavigate } from 'react-router'
import AuthLayout from '../layouts/AuthLayout'
import { Paths } from '../routes/paths'
import { useForm, type SubmitHandler } from "react-hook-form"
import CustomInput from '../components/UI/CustomInput'
import type { ILogin } from '../types'
import { useLoginMutation } from '../services/user'
import { useState } from 'react'
import { errorMess } from '../utils/errorMess'
import CustomBtn from '../components/UI/CustomBtn'

// abd15
// abd15@mail.ru
// Abdulla123

const Login = () => {
  const loginMutation = useLoginMutation();
  const navigate = useNavigate()
  const [errorT, setErrorT] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILogin>({mode: 'onChange'})
  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      await loginMutation.mutateAsync(data);
      console.log('Авторизация прошла успешно!');
      navigate(Paths.menu)
      setErrorT('')
    } catch (error) {
      // console.log(error);
      setErrorT(errorMess(error, 'login'))
    }
  }
  
  return (
    <AuthLayout>
      <div className='enter'>
        <h1 className="enter__title">Вход</h1>
        <form onSubmit={handleSubmit(onSubmit)} action="" className="enter__form">
          <CustomInput 
            register={register('username', {
              required: 'Это поле обязательно для заполнения',
              minLength: {
                value: 2,
                message: 'минимум 2 символа'
              }
            })}
            errors={errors.username}
            label='Ваш логин'
            type='text'
            holder='Логин'
          />           
          <CustomInput 
            register={register('password', {
              required: 'Это поле обязательно для заполнения',
              minLength: {
                value: 8,
                message: 'минимум 8 символов'
              }
            })}
            errors={errors.password}
            label='Ваш пароль'
            type='password'
            holder='Пароль'
          />
          
          <CustomBtn 
            text='Вход'
            width={248}
            className='enter__btn'
            disabled={!isValid}
          />         
        </form>
        <div className="enter__info">
          {
            errorT && <h3 className='enter__error'>{errorT}</h3>
          }
          <p className="enter__desc">Нет аккаунта?</p>
          <Link className='enter__link' to={Paths.register}>Зарегистрироваться</Link>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login