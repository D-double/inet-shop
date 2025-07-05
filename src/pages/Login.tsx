import React, { useEffect, useState } from 'react'
import AuthLayout from '../layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from "react-hook-form";
import CustomInput from '../components/UI/CustomInput';
import { ILogin } from '../types';
import { useLoginMutation } from '../services/user';
import { errorMess } from '../utils/errorMess';
import CustomBtn from '../components/UI/CustomBtn';
import { Paths } from '../routes/paths';

const Login = () => {
  const [error, setError] = useState('');
  const loginMutation = useLoginMutation();
  const navigate = useNavigate()
  const {
    register, //  метод позволяет вам регистрировать элемент ввода
    handleSubmit, // получит данные формы, если проверка формы прошла успешно
    reset, // cбросить все состояния формы
    formState: { // одержит информацию о состоянии всей формы
      errors, // Объект с ошибками поля.
      isValid // Установите значение true, если в форме нет ошибок.
    }
  } = useForm<ILogin>({ mode: 'onChange' });

  // abdulla
  // abdulla@mail.ru
  // Abdulla123
  const loginUser: SubmitHandler<ILogin> = async (data) => {
    try {
      await loginMutation.mutateAsync(data);
      console.log('Авторизация прошла успешно!');
      navigate(Paths.menu)
      setError('')
    } catch (error) {
      setError('')
      setError(errorMess(error, 'login'))
      console.log(error);
    }
    reset()
  }
  return (
    <>
      <AuthLayout>
        <div className="enter">
          <h1 className="enter__title">Вход</h1>
          <form action="" className="enter__form" onSubmit={handleSubmit(loginUser)}>
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
            <CustomBtn
              text="Вход"
              width={248}
              height={60}
              disabled={!isValid}
              m='auto'
            />
          </form>
          <div className="enter__info">
            {error && <h3 className='enter__error'>{error}</h3>}
            <p className="enter__desc">Нет акканута?</p>
            <Link to={Paths.register} className="enter__auth">Зарегистрироваться</Link>
          </div>
        </div>
      </AuthLayout>
    </>
  )
}

export default Login
