import React, { FC, FormEvent } from "react";

import classes from "./AddMovie.module.css";
import Button from "./Button";

interface AddMovieProps {}

const AddMovie: FC<AddMovieProps> = ({}) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.container}>
        <div className={classes[`input-section`]}>
          <label>Title</label>
          <input type="text" />
        </div>
        <div className={classes[`input-section`]}>
          <label>Release Date</label>
          <input type="text" />
        </div>
        <div className={classes[`input-section`]}>
          <label>Opening Text</label>

          <textarea name="opening-text" id="opening-text" cols={30} rows={10} />
        </div>
        <div className={classes[`button-section`]}>
          <Button text="Add Movie" />
        </div>
      </div>
    </form>
  );
};

export default AddMovie;
