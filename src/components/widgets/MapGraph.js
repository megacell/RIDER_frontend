import React, { Component } from "react";
import { Map, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";

class MapGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        lat: 34.151813,
        lng: -118.129869846,
        zoom: 11,
        open: false
      },
      keyMap: "123",
      KeyTile: "1234",
      keyGeo: "12345",
      resize: false
    };
  }
  getStyle(feature, layer) {
    return {
      color: "#006400",
      weight: 5,
      opacity: 0.65
    };
  }

  componentWillReceiveProps(newProps, prevState) {
    if (newProps.resize !== this.state.resize) {
      this.setState(prevState => ({
        key: Math.floor(Math.random() * 1000),
        resize: !prevState.resize
      }));
    }
  }

  componetWillMount() {}

  componentDidMount() {
    fetch("http://localhost:3001/data2.json")
      .then(resp => resp.json()) // Transform the data into json
      .then(data => {
        console.log(data);
        this.setState(() => {
          return { json: data };
        });
      });
  }
  render() {
    const position = [this.state.settings.lat, this.state.settings.lng];
    return (
      <Map
        className="not-draggable"
        center={position}
        zoom={this.state.settings.zoom}
        key={this.state.key}
      >
        <TileLayer
          key={this.state.KeyTile}
          url="http://api.tiles.mapbox.com/v4/jht2115.lcgo8fe5/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoiamh0MjExNSIsImEiOiJwcUU0M0pVIn0.q3ouTrQNRmI7VZrvSc7BXQ"
        />

        {this.state.json && (
          <GeoJSON
            key={this.state.keyGeo}
            data={this.state.json}
            style={feature => ({
              color: this.getColor(feature.properties.color),
              weight: 1,
              opacity: 0.65
            })}
          />
        )}
      </Map>
    );
  }

  getData() {}
  getColor(x) {
    var colors = ["#00FFFF", "#FFFF00", "#FFA500", "#FF4500", "#FF0000"];

    return x <= 1
      ? colors[0]
      : x <= 2
        ? colors[1]
        : x <= 3 ? colors[2] : x <= 4 ? colors[3] : colors[4];
  }
  getJson() {
    return fetch("http://localhost:3001/small_net.json")
      .then(resp => resp.json()) // Transform the data into json
      .then(data => {
        console.log(data);
        return data;
      });
  }
}

export default MapGraph;
