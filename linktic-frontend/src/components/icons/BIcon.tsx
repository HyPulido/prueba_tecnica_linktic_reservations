import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

interface BIconProps {
  icon: string;
  width?: number;
  heigth?: number;
  className?: string;
  onClick?: any;
  size?: any;
  style?: any;
}

export const BIcon: React.FC<BIconProps> = ({ icon, width, heigth, className, onClick, size, style }: BIconProps) => {
  style = { marginTop: "-10px", ...style }
  return (
    <>
      <i className={`bi bi-${icon} nav-icon ${className} fs-${size}`} style={style} onClick={onClick}></i>
    </>
  );
};
