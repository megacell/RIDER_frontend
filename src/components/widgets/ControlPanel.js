import React, { Component } from "react";
import Slider from "./Slider.js";
import { RadioGroup, RadioButton } from "react-radio-buttons";

class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.props.onChangeLocation(value);
  }
  render() {
    return (
      <div>
        <div className="container not-draggable" id="outerContainer">
          <div className="container">
            <h3>Percentage Of App User</h3>
            <Slider
              appPercentages={this.props.appPercentages}
              onAppPercentageChange={this.props.onAppPercentageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ControlPanel;
