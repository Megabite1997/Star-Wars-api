import React, { FC } from "react";
import Movie from "./Movie";

import classes from "./MovieList.module.css";

interface MovieListProps {
  movies: { id: number; title: string; openingText: string }[];
}

const MovieList: FC<MovieListProps> = ({ movies }) => {
  return (
    <ul className={classes[`unorder-list`]}>
      {movies.map((movie) => (
        <Movie
          title={movie.title}
          openingText={movie.openingText}
          id={movie.id}
          key={movie.id}
        />
      ))}
    </ul>
  );
};

export default MovieList;
