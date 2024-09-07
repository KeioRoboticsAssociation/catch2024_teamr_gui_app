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


export default function Robot({ ros }) {
  const [pose, setPose] = useState({ theta: 0, r: 0, handtheta: 0 });
  useEffect(() => {
    const listener = new ROSLIB.Topic({
      ros: ros,
      name: "/mainarm_pose",
      messageType: "catch2024_teamr_msgs/MainArm",
    });
    listener.subscribe((message: any) => {
      setPose({ theta: message.theta, r: message.r, handtheta: message.handtheta });
    });
  }, [ros]);
  return (
    <RobotArm style={{bottom: 295, rotate: (-pose.theta + Math.PI / 2) * 180 / Math.PI + "deg"}}>
      <EndEffector style={{ bottom: pose.r* 500, rotate:-pose.handtheta* 180 / Math.PI+"deg"  }}>
        {/* <img src={robot} alt="robot" /> */}
        {pose.r.toFixed(2)} {pose.theta.toFixed(2)}
      </EndEffector>
    </RobotArm>

  );
}
