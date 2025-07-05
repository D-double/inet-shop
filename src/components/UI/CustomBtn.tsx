import s from './CustomBtn.module.scss'
import { FC } from 'react';

interface ICustomBtnProps {
  text: string;
  icon?: string;
  width: number;
  height: number;
  mt?: string;
  disabled?: boolean;
  m?: string;
  onClick?: ()=>void;
}

const CustomBtn:FC<ICustomBtnProps> = ({text, icon, width, height, mt, disabled, m, onClick}) => {
  return (
    <button 
        onClick={onClick}
        disabled={disabled} 
        className={s.btn} 
        style={{width: width, height: height, marginTop: mt, marginLeft: m, marginRight: m}}>
      {icon && <img src={icon} alt="" />}
      <span>{text}</span>
    </button>
  )
}

export default CustomBtn