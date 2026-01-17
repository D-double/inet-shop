import type { FC } from "react";
import type { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from "react-hook-form";
import { editIcon } from "../../utils";

interface ICustomInputProps {
    register: UseFormRegisterReturn;
    errors: FieldError | Merge<FieldError, FieldErrorsImpl> | undefined
    label: string
    type: string
    holder: string
}

const CustomInput: FC<ICustomInputProps> = ({register, errors, label, type, holder}) => {
  return (
    <div className="enter__item">
      <label className={type == 'file' ? 'enter__label' : ''}>
        <span>{label}</span>
        {
          type != 'file' ? 
          <input
            {...register}
            className="enter__input"
            type={type}
            placeholder={holder}
          /> :
          <span>
            <img src={editIcon} alt="" />
            <input
            {...register}
            className="enter__file"
            type={type}
            placeholder={holder}
          />
          </span>
        }
      </label>
      <p className="enter__error">
        {errors ? <>{errors.message}</> : ""}
      </p>
    </div>
  );
};

export default CustomInput;
