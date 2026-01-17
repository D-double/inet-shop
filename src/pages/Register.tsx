import { Link, useNavigate } from 'react-router'
import AuthLayout from '../layouts/AuthLayout'
import { Paths } from '../routes/paths'
import { useForm, type SubmitHandler } from "react-hook-form"
import CustomInput from '../components/UI/CustomInput'
import type { IRegister } from '../types'
import { useRegisterMutation } from '../services/user'
import { useState } from 'react'
import { errorMess } from '../utils/errorMess'
import CustomBtn from '../components/UI/CustomBtn'

// abd15
// abd15@mail.ru
// Abdulla123

const Register = () => {
  const registerMutation = useRegisterMutation();
  const navigate = useNavigate()
  const [errorT, setErrorT] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IRegister>({mode: 'onChange'})
  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    try {
      await registerMutation.mutateAsync(data);
      console.log('Регистрация прошла успешно!');
      navigate(Paths.login)
      setErrorT('')
    } catch (error) {
      setErrorT(errorMess(error))
    }
  }
  const pass = watch('password');  
  
  return (
    <AuthLayout>
      <div className='enter'>
        <h1 className="enter__title">Регистрация</h1>
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
            label='Ваше имя'
            type='text'
            holder='Имя'
          /> 
          <CustomInput 
            register={register('email', {
              required: 'Это поле обязательно для заполнения',
              minLength: {
                value: 6,
                message: 'минимум 6 символов'
              }
            })}
            errors={errors.email}
            label='Ваша почта'
            type='email'
            holder='Почта'
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
            holder='Ваш пароль'
          />
          <CustomInput 
            register={register('password2', {
              required: 'Это поле обязательно для заполнения',
              minLength: {
                value: 8,
                message: 'минимум 8 символов'
              },
              validate: (val)=> val == pass || 'Пароли не совпадают'
            })}
            errors={errors.password2}
            label='Повторите пароль'
            type='password'
            holder='Повторите пароль'
          />
          <CustomBtn 
            text='Зарегистрироваться'
            width={248}
            className='enter__btn'
            disabled={!isValid}
          />           
        </form>
        <div className="enter__info">
          {
            errorT && <h3 className='enter__error'>{errorT}</h3>
          }
          <p className="enter__desc">Есть аккаунт?</p>
          <Link className='enter__link' to={Paths.login}>Войти</Link>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Register