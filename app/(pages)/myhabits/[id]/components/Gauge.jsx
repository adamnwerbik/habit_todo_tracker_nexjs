"use client";
import React from "react";
import { SimpleGauge } from "react-gauges";

const Gauge = (props) => {
  return (
    <SimpleGauge
      value={props.value}
      isTotal={true}
      indicatorVisible={true}
      barColor={"#72AD8D"}
      indicatorColor={"#d3d3d3"}
    />
  );
};

export default Gauge;
