import React, { Component } from "react";
import LineChart from "./widgets/LineGraph.js";
import NumberPanel from "./widgets/NumberPanel.js";

import ControlPanel from "./widgets/ControlPanel.js";
import MapGraph from "./widgets/MapGraph.js";
import ODMap from "./widgets/ODMap.js";

import PathAllocationMapGraph from "./widgets/PathAllocationMapGraph.js";
import FlowAllocationMapGraph from "./widgets/FlowAllocationMapGraph.js";

import AddModal from "./AddModal.js";

import _ from "lodash";

var ReactGridLayout = require("react-grid-layout");

class DashboardGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layout: [
        {
          i: "control",
          x: 0,
          y: 0,
          w: 4,
          h: 4,
          static: this.props.staticBool
        },
        { i: "a", x: 4, y: 0, w: 4, h: 4, static: false },
        { i: "b", x: 8, y: 0, w: 4, h: 4, static: false },
        { i: "c", x: 4, y: 4, w: 4, h: 4, static: false },
        { i: "d", x: 8, y: 4, w: 4, h: 4, static: false },
        { i: "e", x: 0, y: 16, w: 12, h: 12, static: true }
      ],

      shouldUpdate: false,
      editClass: "hidden",
      addingWidget: false,
      items: [
        {
          i: "c",
          title: "Path Specific Allocation",
          x: 4,
          y: 4,
          w: 8,
          h: 8,
          static: false
        },
        {
          i: "d",
          title: "Flow Specific Allocation",
          x: 4,
          y: 4,
          w: 8,
          h: 8,
          static: false
        }
      ],
      resize: false,
      appPercentages: 20,
      origin: undefined,
      destination: undefined,
      location: "la"
    };

    this.layoutChangeHandler = this.layoutChangeHandler.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.changeStatic = this.changeStatic.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addNashDistance = this.addNashDistance.bind(this);
    this.addPathAllocationWidget = this.addPathAllocationWidget.bind(this);
    this.onAppPercentageChange = this.onAppPercentageChange.bind(this);
    this.onChangeParentOrigin = this.onChangeParentOrigin.bind(this);
    this.onChangeParentDestination = this.onChangeParentDestination.bind(this);
    this.onResetParent = this.onResetParent.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
  }
  onChangeLocation(location) {
    console.log("onChangeLocation calleds");
    this.setState(() => ({
      location: location,
      origin: undefined,
      destination: undefined
    }));
  }
  onResetParent() {
    this.setState(() => ({ origin: undefined, destination: undefined }));
  }
  onAppPercentageChange(value) {
    console.log(value);
    this.setState(() => ({ appPercentages: value }));
  }
  onAddItem() {
    this.setState(prevState => {
      return { addingWidget: !prevState.addingWidget };
    });
  }

  onChangeParentOrigin(origin) {
    this.setState(prevState => {
      return { origin: origin };
    });
  }

  onChangeParentDestination(destination) {
    this.setState(prevState => {
      return { destination: destination };
    });
  }

  addPathAllocationWidget() {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: Math.floor(Math.random() * 100) + "",
        x: (this.state.items.length * 4) % (this.state.cols || 8) + 4,
        y: Infinity, // puts it at the bottom
        w: 4,
        h: 4,
        title: "Path Allocation"
      })
    });
    this.closeModal();
  }
  addNashDistance(type) {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: Math.floor(Math.random() * 100) + "",
        x: (this.state.items.length * 4) % (this.state.cols || 8) + 4,
        y: Infinity, // puts it at the bottom
        w: 4,
        h: 4,
        title: "Nash Distance"
      })
    });
    this.closeModal();
  }
  closeModal() {
    this.setState(prevState => {
      return { addingWidget: !prevState.addingWidget };
    });
  }
  changeStatic() {
    this.setState(prevState => {
      if (prevState.shouldUpdate)
        return { editClass: "hidden", shouldUpdate: !prevState.shouldUpdate };
      else {
        return { editClass: "circle", shouldUpdate: !prevState.shouldUpdate };
      }
    });
  }

  layoutChangeHandler(layout, element) {
    console.log("sini", element);
    const stringLayout = JSON.stringify(layout);
    localStorage.setItem("layout", stringLayout);
    this.setState({ layout: layout, resize: !this.state.resize });
    this.render();
    console.log("resize");
  }

  createElement(el) {
    const i = el.i;
    console.log(i);

    const paragraphStyle = {
      fontSize: "24px"
    };

    if (el.title === "Nash Distance") {
      return (
        <div className="block" key={el.i} data-grid={el}>
          <div className="top-bar">
            <p style={paragraphStyle}>Distance from Nash</p>
            <button
              className={this.state.editClass}
              onClick={this.removeElement.bind(this, el.i)}
            />
          </div>
          <LineChart
            shouldUpdate={this.state.shouldUpdate}
            resize={this.state.resize}
            appPercentages={this.state.appPercentages}
          />
        </div>
      );
    }
    if (el.title === "Path Allocation") {
      return (
        <div className="block" key={el.i} data-grid={el}>
          <div className="top-bar">
            <p>App User Vs Non-App User Paths</p>
            <button
              className={this.state.editClass}
              onClick={this.removeElement.bind(this, el.i)}
            />
          </div>
          <MapGraph
            resize={this.state.resize}
            appPercentages={this.state.appPercentages}
          />
        </div>
      );
    }
    if (el.title === "OD Map") {
      return (
        <div className="block" key={el.i} data-grid={el}>
          <div className="top-bar">
            <p>{el.title}</p>
            <button
              className={this.state.editClass}
              onClick={this.removeElement.bind(this, el.i)}
            />
          </div>
          <ODMap resize={this.state.resize} />
        </div>
      );
    }
    if (el.title === "Path Specific Allocation") {
      return (
        <div className="block" key={el.i} data-grid={el}>
          <div className="top-bar">
            <p style={paragraphStyle}>Demand distribution</p>
            <button
              className={this.state.editClass}
              onClick={this.removeElement.bind(this, el.i)}
            />
          </div>
          <PathAllocationMapGraph
            resize={this.state.resize}
            appPercentages={this.state.appPercentages}
            origin={this.state.origin}
            destination={this.state.destination}
            onChangeParentOrigin={this.onChangeParentOrigin}
            onChangeParentDestination={this.onChangeParentDestination}
            onResetParent={this.onResetParent}
            location={this.state.location}
          />
        </div>
      );
    } else if (el.title === "Flow Specific Allocation") {
      return (
        <div className="block" key={el.i} data-grid={el}>
          <div className="top-bar">
            <p style={paragraphStyle}>Overall travel demand</p>
            <button
              className={this.state.editClass}
              onClick={this.removeElement.bind(this, el.i)}
            />
          </div>
          <FlowAllocationMapGraph
            resize={this.state.resize}
            appPercentages={this.state.appPercentages}
            origin={this.state.origin}
            destination={this.state.destination}
            onChangeParentOrigin={this.onChangeParentOrigin}
            onChangeParentDestination={this.onChangeParentDestination}
            onResetParent={this.onResetParent}
            location={this.state.location}
          />
        </div>
      );
    }
  }
  componentWillReceiveProps(props) {
    this.setState(() => {
      if (props.staticBool) return { editClass: "hidden" };
      else {
        return { editClass: "circle" };
      }
    });
  }
  removeElement(i) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }
  render() {
    const paragraphStyle = {
      fontSize: "24px"
    };

    return (
      <div>
        <ReactGridLayout
          className="layout"
          layout={this.state.layout}
          cols={12}
          rowHeight={60}
          width={1200}
          onResizeStop={this.layoutChangeHandler}
          draggableCancel=".not-draggable"
        >
          <div key="control" className="block">
            <div className="top-bar">
              <p style={paragraphStyle}>Control Panel</p>
            </div>
            <button className="button" onClick={this.changeStatic}>
              Edit widgets
            </button>

            <button className="button" onClick={this.onAddItem}>
              Add widgets
            </button>
            <ControlPanel
              appPercentages={this.state.appPercentages}
              onAppPercentageChange={this.onAppPercentageChange}
              onChangeLocation={this.onChangeLocation}
            />
          </div>
          {_.map(this.state.items, el => this.createElement(el))}
        </ReactGridLayout>
        <AddModal
          addingWidget={this.state.addingWidget}
          handleModal={this.closeModal}
          addSpecficItem={this.addSpecficItem}
          ariaHideApp={false}
          addNashDistance={this.addNashDistance}
          addPathAllocationWidget={this.addPathAllocationWidget}
        />
      </div>
    );
  }
}

export default DashboardGrid;
