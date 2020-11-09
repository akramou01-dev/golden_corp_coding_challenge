import React from "react";
import Aux from "../../../hoc/Auxilary/Auxilary";
import classes from "./Input.css";

const input = (props) => (
  <Aux>
    <input
      type="text"
      placeholder="Search..."
      onChange={props.changed}
      className={classes.Input}
    ></input>
  </Aux>
);

export default input;
