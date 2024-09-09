import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import ROSLIB from "roslib";
import robot from "../../assets/img/robot.svg";

const EndEffector = styled.div(() => ({
  height: "40px",
  width: "90px",
  display: "grid",
  position: "absolute",
  gridAutoFlow: "column",
  placeItems: "center",
  backgroundColor: "white",
  color: "black",
  alignContent: "end",
  transition: "top 0.1s, right 0.1s, rotate 0.1s",
}));

const RobotArm = styled.div(() => ({
  height: "500px",
  width: "50px",
  display: "grid",
  position: "absolute",
  gridAutoFlow: "column",
  placeItems: "center",
  border: "3px solid white",
  alignContent: "end",
  transition: "top 0.1s, right 0.1s, rotate 0.1s",
  transformOrigin: "center bottom"
}));


export default function RobotZ({ ros }) {
  const [pose, setPose] = useState({ lift:0 });
  useEffect(() => {
    const listener = new ROSLIB.Topic({
      ros: ros,
      name: "/mainarm/target_pose",
      messageType: "catch2024_teamr_msgs/MainArm",
    });
    listener.subscribe((message: any) => {
      setPose({ lift: message.lift });
    });
  }, [ros]);
  return (
    <RobotArm style={{bottom: 280, right:100}}>
      <EndEffector style={{ bottom: pose.lift* 500 }}>
        {/* <img src={robot} alt="robot" /> */}
        {pose.lift.toFixed(2)}
      </EndEffector>
    </RobotArm>

  );
}
