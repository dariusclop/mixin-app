import React, { Component } from "react";

class InputField extends Component {
  state = {};
  render() {
    return <input value={this.props.value} onChange={this.props.onChange} />;
  }
}

export default InputField;
