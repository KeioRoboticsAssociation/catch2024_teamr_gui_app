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
import Joystick from "../components/Joystick";
import PadButton from "../components/PadButton";

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
}));

function HomeTablet() {
  const ros = new ROSLIB.Ros({
    url: `ws://${window.location.hostname}:9090`,
  });

  const emgtopic = new ROSLIB.Topic({
    ros: ros,
    name: "/emergency",
    messageType: "std_msgs/Bool",
  });

  const [color, setColor] = useState(true);

  const handleSwitchChange = () => {
    setColor(!color);
  };
  return (
    <Root>
      <StyledHome>
        <Clock />
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "60%",
            top: "0%",
          }}
        >
          <ColorSwitch onChange={handleSwitchChange} />
          <State ros={ros} />
          <RefleshButton />
          <EmergencyStop topic={emgtopic} />
        </div>
        <Joystick ros={ros} />
        <PadButton />
      </StyledHome>
    </Root>
  );
}
export default HomeTablet;
