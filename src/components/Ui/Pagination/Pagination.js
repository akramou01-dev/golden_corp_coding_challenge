import React from "react";
import PaginationItem from "./PaginationItem/PaginationItem";
import classes from "./Pagination.css";
const pagination = (props) => {
  const pagination_items = [];
  for (let i = 1; i < Math.ceil(props.total_todos / 2) + 1; i++) {
    pagination_items.push(
      <PaginationItem
        clicked={props.select}
        active={i === props.current_page}
        index={i}
        key={i}
      />
    );
  }
  return (
    <footer className={classes.Pagination}>
      <button disabled={props.current_page === 1} onClick={props.previous}>
        Prev{" "}
      </button>
      {pagination_items}
      <button
        disabled={props.current_page === Math.ceil(props.total_todos / 2)}
        onClick={props.next}
      >
        Next
      </button>
    </footer>
  );
};

export default pagination;
