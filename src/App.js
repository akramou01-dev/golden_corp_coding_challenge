import React, { Component } from "react";
import Layout from "./containers/Layout/Layout";
import Input from "./components/Ui/Input/Input";
import classes from "./App.css";
import Pagination from "./components/Ui/Pagination/Pagination";
import Todos from "./components/Todos/Todos";
import axios from "./axios-instance";
class App extends Component {
  state = {
    todos: [],
    total_todos: null,
    current_page: 1,
    selected_todo: {
      title: "",
      id: null,
    },
    edited_todo: null,
  };
  next_page = async () => {
    await this.setState({ current_page: this.state.current_page + 1 });
    this.load_todos();
  };
  previous_page = async () => {
    await this.setState({ current_page: this.state.current_page - 1 });
    this.load_todos();
  };
  select_page = async (index) => {
    await this.setState({ current_page: index });
    this.load_todos();
  };

  select_todo = (id) => {
    const element = this.state.todos.find((el) => el.id === id);
    this.setState({
      selected_todo: {
        title: element.description,
        id: element.id,
      },
    });
  };
  componentDidMount() {
    this.load_todos();
  }

  load_todos = () => {
    axios
      .get("/todo/" + this.state.current_page)
      .then((response) => {
        return response.data;
      })
      .then((resData) => {
        this.setState({
          todos: resData.todos,
          total_todos: resData.total_todos,
        });
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  input_change_handler = (value) => {
    this.setState((prev_state) => {
      return {
        selected_todo: {
          ...prev_state.selected_todo,
          title: value,
        },
      };
    });
  };
  save_todo = (id, value) => {
    if (!value) {
      alert("entrer une valeur");
      return false;
    }
    const new_todo = { description: value };
    if (id) {
      //update
      axios
        .put("/todo/" + id, new_todo)
        .then((res) => {
          console.log(res);
          return res.data;
        })
        .then((resData) => {
          console.log(resData);
          const todo_index = this.state.todos.findIndex(
            (todo) => todo.id === id
          );
          const updated_todos = [...this.state.todos];
          updated_todos[todo_index].description = value;
          this.setState((prev_state) => {
            return {
              todos: updated_todos,
            };
          });
        })
        .catch((err) => alert(err.message));
    } else {
      // create
      axios
        .post("/todo", new_todo)
        .then((res) => {
          console.log(res);
          return res.data;
        })
        .then((resData) => {
          console.log(resData);
          this.setState((prev_state) => {
            return {
              ...prev_state,
              todos: [...prev_state.todos, resData.todo],
              total_todos: prev_state.total_todos + 1,
            };
          });
        })
        .catch((err) => alert(err.message));
    }
  };

  delete_todo = (id) => {
    axios
      .delete("/todo/" + id)
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .then((resData) => {
        console.log(resData);
        this.setState((prev_state) => {
          const updated_todo = prev_state.todos.filter(
            (todo) => todo.id !== id
          );
          return {
            ...prev_state,
            todos: updated_todo,
          };
        });
      })
      .catch((err) => console.log(err.message));
  };

  todo_done_handler = (id) => {
    const element = this.state.todos.find((todo) => todo.id === id);
    const done = { done: !element.done };
    console.log(done);
    axios
      .put("/todo/" + id, done)
      .then((res) => {
        return res.data;
      })
      .then((resData) => {
        console.log(resData);
        const todo_index = this.state.todos.findIndex((todo) => todo.id === id);
        const updated_todos = [...this.state.todos];
        updated_todos[todo_index].done = resData.todo.done;
        console.log(this.state.todos);
        this.setState({
          todos: updated_todos,
        });
      })
      .catch((err) => alert(err.message));
  };

  render() {
    return (
      <Layout>
        <div className={classes.Todos}>Todos</div>
        <Input
          label="Search..."
          value={this.state.selected_todo}
          changed={this.input_change_handler}
          save={this.save_todo}
        />
        <Pagination
          select={this.select_page}
          next={this.next_page}
          previous={this.previous_page}
          total_todos={this.state.total_todos}
          current_page={this.state.current_page}
        />
        <Todos
          delete={this.delete_todo}
          select_todo={this.select_todo}
          todos={this.state.todos}
          done={this.todo_done_handler}
        />
      </Layout>
    );
  }
}

export default App;
