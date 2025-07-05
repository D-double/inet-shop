import React, { useEffect, useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from '../components/UI/CustomInput';
import { IRegister } from '../types';
import { useRegisterMutation } from '../services/user';
import { errorMess } from '../utils/errorMess';
import CustomBtn from '../components/UI/CustomBtn';
import { Paths } from '../routes/paths';

const Register = () => {
  const [error, setError] = useState('');
  const registerMutation = useRegisterMutation();
  const navigate = useNavigate()
  const {
    register, //  метод позволяет вам регистрировать элемент ввода
    handleSubmit, // получит данные формы, если проверка формы прошла успешно
    reset, // cбросить все состояния формы
    watch,
    formState: { // одержит информацию о состоянии всей формы
      errors, // Объект с ошибками поля.
      isValid // Установите значение true, если в форме нет ошибок.
    }
  } = useForm<IRegister>({ mode: 'onChange' });
  const password = watch('password');

  // abdulla
  // abdulla@mail.ru
  // Abdulla123
  const registerUser: SubmitHandler<IRegister> = async (data) => {
    try {
      await registerMutation.mutateAsync(data);
      console.log('Регистрация прошла успешно!');
      navigate('/login')
      setError('')
    } catch (error) {
      setError('')
      setError(errorMess(error))
      console.log(error);
    }
    reset()
  }
  return (
    <>
      <AuthLayout>
        <div className="enter">
          <h1 className="enter__title">Регистрация</h1>
          <form action="" className="enter__form" onSubmit={handleSubmit(registerUser)}>
            <CustomInput
              register={
                register('username', {
                  required: "Это поле обязательно для заполнения",
                  minLength: {
                    value: 3,
                    message: 'минимум 3 символа'
                  }
                })
              }
              errors={errors.username}
              label="Ваше имя"
              type='text'
              holder='Имя'
            />
            <CustomInput
              register={
                register('email', {
                  required: "Это поле обязательно для заполнения",
                  minLength: {
                    value: 3,
                    message: 'минимум 3 символа'
                  }
                })
              }
              errors={errors.email}
              label="Ваша почта"
              type='email'
              holder='Почта'
            />
            <CustomInput
              register={
                register('password', {
                  required: "Это поле обязательно для заполнения",
                  // validate: (value)=> value == password2 || 'Пароли не совпадают',
                  minLength: {
                    value: 8,
                    message: 'минимум 8 символа'
                  }
                })
              }
              errors={errors.password}
              label="Ваш пароль"
              type='password'
              holder='Ваш пароль'
            />
            <CustomInput
              register={
                register('password2', {
                  required: "Это поле обязательно для заполнения",
                  validate: (value) => value == password || 'Пароли не совпадают',
                  minLength: {
                    value: 8,
                    message: 'минимум 8 символа'
                  }
                })
              }
              errors={errors.password2}
              label="Повторите пароль"
              type='password'
              holder='Повторите пароль'
            />
            <CustomBtn
              text="Зарегистрироваться"
              width={248}
              height={60}
              disabled={!isValid}
              m='auto'
            />
            {/* <button disabled={!isValid} className='enter__btn'>Зарегистрироваться</button> */}
          </form>
          <div className="enter__info">
            {error && <h3 className='enter__error'>{error}</h3>}
            <p className="enter__desc">Есть акканут?</p>
            <Link to={Paths.login} className="enter__auth">Войти</Link>
          </div>
        </div>
      </AuthLayout>
    </>
  )
}

export default Register
