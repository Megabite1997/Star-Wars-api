import React, { FC } from "react";

import classes from "./Movie.module.css";

interface MovieProps {
  id: number;
  title: string;
  openingText: string;
}

const Movie: FC<MovieProps> = ({ title, openingText, id }) => {
  return (
    <li className={classes.list}>
      <h1 className={classes.title}>
        {title} ({id})
      </h1>
      <p className={classes.paragraph}>{openingText}</p>
    </li>
  );
};

export default Movie;
