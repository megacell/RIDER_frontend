import React, { Component } from "react";
import { Line } from "react-chartjs";
// import { getRandomInt } from './util';

class NumberPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appPercentages: this.props.appPercentages,
      data: {
        labels: [
          "0",
          "5",
          "10",
          "15",
          "20",
          "25",
          "30",
          "35",
          "40",
          "45",
          "50",
          "55",
          "60",
          "65",
          "70",
          "75",
          "80",
          "85",
          "90",
          "95",
          "100"
        ],
        datasets: [
          {
            label: "Singal",
            fillColor: "rgba(151,187,205,0)",
            strokeColor: "#E8575A",
            pointColor: "#E8575A",
            pointStrokeColor: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            fill: false,
            data: [
              143.78080216284357,
              132.72814064784723,
              122.20319836475365,
              112.11413937796434,
              102.78189538191717,
              93.811074969477744,
              85.573136153783651,
              77.756515607605564,
              70.394385587652934,
              63.317241574766058,
              56.447968992599151,
              49.913664174300315,
              43.696452497514997,
              37.721698060952669,
              31.978389629943202,
              26.32833798907658,
              20.878687982142587,
              15.540188959468079,
              10.305072966891892,
              5.1598915060155344,
              0.18014986956046086
            ]
          }
        ]
      },
      key: 100,
      shouldUpdate: this.props.shouldUpdate
    };
  }
  componentWillReceiveProps(newProps, prevState) {
    console.log("componentWillReceiveProps");
    this.setState(() => ({
      key: Math.floor(Math.random() * 1000),
      appPercentages: newProps.appPercentages
    }));
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.setState(() => ({ key: Math.floor(Math.random() * 1000) }));
  }
  render() {
    const divStyle = {
      WebkitTransition: "all", // note the capital 'W' here
      msTransition: "all" // 'ms' is the only lowercase vendor prefix
    };

    const paragraphStyle = {
      lineHeight: "120px",
      fontSize: "45px"
    };

    return (
      <div className="not-draggable" style={divStyle}>
        <p style={paragraphStyle}>
          {this.state.data.datasets[0].data[
            Math.floor(this.state.appPercentages / 5)
          ].toFixed(2)}{" "}
          mins
        </p>
      </div>
    );
  }
}

export default NumberPanel;
