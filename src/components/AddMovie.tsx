import React, { FC, FormEvent, useRef } from "react";

import classes from "./AddMovie.module.css";
import Button from "./Button";

interface AddMovieProps {}

const AddMovie: FC<AddMovieProps> = ({}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const releaseDateRef = useRef<HTMLInputElement>(null);
  const openingText = useRef<HTMLTextAreaElement>(null);

  async function addMovieHandler() {
    try {
      const response = await fetch(
        "https://react-http-aa8a2-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",
        {
          method: "POST",
          // body: JSON.stringify(movie),
          headers: {
            "Content-Type": "application/json",
            // On Firebase is not required, but other rest APIs might require this headers
          },
        },
      );

      if (!response.ok) {
        throw new Error("There is something wrong");
      }

      const data = await response.json(); // Convert JSON to JavaScript
      console.log("data: ", data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("Unexpected error", error);
      }
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("titleRef: ", titleRef.current?.value);
    console.log("releaseDateRef: ", releaseDateRef.current?.value);
    console.log("openingText: ", openingText.current?.value);

    // addMovieHandler();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.container}>
        <div className={classes[`input-section`]}>
          <label>Title</label>
          <input type="text" ref={titleRef} />
        </div>
        <div className={classes[`input-section`]}>
          <label>Release Date</label>
          <input type="text" ref={releaseDateRef} />
        </div>
        <div className={classes[`input-section`]}>
          <label>Opening Text</label>

          <textarea
            name="opening-text"
            id="opening-text"
            ref={openingText}
            cols={30}
            rows={10}
          />
        </div>
        <div className={classes[`button-section`]}>
          <Button text="Add Movie" />
        </div>
      </div>
    </form>
  );
};

export default AddMovie;
