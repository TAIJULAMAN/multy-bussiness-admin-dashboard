import React from "react";
const Button = ({ style, text, icon, classNames, type, handler }) => {
  return (
    <button
      onClick={() => {
        handler && handler();
      }}
      type={type}
      style={style}
      className={classNames}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
