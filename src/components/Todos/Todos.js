import React from "react";
// import classes from "./Todos.css";
import Todo from "./Todo/Todo";

const todos = (props) => {
  const todos = props.todos.map((todo) => {
    return (
      <Todo
        delete={props.delete}
        id={todo.id}
        selected={props.select_todo}
        key={todo.id}
        title={todo.description}
        done={todo.done}
        done_handler={props.done}
      />
    );
  });
  return <div>{todos}</div>;
};

export default todos;
