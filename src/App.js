import React, { Component } from "react";
import Grid from "./components/Grid.js";
import Header from "./components/Header.js";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staticBool: true
    };
    this.changeStatic = this.changeStatic.bind(this);
  }

  changeStatic() {
    this.setState(prevState => ({
      staticBool: !prevState.staticBool
    }));
  }

  render() {
    return (
      <div className="App">
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.3/leaflet.css"
          rel="stylesheet"
        />
        <Header changeStatic={this.changeStatic} />
        <Grid staticBool={this.state.staticBool} />
      </div>
    );
  }
}

export default App;
