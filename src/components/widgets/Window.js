import React, { Component } from "react";

class Window extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="block" key={this.props.el.i} data-grid={this.props.el}>
        <div className="top-bar">
          <p>{this.props.el.title}</p>
          <button
            className={this.props.editClass}
            onClick={this.props.removeElement.bind(this, el.i)}
          />
        </div>
        <LineChart
          shouldUpdate={this.props.shouldUpdate}
          onClick={this.props.removeElement.bind(this, el.i)}
          resize={this.props.resize}
        />
      </div>
    );
  }
}

export default Window;
