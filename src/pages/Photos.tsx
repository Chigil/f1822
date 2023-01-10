import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Photos = () => {
  const dispatch = useDispatch();
  const store = useSelector(
    (store: { counter: { value: number } }) => store.counter,
  );
  return (
    <div>
      <h1>This is Other page</h1>
      <h3>Love photo</h3>
      <h2>{store.value}</h2>
      <button onClick={() => dispatch({ type: "counter/incremented" })}>
        Like
      </button>
      <button onClick={() => dispatch({ type: "counter/decremented" })}>
        Dislike
      </button>
    </div>
  );
};

export default Photos;
