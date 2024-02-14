import React from "react";
import style from './Button.module.css'

const Button = (props) => {
  return (
    <div className={style.Box}>
    <div className={`${style.btn} ${style.Hover}`}>
        <span>Click</span>
      </div>
    </div>
  );
};

export default Button;
