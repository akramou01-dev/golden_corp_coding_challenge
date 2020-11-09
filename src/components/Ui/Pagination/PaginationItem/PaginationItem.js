import React from "react";
import classes from "./PaginationItem.css";
const pagination_item = (props) => {
  const css_classe = [classes.PaginationItem];
  if (props.active) {
    css_classe.push(classes.active);
  }
  return props.index < 10 ? (
    <button
      className={css_classe.join(" ")}
      onClick={() => {
        props.clicked(props.index);
      }}
    >
      {props.index}
    </button>
  ) : props.index < 15 ? (
    "."
  ) : null;
};

export default pagination_item;
