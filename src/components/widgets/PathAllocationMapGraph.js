import React, { Component } from "react";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  CircleMarker
} from "react-leaflet";

class PathAllocationMapGraph extends Component {
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
      resize: false,
      markers: [],
      chosen: [],
      appPercentages: this.props.appPercentages,
      destination: this.props.destination,
      origin: this.props.origin,
      location: this.props.location
    };

    if (this.state.location === "chi") {
      this.state.settings = {
        lat: 41.8781,
        lng: -87.6298,
        zoom: 7,
        open: false
      };
    }
    this.handleClick = this.handleClick.bind(this);
    this.destinationHandleClick = this.destinationHandleClick.bind(this);

    this.addMarker = this.addMarker.bind(this);
    this.getColor = this.getColor.bind(this);
    this.resetState = this.resetState.bind(this);
  }
  getStyle(feature, layer) {
    return {
      color: "#006400",
      weight: 5,
      opacity: 0.65
    };
  }
  shouldComponentUpdate() {
    return true;
  }
  componentWillReceiveProps(newProps, prevState) {
    if (newProps.location !== this.state.location) {
      if (newProps.location === "chi") {
        fetch("http://localhost:3001/" + newProps.location + "/origins")
          .then(resp => resp.json()) // Transform the data into json
          .then(data => {
            this.setState(() => {
              console.log(data);
              return {
                markers: data,
                settings: {
                  lat: 41.8781,
                  lng: -87.6298,
                  zoom: 7,
                  open: false
                },
                key: Math.floor(Math.random() * 1000),
                location: newProps.location,
                paths: undefined
              };
            });
          });
      } else {
        fetch("http://localhost:3001/" + newProps.location + "/origins")
          .then(resp => resp.json()) // Transform the data into json
          .then(data => {
            this.setState(() => {
              console.log(data);
              return {
                markers: data,
                settings: {
                  lat: 34.151813,
                  lng: -118.129869846,
                  zoom: 11,
                  open: false
                },
                key: Math.floor(Math.random() * 1000),
                location: newProps.location,
                paths: undefined
              };
            });
          });
      }
    }
    if (newProps.resize !== this.state.resize) {
      this.setState(prevState => ({
        key: Math.floor(Math.random() * 1000),
        resize: !prevState.resize
      }));
    }
    if (this.state.paths && !newProps.origin) {
      this.setState(() => {
        return {
          destination: undefined,
          origin: undefined,
          paths: undefined
        };
      });
    }
    if (
      this.state.paths &&
      newProps.appPercentages !== this.state.appPercentages
    ) {
      fetch(
        "http://localhost:3001/" +
          this.state.location +
          "/path/" +
          +newProps.appPercentages +
          "/" +
          this.state.origin +
          "/" +
          this.state.destination
      )
        .then(resp => resp.json()) // Transform the data into json
        .then(data => {
          this.setState(() => {
            console.log(data);
            return {
              paths: data,
              keyGeo: Math.round(Math.random() * 100000),
              appPercentages: newProps.appPercentages
            };
          });
        });
    }
    if (!this.state.paths && newProps.origin !== this.state.origin) {
      fetch(
        "http://localhost:3001/" +
          this.state.location +
          "/destinations/" +
          newProps.origin
      )
        .then(resp => resp.json()) // Transform the data into json
        .then(data => {
          this.setState(() => {
            console.log(data);
            return {
              destinationMarkers: data,
              origin: newProps.origin
            };
          });
        });
    }

    if (!this.state.paths && newProps.destination !== this.state.destination) {
      fetch(
        "http://localhost:3001/" +
          this.state.location +
          "/path/" +
          +this.state.appPercentages +
          "/" +
          this.state.origin +
          "/" +
          newProps.destination
      )
        .then(resp => resp.json()) // Transform the data into json
        .then(data => {
          this.setState(() => {
            console.log(data);
            return {
              destination: newProps.destination,
              paths: data,
              keyGeo: Math.round(Math.random() * 100000)
            };
          });
        });
    }
  }

  componentDidMount() {
    fetch("http://localhost:3001/" + this.state.location + "/origins")
      .then(resp => resp.json()) // Transform the data into json
      .then(data => {
        this.setState(() => {
          console.log(data);
          return { markers: data };
        });
      });
  }
  addMarker = e => {
    const { markers } = this.state;
    console.log(e.latlng);
    markers.push([1, e.latlng]);
    this.setState({ markers });
  };

  handleClick(e) {
    console.log(e.sourceTarget.options.nodeId);
    this.props.onChangeParentOrigin(e.sourceTarget.options.nodeId);
    fetch(
      "http://localhost:3001/" +
        this.state.location +
        "/destinations/" +
        e.sourceTarget.options.nodeId
    )
      .then(resp => resp.json()) // Transform the data into json
      .then(data => {
        this.setState(() => {
          console.log(data);
          return {
            destinationMarkers: data,
            origin: e.sourceTarget.options.nodeId
          };
        });
      });
  }

  destinationHandleClick(e) {
    console.log(e.sourceTarget.options.nodeId);
    this.props.onChangeParentDestination(e.sourceTarget.options.nodeId);
    fetch(
      "http://localhost:3001/" +
        this.state.location +
        "/path/" +
        +this.state.appPercentages +
        "/" +
        this.state.origin +
        "/" +
        e.sourceTarget.options.nodeId
    )
      .then(resp => resp.json()) // Transform the data into json
      .then(data => {
        this.setState(() => {
          console.log(data);
          return {
            destination: e.sourceTarget.options.nodeId,
            paths: data,
            keyGeo: Math.round(Math.random() * 100000)
          };
        });
      });
  }

  resetState() {
    this.props.onResetParent();
  }
  render() {
    const position = [this.state.settings.lat, this.state.settings.lng];
    const stamenTonerTiles =
      "http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png";

    return (
      <Map
        className="not-draggable"
        center={position}
        zoom={this.state.settings.zoom}
        key={this.state.key}
        onClick={this.state.paths && this.resetState}
      >
        <TileLayer
          key={this.state.KeyTile}
          url="http://api.tiles.mapbox.com/v4/jht2115.lcgo8fe5/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoiamh0MjExNSIsImEiOiJwcUU0M0pVIn0.q3ouTrQNRmI7VZrvSc7BXQ"
        />
        {!this.state.origin &&
          this.state.markers.map((position, idx) => (
            <CircleMarker
              key={`marker-${idx}`}
              center={{ lat: position[1][0], lng: position[1][1] }}
              radius={1}
              color="red"
              onClick={this.handleClick}
              nodeId={position[0]}
              opacity={0.5}
            />
          ))}
        {this.state.origin &&
          !this.state.destination &&
          this.state.destinationMarkers.map((position, idx) => (
            <CircleMarker
              key={`marker2-${idx}`}
              center={{ lat: position[1][0], lng: position[1][1] }}
              radius={1}
              color="yellow"
              onClick={this.destinationHandleClick}
              nodeId={position[0]}
            />
          ))}
        {!!this.state.paths && (
          <GeoJSON
            key={this.state.keyGeo}
            data={this.state.paths}
            style={feature => ({
              color: this.getColor(feature.properties.color),
              weight: 6,
              opacity: 0.35
            })}
          />
        )}
      </Map>
    );
  }
  getColor(x) {
    var colors = ["#1EB4FA", "#f9c83f", "#40d9fc", "#23b623", "#351783"];
    return x <= 1
      ? colors[0]
      : x <= 2
        ? colors[1]
        : x <= 3 ? colors[2] : x <= 4 ? colors[3] : colors[4];
  }
}

export default PathAllocationMapGraph;
