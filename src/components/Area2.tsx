/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import styled from "@emotion/styled";
import blueImg from "../assets/img/img-blue.svg";
import redImg from "../assets/img/img-red.svg";
import ROSLIB from "roslib";

import TouchButton from "./TouchButton";
const StyledField = styled.div(() => ({
  height: "52%",
  width: "79%",
  top: "28%",
  right: "1%",
  padding: "1%",
  position: "absolute",
  display: "grid",
  border: "5px solid white",
  gridAutoFlow: "column",
  gridTemplateRows: "repeat(2, auto)",
  placeItems: "center",
}));

export default function Area2({ color, ros }: any) {
  const [isPressedRed, setIsPressedRed] = useState([false, false, false, false, false, false, false, false, false, false, false, false]);
  const [isPressedBlue, setIsPressedBlue] = useState([false, false, false, false, false, false, false, false, false, false, false, false]);
  
  const indextopic = new ROSLIB.Topic({
    ros: ros,
    name: "/index",
    messageType: "std_msgs/Int32",
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
        <StyledField style={{ margin: "auto" }}>
          {isPressedBlue.map((_value, index) => {
            return (
              <TouchButton
                id={index}
                isPressed={isPressedBlue}
                setIsPressed={setIsPressedBlue}
                topic={indextopic}
                data={200 + index}
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
        <StyledField style={{ margin: "auto", direction: "rtl" }}>
          {isPressedBlue.map((_value, index) => {
            return (
              <TouchButton
                id={index}
                isPressed={isPressedRed}
                setIsPressed={setIsPressedRed}
                topic={indextopic}
                data={200 + index}
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
