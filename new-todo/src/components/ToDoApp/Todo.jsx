import React, { Component } from "react";
import "../../styles/ToDoApp.css";

class Todo extends Component {
  state = {};
  render() {
    const { todo, deleteItem, updateChecked } = this.props;
    const styles = {
      color: todo.checked ? "blue" : "initial"
    };
    return (
      <div className={"table-style"}>
        <input
          type="checkbox"
          checked={todo.checked}
          onChange={() => updateChecked(todo.id)}
        />
        <span className={todo.checked ? "line_through" : ""} style={styles}>
          {todo.name}
        </span>
        <input
          type="button"
          value="Delete"
          onClick={() => deleteItem(todo.id)}
        />
      </div>
    );
  }
}

export default Todo;
