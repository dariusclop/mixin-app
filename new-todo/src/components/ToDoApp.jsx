import React, { Component } from "react";
import "../styles/ToDoApp.css";
import Todos from "./ToDoApp/Todos";
import axios from "axios";
import Todo from "./ToDoApp/Todo";

const instance = axios.create({
  baseURL: "http://localhost:4000"
});
class ToDoApp extends Component {
  state = {
    todos: [],
    inputValue: ""
  };
  componentDidMount() {
    instance.get("/getTodos").then(response => {
      console.log(response);
      const todos = response.data.todos;
      this.setState({ todos });
    });
  }
  addToDo = () => {
    let inputValue = this.state.inputValue;
    let newTodo = {
      id: inputValue + "_" + Math.random(),
      name: inputValue,
      checked: false
    };
    /*let newTodos = [...this.state.todos, newTodo];
    console.log(newTodos);
    this.setState({
      todos: newTodos
    });*/
    instance
      .post("/add", {
        todo: {
          name: newTodo.name,
          id: newTodo.id,
          checked: newTodo.checked
        }
      })
      .then(response => {
        console.log(response);
        let newTodos = [...this.state.todos, newTodo];
        this.setState({ todos: newTodos });
      });
  };
  deleteItem = id => {
    instance.post("/delete/" + id).then(response => {
      let updatedTodos = [...this.state.todos];
      let index = updatedTodos.findIndex(x => x.id === id);
      updatedTodos.splice(index, 1);
      this.setState({ todos: updatedTodos });
    });
  };
  updateChecked = id => {
    instance.post("/checked/" + id).then(response => {
      let updatedTodos = [...this.state.todos];
      let index = updatedTodos.findIndex(x => x.id === id);
      updatedTodos[index] = {
        ...updatedTodos[index],
        checked: !updatedTodos[index].checked
      };
      this.setState({ todos: updatedTodos });
    });
  };
  inputChangeHandler = e => {
    this.setState({ inputValue: e.target.value });
  };
  render() {
    return (
      <div>
        <div className={"app-header"}>Header</div>
        <div>
          <input
            value={this.state.inputValue}
            onChange={this.inputChangeHandler}
          />
          <button className="add-button" onClick={this.addToDo}>
            Add
          </button>
          <Todos
            todos={this.state.todos}
            deleteItem={this.deleteItem}
            updateChecked={this.updateChecked}
          />
        </div>
        <br />
      </div>
    );
  }
}

export default ToDoApp;
