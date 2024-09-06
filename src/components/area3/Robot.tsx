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
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [theta, setTheta] = useState(0);
  useEffect(() => {
    const listener = new ROSLIB.Topic({
      ros: ros,
      name: "/pose",
      messageType: "geometry_msgs/Pose2D",
    });
    listener.subscribe((message: any) => {
      setX(message.x);
      setY(message.y);
      setTheta(message.theta);
    });
  }, [ros]);
  return (
    <RobotArea style={{top:(y)/(5.875) * 820-50, right:(x+0.35-8)/(12-8) * 600-50, rotate:String(360-(theta*180/3.14+90))+"deg"}}>
      <img src={robot} alt="robot" />
      {x.toFixed(2)} {y.toFixed(2)} {theta.toFixed(2)}
    </RobotArea>
  );
}
