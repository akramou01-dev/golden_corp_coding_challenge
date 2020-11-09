import React, { Component } from "react";
import Layout from "./containers/Layout/Layout";
import Input from "./components/Ui/Input/Input";
import classes from "./App.css";
import Pagination from "./components/Ui/Pagination/Pagination";
import Todos from "./components/Todos/Todos";
class App extends Component {
  state = {
    todos: [
      { id: 1, title: "gym", done: false },
      { title: "coding", id: 2, done: false },
      { title: "sleep", id: 3, done: true },
      { title: "repeat", id: 4, done: true },
    ],
    total_todos: 18,
    current_page: 1,
  };
  next_page = () => {
    this.setState({ current_page: this.state.current_page + 1 });
  };
  previous_page = () => {
    this.setState({ current_page: this.state.current_page - 1 });
  };
  select_page = (index) => {
    this.setState({ current_page: index });
  };

  render() {
    return (
      <Layout>
        <div className={classes.Todos}>Todos</div>
        <Input
          label="Search..."
          changed={() => {
            console.log("clicked");
          }}
        />
        <Pagination
          select={this.select_page}
          next={this.next_page}
          previous={this.previous_page}
          total_todos={this.state.total_todos}
          current_page={this.state.current_page}
        />

        <Todos title="test" />
      </Layout>
    );
  }
}

export default App;
