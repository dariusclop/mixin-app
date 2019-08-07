import React, { Component } from "react";

class HelloComponent extends Component {
  state = {};
  render() {
    return (
      <div>
        Hello {this.props.name}, age: {this.props.age}
      </div>
    );
  }
}

export default HelloComponent;
