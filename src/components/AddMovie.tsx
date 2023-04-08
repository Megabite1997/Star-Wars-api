import React, { FC, FormEvent, useRef } from "react";

import classes from "./AddMovie.module.css";
import Button from "./Button";

interface moveObject {
  title: string | undefined;
  openingText: string | undefined;
  releaseDate: string | undefined;
}

const AddMovie: FC = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const openingText = useRef<HTMLTextAreaElement>(null);
  const releaseDateRef = useRef<HTMLInputElement>(null);

  async function addMovieHandler(movie: moveObject) {
    try {
      const response = await fetch(
        "https://react-http-aa8a2-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
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
      titleRef.current!.value = "";
      openingText.current!.value = "";
      releaseDateRef.current!.value = "";
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

    const movie = {
      title: titleRef.current?.value,
      openingText: openingText.current?.value,
      releaseDate: releaseDateRef.current?.value,
    };

    addMovieHandler(movie);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.container}>
        <div className={classes[`input-section`]}>
          <label>Title</label>
          <input type="text" ref={titleRef} />
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
        <div className={classes[`input-section`]}>
          <label>Release Date</label>
          <input type="text" ref={releaseDateRef} />
        </div>
        <div className={classes[`button-section`]}>
          <Button text="Add Movie" />
        </div>
      </div>
    </form>
  );
};

export default AddMovie;
