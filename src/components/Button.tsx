import React, { FC } from "react";

import classes from "./Button.module.css";

interface ButtonProps {
  text: string;

  clickHandler?: () => Promise<void>;
}

const Button: FC<ButtonProps> = ({ text, clickHandler }) => {
  return (
    <button className={classes[`button-click`]} onClick={clickHandler}>
      {text}
    </button>
  );
};

export default Button;
