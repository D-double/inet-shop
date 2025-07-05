import { FC } from 'react'
import { UseFormRegisterReturn, FieldError, Merge, FieldErrorsImpl } from 'react-hook-form'
import { avatarImg } from '../../utils'

interface CustomInputProps {
  register: UseFormRegisterReturn,
  errors: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
  label: string
  type: string
  holder: string
}

const CustomInput: FC<CustomInputProps> = ({ register, errors, label, type, holder }) => {
  return (
    <div className="enter__item">
      <label>
        <span className="enter__text">{label}</span>
        {
          type != 'file' ?
          <input
          {...register}
          type={type} className="enter__input" placeholder={holder}
          /> :
          <span>
            <img src={avatarImg} alt="" />
            <input
            {...register}
            type={type} className="enter__file" placeholder={holder}
            /> 
          </span>
          
        }
      </label>
      <p className="enter__error">{errors && <>{errors.message}</>}</p>
    </div>
  )
}

export default CustomInput