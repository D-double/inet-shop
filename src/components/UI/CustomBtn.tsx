import type { FC } from "react";

interface ICustomBtnProps {
  text: string;
  icon?: string;
  width: number;
  mt?: string;
  className?: string;
  disabled?: boolean;
  onClick?: ()=>void;  
}

const CustomBtn: FC<ICustomBtnProps>  = ({text, icon, width, mt, className, disabled, onClick}) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`btn ${className}`} style={{width, marginTop: mt}}>
      {icon && <img src={icon} alt="" />}
      <span>{text}</span>
    </button>
  )
}

export default CustomBtn