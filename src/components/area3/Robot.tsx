import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import ROSLIB from "roslib";
import robot from "../../assets/img/robot.svg";

const RobotArea = styled.div(() => ({
  height: "100px",
  width: "100px",
  display: "grid",
  position: "absolute",
  gridAutoFlow: "column",
  placeItems: "center",
  alignContent: "end",
  transition: "top 0.1s, right 0.1s, rotate 0.1s",
}));

export default function Robot({ ros }) {
  const [pose, setPose] = useState("");
  useEffect(() => {
    const listener = new ROSLIB.Topic({
      ros: ros,
      name: "/pose",
      messageType: "geometry_msgs/Pose2D",
    });
    listener.subscribe((message: any) => {
      setPose(message.data);
      console.log(message.data.toString());
    });
  }, [ros]);
  return (
    <RobotArea style={{top:0, right:0, rotate:"deg"}}>
      <img src={robot} alt="robot" />
    </RobotArea>
  );
}
