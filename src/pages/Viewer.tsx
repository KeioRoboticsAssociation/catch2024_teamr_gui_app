import { useState } from "react";
import styled from "@emotion/styled";
import ROSLIB from "roslib";
import { Root } from "../style";
import Paper from "@mui/material/Paper";
import EmergencyStop from "../components/EmergencyStop";
import Clock from "../components/Clock";
import State from "../components/State";
import ColorSwitch from "../components/ColorSwitch";
import RefleshButton from "../components/RefleshButton";
import Robot from "../components/Robot";
import Field from "../components/Field";
import RobotZ from "../components/RobotZ";

const StyledHome = styled(Paper)(() => ({
  // padding: theme.spacing(8),
  color: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  transition: "transform 0.2s ease-in-out",
  backgroundColor: "rgba(255,255, 255, 0.1)",
  width: "95%",
  height: "95vh",
  position: "absolute",
  borderRadius: "40px",
  overflow: "hidden",
}));
const ros = new ROSLIB.Ros({
  url: `ws://${window.location.hostname}:9090`,
});

const emgtopic = new ROSLIB.Topic({
  ros: ros,
  name: "/emergency",
  messageType: "std_msgs/Bool",
});


function Viewer() {

  const [color, setColor] = useState(true);

  const handleSwitchChange = () => {
    setColor(!color);
  };
  return (
    <Root>
      <StyledHome>
        <div style={{ top: 40, left: 50, position: "absolute" }}>
          <Clock />
          <ColorSwitch onChange={handleSwitchChange} />
          {/* <EmergencyStop topic={emgtopic} /> */}
        </div>

        <div style={{ bottom: 50, left: 50, position: "absolute" }}>
          <State ros={ros} />
          <RefleshButton />
        </div>
        
        {/* <Area3 ros={ros}/> */}

        <Field color={color} />
        <Robot ros={ros} />
        <RobotZ ros={ros} />
        {/* <Storage ros={ros}/> */}
        {/* <Area2 color={!color} ros={ros} /> */}
      </StyledHome>
    </Root>
  );
}
export default Viewer;
