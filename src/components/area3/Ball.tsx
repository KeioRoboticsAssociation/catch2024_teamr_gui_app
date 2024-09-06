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
  // backgroundColor: "red",
  borderRadius: "50%",
//   transition: "top 0.1s, right 0.1s, rotate 0.1s",
}));

export default function Ball({ ros }) {
  const [balls, setBalls] = useState([]);
  useEffect(() => {
    const listener = new ROSLIB.Topic({
      ros: ros,
      name: "/ball_detection",
      messageType: "ai_camera_interfaces/DetectionOnFieldArray",
    });
    listener.subscribe((message: any) => {
      // console.log(message.detections);
      setBalls([...balls.slice(-10), message.detections[0]]);
      console.log(balls)
    });
  }, [ros, balls]);

  return (
    balls.map((ball) => (
      <BallArea style={{ 
        top: (ball.position.y)/(5.875) * 820-25, 
        right: (ball.position.x+0.35-8)/(12-8) * 600-25,
        backgroundColor: ball.name === "purple_ball" ? "purple" : "red",  
      }}>
      </BallArea>
    ))
  );
}
