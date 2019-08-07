import React, { Component } from "react";
import Todo from "./Todo";

class Todos extends Component {
  state = {};
  render() {
    const { todos, deleteItem, updateChecked } = this.props;
    return (
      <div>
        {todos.map(todo => {
          return (
            <Todo
              key={todo.id}
              todo={todo}
              deleteItem={deleteItem}
              updateChecked={updateChecked}
            />
          );
        })}
      </div>
    );
  }
}

export default Todos;
