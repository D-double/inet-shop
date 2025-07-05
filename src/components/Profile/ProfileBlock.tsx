import React, { ChangeEvent, useEffect, useState } from 'react'
import s from './ProfileBlock.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IProfile } from '../../types';
import CustomInput from '../UI/CustomInput';
import { errorMess } from '../../utils/errorMess';
import CustomBtn from '../UI/CustomBtn';
import { Link, useNavigate } from 'react-router-dom';
import userStore from '../../store/userStore';
import { useCurrentUser, useProfileAvatarMutation, useProfileInfoMutation } from '../../services/user';
import { Paths } from '../../routes/paths';

 // abdulla
  // abdulla@mail.ru
  // Abdulla123
const ProfileBlock = () => {
  const { user } = userStore();
  const [image, setImage] = useState('');
  const profileInfoMutation = useProfileInfoMutation();
  const profileAvatarMutation = useProfileAvatarMutation();
  const currentUser = useCurrentUser();
  const navigate = useNavigate()
  const [error, setError] = useState('');
  const {
    register, //  метод позволяет вам регистрировать элемент ввода
    handleSubmit, // получит данные формы, если проверка формы прошла успешно
    reset, // cбросить все состояния формы
    formState: { // содержит информацию о состоянии всей формы
      errors, // Объект с ошибками поля.
      isValid // Установите значение true, если в форме нет ошибок.
    }
  } = useForm<IProfile>({ mode: 'onChange' });
  const editUser: SubmitHandler<IProfile> = async (data) => {
    try {
      const {username, password, email, avatar} = data;
      if (user) {
        await profileInfoMutation.mutateAsync({
          id: +user.id, 
          username,
          password,
          email
        })
      }
      if (avatar.length && user) {
        const file = avatar[0];
        // Создать объект FormData для отправки файла
        const formData = new FormData();
        formData.append('avatar', file); // добавляем картинку в FormData
        await profileAvatarMutation.mutateAsync({
          id: +user.id, 
          avatar: formData
        })
      }
      await currentUser.refetch();// перезапрос данных пользователя
      console.log('Изменения прошли успешно!');
      navigate(Paths.menu)
      setError('')
    } catch (error) {
      setError('')
      setError(errorMess(error))
      console.log(error);
    }
    reset()
  }
  const addAvatar = (e: ChangeEvent<HTMLInputElement>)=>{
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = ()=>{
        const str = typeof reader.result == 'string' ? reader.result : '';
        setImage(str)
      }
    }
  }
  
  return (
    <div className="enter">
      <h1 className="enter__title">Редактировать профиль</h1>
      {user && <form action="" className="enter__form" onSubmit={handleSubmit(editUser)}>
        <CustomInput
          register={
            register('email', {
              required: "Это поле обязательно для заполнения",
              minLength: {
                value: 3,
                message: 'минимум 3 символа'
              },
              value: user?.email
            })
          }
          errors={errors.email}
          label="Ваш email"
          type='email'
          holder='Email'
        />
        <CustomInput
          register={
            register('password', {
              required: "Это поле обязательно для заполнения",
              minLength: {
                value: 8,
                message: 'минимум 8 символа'
              },
            })
          }
          errors={errors.password}
          label="Ваш пароль"
          type='password'
          holder='Пароль'
        />
        <CustomInput
          register={
            register('username', {
              required: "Это поле обязательно для заполнения",
              minLength: {
                value: 3,
                message: 'минимум 3 символа'
              },
              value: user?.username
            })
          }
          errors={errors.username}
          label="Ваше имя"
          type='text'
          holder='Имя'
        />
        <CustomInput
          register={
            register('avatar', {
              onChange:addAvatar
            })
          }
          errors={errors.avatar}
          label="Изменить фото профиля"
          type='file'
          holder='фото'
        />
        {image ? 
        <img src={image} alt="" className="enter__img" /> :
        user.avatar && <img src={import.meta.env.VITE_IMG_URL + user.avatar} alt="" className="enter__img" />}
        
        <CustomBtn
          text="Редактировать"
          width={248}
          height={60}
          disabled={!isValid}
          m='auto'
        />
      </form>}
      <div className="enter__info">
        {error && <h3 className='enter__error'>{error}</h3>}
        <Link to={Paths.menu} className="enter__auth">На главную</Link>
      </div>
    </div>
  )
}

export default ProfileBlock