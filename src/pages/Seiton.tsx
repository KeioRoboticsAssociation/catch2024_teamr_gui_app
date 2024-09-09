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

enum ButtonID {
  UP_50 = 0,
  UP_10 = 1,
  UP_5 = 2,
  DOWN_5 = 3,
  DOWN_10 = 4,
  DOWN_50 = 5,
  YURAYURA = 6,
  GRIGRI = 7,
  PATAPATA = 8,
}

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
  width: '200px',
  height: '600px',
  // border: '3px solid #fff',

  // display: "grid",
  // gridAutoFlow: "row",
  // gridTemplateColumns: "repeat(2, auto)",
  alignItems: "end"

}));

const ControllerButton = styled(Button)(() => ({
  height: 80,
  width: 130,
  fontSize: 30,
  margin: 10,
  textTransform: 'none',
}));

const NUMBER_OF_BUTTONS = 12;
const ros = new ROSLIB.Ros({
  url: `ws://${window.location.hostname}:9090`,
});
const topic = new ROSLIB.Topic({
  ros: ros,
  name: "/joy_seiton",
  messageType: "sensor_msgs/Joy"
});

function Seiton() {

  const [buttons, setButtons] = useState(Array(NUMBER_OF_BUTTONS).fill(false));

  const [color, setColor] = useState(true);
  const [boxIndex, setBoxIndex] = useState(Array(6).fill(false));

  function setButton(index: number, value: boolean = true) {
    return () => {
      let newButtons = Array(NUMBER_OF_BUTTONS).fill(false);
      newButtons[index] = value;
      setButtons(newButtons);
      const msg = new ROSLIB.Message({
        axes: [0, 0, 0, 0, 0, 0],
        buttons: newButtons
      });
      topic.publish(msg);
    }
  }

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

        <Controller style={{ bottom: 10, right: 10 }}>
          <ControllerButton variant="outlined" onTouchStart={setButton(0)} onTouchEnd={setButton(0, false)}>
            50mm↑
          </ControllerButton>
          <ControllerButton variant="outlined" onTouchStart={setButton(1)} onTouchEnd={setButton(1, false)}>
            10mm↑
          </ControllerButton>
          <ControllerButton variant="outlined" onTouchStart={setButton(2)} onTouchEnd={setButton(2, false)}>
            5mm↑
          </ControllerButton>
          <ControllerButton variant="outlined" onTouchStart={setButton(3)} onTouchEnd={setButton(3, false)}>
            5mm↓
          </ControllerButton>
          <ControllerButton variant="outlined" onTouchStart={setButton(4)} onTouchEnd={setButton(4, false)}>
            10mm↓
          </ControllerButton>
          <ControllerButton variant="outlined" onTouchStart={setButton(5)} onTouchEnd={setButton(5, false)}>
            50mm↓
          </ControllerButton>
        </Controller>

        <Controller style={{ bottom: 10, right: 200 }}>
          <ControllerButton variant="outlined" onTouchStart={setButton(6)} onTouchEnd={setButton(6, false)}>
            ﾕﾗﾕﾗ
          </ControllerButton>
          <ControllerButton variant="outlined" onTouchStart={setButton(7)} onTouchEnd={setButton(7, false)}>
            ｸﾞﾘｸﾞﾘ
          </ControllerButton>
          <ControllerButton variant="outlined" onTouchStart={setButton(8)} onTouchEnd={setButton(8, false)}>
            ﾊﾟﾀﾊﾟﾀ
          </ControllerButton>
          <ControllerButton variant="outlined" onTouchStart={setButton(10)} onTouchEnd={setButton(10, false)}>
            SERVO
          </ControllerButton>
          <ControllerButton variant="outlined" onTouchStart={setButton(9)} onTouchEnd={setButton(9, false)}>
            ｺﾝﾍﾞｱ+
          </ControllerButton>
          <ControllerButton variant="outlined" onTouchStart={setButton(10)} onTouchEnd={setButton(10, false)}>
            ｺﾝﾍﾞｱ-
          </ControllerButton>
        </Controller>

        <RefleshButton />

      </StyledHome>
    </Root>
  );
}
export default Seiton;