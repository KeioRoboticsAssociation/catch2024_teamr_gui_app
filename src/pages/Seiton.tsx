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
import Button from '@mui/material/Button';
import { Icon, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

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

const ShootingBox = styled.div(() => ({
  position: 'absolute',
  width: '250px',
  height: '400px',
  border: '3px solid #fff',
  borderRadius: '10px',

  display: "grid",
  gridAutoFlow: "column",
  gridTemplateRows: "repeat(3, auto)",
  placeItems: "center",

}));

const Arrow = styled.div(() => ({
  position: 'absolute',
  width: '100px',
  height: '100px',
  transition: "buttom 0.1s, left 0.1s, rotate 0.1s",
}));


const Controller = styled.div(() => ({
  position: 'absolute',
  width: '700px',
  height: '500px',
  border: '3px solid #fff',

  // display: "grid",
  // gridAutoFlow: "column",
  // gridTemplateRows: "repeat(3, auto)",
  // placeItems: "center",

}));

function Seiton() {
  const ros = new ROSLIB.Ros({

    url: `ws://${window.location.hostname}:9090`,
  });

  const emgtopic = new ROSLIB.Topic({
    ros: ros,
    name: "/emergency",
    messageType: "std_msgs/Bool",
  });

  const [color, setColor] = useState(true);
  const [boxIndex, setBoxIndex] = useState(Array(6).fill(false));

  const handleSwitchChange = () => {
    setColor(!color);
  };
  return (
    <Root>
      <StyledHome>
        <div style={{ top: 40, right: 50, position: "absolute" }}>
          {/* <EmergencyStop topic={emgtopic} /> */}
          <Clock />
          <ColorSwitch onChange={handleSwitchChange} />
          <State ros={ros} />
        </div>

        <ShootingBox style={{ bottom: 80, left: 200 }}>
          {boxIndex.map((value, index) => {
            return (
              <Button style={{ height: '90%', width: '90%', fontSize: 50 }} variant={value ? 'contained' : 'outlined'}>
                {index + 1}
              </Button>
            )
          })}
        </ShootingBox>
        <Arrow style={{ bottom: 100, left: 80 }}>
          <ArrowCircleRightIcon style={{ fontSize: 100 }} />
        </Arrow>

        <Controller style={{ bottom: 80, left: 550 }}>
          <ToggleButtonGroup size="large" aria-label="Large sizes" value={[false,false,true]}>
            <ToggleButton value="left" key="left">
              5mm
            </ToggleButton>
            <ToggleButton value="center" key="center">
              10mm
            </ToggleButton>,
            <ToggleButton value="right" key="right">
              50mm
            </ToggleButton>,
          </ToggleButtonGroup>
        </Controller>

        <RefleshButton />

      </StyledHome>
    </Root>
  );
}
export default Seiton;