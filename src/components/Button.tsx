import React, { FC } from "react";

import classes from "./Button.module.css";

interface ButtonProps {
  text: string;
  clickFetchMovie?: () => void;
}

const Button: FC<ButtonProps> = ({ text, clickFetchMovie }) => {
  return (
    <button className={classes[`button-click`]} onClick={clickFetchMovie}>
      {text}
    </button>
  );
};

export default Button;
