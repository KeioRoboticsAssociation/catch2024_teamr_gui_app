/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import styled from "@emotion/styled";
import blueImg from "../assets/img/img-blue.svg";
import redImg from "../assets/img/img-red.svg";
import ROSLIB from "roslib";
import TouchButton from "../components/TouchButton";

const StyledField = styled.div(() => ({
  height: "100%",
  width: "79%",
  top: "0%",
  right: "1%",
  padding: "1%",
  position: "absolute",
  display: "grid",
  // border: "5px solid white",
  gridAutoFlow: "column",
  gridTemplateRows: "repeat(4, auto)",
  placeItems: "center",
}));

export default function Selector({ color, ros }: any) {
  const [isPressedRed, setIsPressedRed] = useState(Array(12).fill(false));
  const [isPressedBlue, setIsPressedBlue] = useState(Array(12).fill(false));
  
  const indextopic = new ROSLIB.Topic({
    ros: ros,
    name: "/index",
    messageType: "std_msgs/Int8",
  });

  if (color) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <StyledField style={{ margin: "auto", direction: "rtl" }}>
          {isPressedBlue.map((_value, index) => {
            return (
              <TouchButton
                id={index}
                isPressed={isPressedBlue}
                setIsPressed={setIsPressedBlue}
                topic={indextopic}
                data={index}
                color={"#000d9e"}
              />
            );
          })}
        </StyledField>
        <img
          src={blueImg}
          alt="blue image"
          style={{
            width: "79%",
            margin: "auto",
            top: "-21px",
            right: "1%",
            position: "absolute",
            zIndex: 0,
          }}
        />
      </div>
    );
  } else {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <StyledField style={{ margin: "auto" }}>
          {isPressedBlue.map((_value, index) => {
            return (
              <TouchButton
                id={index}
                isPressed={isPressedRed}
                setIsPressed={setIsPressedRed}
                topic={indextopic}
                data={index}
                color={"#9e0000"}
              />
            );
          })}
        </StyledField>
        <img
          src={redImg}
          alt="blue image"
          style={{
            width: "79%",
            margin: "auto",
            top: "-21px",
            right: "1%",
            position: "absolute",
            zIndex: 0,
          }}
        />
      </div>
    );
  }
}