import React from "react";
import classes from "./Todo.css";
const todo = (props) => {
  return (
    <div
      className={classes.Item}
      onClick={() => {
        props.selected(props.id);
      }}
    >
      <input
        type="radio"
        checked={props.done}
        onClick={() => {
          props.done_handler(props.id);
        }}
      />
      <div className={classes.Label}>{props.title}</div>
      <button
        onClick={() => {
          props.delete(props.id);
        }}
      >
        Delete
      </button>
    </div>
  );
};
export default todo;
