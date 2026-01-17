import { useState, type ChangeEvent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Paths } from "../../routes/paths";
import { errorMess } from "../../utils/errorMess";
import CustomInput from "../UI/CustomInput";
import CustomBtn from "../UI/CustomBtn";
import type { IProfile } from "../../types";
import { userStore } from "../../store/userStore";
import { userPhoto } from "../../utils";
import { useCurrentUser, useProfileAvatarMutation, useProfileMutation } from "../../services/user";

const ProfileBlock = () => {
  const profileMutation = useProfileMutation();
  const profileAvatarMutation = useProfileAvatarMutation();
  const currentUser = useCurrentUser();
const {user} = userStore();
const navigate = useNavigate()
const [errorT, setErrorT] = useState('')
const [image, setImage] = useState('')
const changePhoto = (event: ChangeEvent<HTMLInputElement>)=>{
    // console.log(event);
    if(event.target.files){
        const reader = new FileReader;
        reader.readAsDataURL(event.target.files[0])
        reader.onload = ()=>{
            const str = typeof reader.result == 'string' ? reader.result : ''
            setImage(str)
        }

    }
}

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IProfile>({mode: 'onChange'})
  const onSubmit: SubmitHandler<IProfile> = async (data) => {
    // console.log(data);
    try {
      const {username, email, password, avatar} = data;
      if(user && user.id) {
        await profileMutation.mutateAsync({
          id: user.id,
          username,
          email,
          password
        });
        if (avatar.length) {
          const formData = new FormData();
          formData.append('avatar', avatar[0])
          await profileAvatarMutation.mutateAsync({
            id: user.id,
            avatar: formData
          })
        }       
        currentUser.refetch()
      }
      // console.log('Изменения прошли успешно!');
      navigate(Paths.menu)
      setErrorT('')
    } catch (error) {
      setErrorT(errorMess(error))
    }
  } 
  
  return (
   
      <div className='enter'>
        <h1 className="enter__title">Редактировать профиль</h1>
        {
            user ? 
            <form onSubmit={handleSubmit(onSubmit)} action="" className="enter__form">
            <CustomInput 
                register={register('username', {
                required: 'Это поле обязательно для заполнения',
                minLength: {
                    value: 2,
                    message: 'минимум 2 символа'
                },
                value: user.username
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
                },
                value: user.email
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
                register={register('avatar', {
                    onChange: changePhoto
                })}
                errors={errors.avatar}
                label='Изменить фото профиля'
                type='file'
                holder='Ваше фото'
            />
            {
                image ?
                <img src={image} alt="" className="enter__img"/> :
                user.avatar ?
                <img src={import.meta.env.VITE_IMG_URL + user.avatar} alt="" className="enter__img" />
                : 
                <img src={userPhoto} alt="" className="enter__img"/>
            }

            <CustomBtn 
                text='Редактировать'
                width={248}
                className='enter__btn'
                disabled={!isValid}
            />           
            </form>
            : <h2>Loading...</h2>

        }
        <div className="enter__info">
          {
            errorT && <h3 className='enter__error'>{errorT}</h3>
          }
          <p className="enter__desc">Перейти</p>
          <Link className='enter__link' to={Paths.menu}>На главную</Link>
        </div>
      </div>
    
  )
}

export default ProfileBlock