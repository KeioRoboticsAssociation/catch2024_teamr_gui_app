import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import ROSLIB from "roslib";

const BallArea = styled.div(() => ({
  height: "50px",
  width: "50px",
  display: "grid",
  position: "absolute",
  gridAutoFlow: "column",
  placeItems: "center",
  alignContent: "end",
  backgroundColor: "red",
  borderRadius: "50%",
//   transition: "top 0.1s, right 0.1s, rotate 0.1s",
}));

export default function Ball({ ros }) {
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
    <BallArea style={{ top: 700, right: 200, rotate: "deg" }}>
    </BallArea>
  );
}
