import React from "react";
import classes from "./Todo.css";
const todo = (props) => {
  return (
    <li className={classes.Item}>
      <input type="radio" value="test" />
      <p>test</p>
      <button>Delete</button>
    </li>
  );
};
export default todo;
