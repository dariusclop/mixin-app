import React, { Component } from "react";
import "./App.css";
import HelloComponent from "./components/HelloComponents";
import InputField from "./components/InputField";
import ToDoApp from "./components/ToDoApp";

class App extends Component {
  state = {
    counter: 0,
    age: 10,
    value: "initial value"
  };
  clickHandler = () => {
    let newCounter = this.state.counter + 1;
    let newAge = this.state.age + 5;
    this.setState({ counter: newCounter, age: newAge });
  };
  inputChangeHandle = e => {
    console.log(e.target.value);
    this.setState({
      value: e.target.value
    });
  };
  render() {
    return (
      <div>
        {/* counter: {this.state.counter}
        <br />
        <button onClick={this.clickHandler}>Increment Counter</button>
        <HelloComponent name="Bob" age={this.state.age} />
        <InputField
          value={this.state.value}
          onChange={this.inputChangeHandle}
        />
        <hr />
        <br />
        <br />
        <br /> */}
        <ToDoApp />
      </div>
    );
  }
}

export default App;
