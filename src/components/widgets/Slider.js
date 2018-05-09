import Slider from "react-rangeslider";
import React, { Component } from "react";

class Horizontal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: this.props.appPercentages
    };
  }

  handleChangeStart = () => {
    console.log("Change event started");
  };

  handleChange = value => {
    this.setState(() => ({ value: value }));
  };

  handleChangeComplete = () => {
    this.props.onAppPercentageChange(this.state.value);
    console.log("Change event completed");
  };

  render() {
    const { value } = this.state;
    return (
      <div className="slider">
        <Slider
          min={0}
          max={99}
          value={value}
          onChangeStart={this.handleChangeStart}
          onChange={this.handleChange}
          step={1}
          onChangeComplete={this.handleChangeComplete}
        />
        <div className="value">{value}%</div>
      </div>
    );
  }
}

export default Horizontal;
