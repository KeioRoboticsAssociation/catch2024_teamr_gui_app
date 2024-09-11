import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ROSLIB from 'roslib';
import { Root } from '../style';
import Paper from '@mui/material/Paper';
import Clock from '../components/Clock';
import State from '../components/State';
import ColorSwitch from '../components/ColorSwitch';
import RefleshButton from '../components/RefleshButton';
import Button from '@mui/material/Button';

import SeitonBox from '../components/SeitonBox';
import { Style } from '@mui/icons-material';

enum ButtonID {
  UP_5 = 0,
  UP_10 = 1,
  UP_50 = 2,
  DOWN_50 = 3,
  DOWN_10 = 4,
  DOWN_5 = 5,
  YURAYURA = 6,
  GURIGURI = 7,
  PATAPATA = 8,
  SERVO_UP = 9,
  SERVO_DOWN = 10,
  FORWARD = 11,
  REVERSE = 12,
  DEFAULT = 13,
  STOP = 14
}

const StyledHome = styled(Paper)(() => ({
  // padding: theme.spacing(8),
  color: '#FFFFFF',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  // transition: "transform 0.2s ease-in-out",
  // backgroundColor: "rgba(255,255, 255, 0.1)",
  width: '95%',
  height: '95vh',
  position: 'absolute',
  borderRadius: '40px',
}));

const ShootingBox = styled.div(() => ({
  position: 'absolute',
  width: '800px',
  height: '700px',
  border: '3px solid #fff',
  borderRadius: '10px',

  display: 'grid',
  gridAutoFlow: 'row',
  gridTemplateColumns: '1fr 1fr',
  placeItems: 'center',
}));

const Arrow = styled.div(() => ({
  position: 'absolute',
  width: '100px',
  height: '100px',
  transition: 'buttom 0.1s, left 0.1s, rotate 0.1s',
}));

const Controller = styled.div(() => ({
  position: 'absolute',
  width: '150px',
  height: '700px',
  // border: '3px solid #fff',

  // display: "grid",
  // gridAutoFlow: "row",
  // gridTemplateColumns: "repeat(2, auto)",
  alignItems: 'end',
}));

const ControllerButton = styled(Button)(() => ({
  height: 80,
  width: 110,
  fontSize: 20,
  margin: 5,
  textTransform: 'none',
}));

const NUMBER_OF_BUTTONS = 18;
const ros = new ROSLIB.Ros({
  url: `ws://${window.location.hostname}:9090`,
});
const joyTopic = new ROSLIB.Topic({
  ros: ros,
  name: '/seiton/joy',
  messageType: 'sensor_msgs/Joy',
});

const indexTopic = new ROSLIB.Topic({
  ros: ros,
  name: '/seiton/index',
  messageType: 'std_msgs/Int8',
});

type BoxStatusType = {
  ebishio: number;
  yuzushio: number;
  norishio: number;
};
type BoxStatusMultiArrayType = {
  data: BoxStatusType[];
};
const boxStatusTopic = new ROSLIB.Topic<BoxStatusMultiArrayType>({
  ros: ros,
  name: '/seiton/box_status',
  messageType: 'catch2024_teamr_msgs/BoxStatusMultiArray',
});
const seitonRecommendTopic = new ROSLIB.Topic<{ data: number[] }>({
  ros: ros,
  name: '/seiton/recommendation',
  messageType: 'std_msgs/Int8MultiArray',
});

type SeitonGUIType = {
  box_id: number;
  color: 'ebishio' | 'yuzushio' | 'norishio';
  plusminus: boolean;
};
const seitonGuiTopic = new ROSLIB.Topic<SeitonGUIType>({
  ros: ros,
  name: '/seiton/gui',
  messageType: 'catch2024_teamr_msgs/SeitonGUI',
});

function Seiton() {
  const [buttons, setButtons] = useState(Array(NUMBER_OF_BUTTONS).fill(false));

  const [color, setColor] = useState(true);
  const [boxStatus, setBoxStatus] = useState<BoxStatusType[]>(
    Array(6).fill({ ebishio: 0, yuzushio: 0, norishio: 0 }),
  );
  const [recommend, setRecommend] = useState<number[]>([0, 0, 0]);

  useEffect(() => {
    boxStatusTopic.subscribe((message) => {
      setBoxStatus(message.data);
    });
    seitonRecommendTopic.subscribe((message) => {
      setRecommend(message.data);
    });

    return () => {
      boxStatusTopic.unsubscribe();
      seitonRecommendTopic.unsubscribe();
    };
  }, []);

  function setButton(index: number, value = true) {
    return () => {
      const newButtons = Array(NUMBER_OF_BUTTONS).fill(false);
      newButtons[index] = value;
      setButtons(newButtons);
      const msg = new ROSLIB.Message({
        axes: [0, 0, 0, 0, 0, 0],
        buttons: newButtons,
      });
      joyTopic.publish(msg);
    };
  }

  const handleSwitchChange = () => {
    setColor(!color);
  };
  return (
    <Root>
      <StyledHome>
        <div style={{ top: 40, left: 50, position: 'absolute' }}>
          {/* <EmergencyStop topic={emgtopic} /> */}
          <Clock />
          <ColorSwitch onChange={handleSwitchChange} />
          <State ros={ros} />
        </div>

        <ShootingBox style={{ bottom: 80, left: 160 }}>
          {Array.from({ length: 6 }).map((_, index) => {
            return (
              <SeitonBox
                key={Symbol(index).toString()}
                id={index}
                setoshios={boxStatus[index]}
                sendCount={(box_id, color, plusminus) => {
                  seitonGuiTopic.publish({ box_id, color, plusminus });
                }}
                onClick={(id: number) => {
                  const msg = new ROSLIB.Message({
                    data: id,
                  });
                  indexTopic.publish(msg);
                }}
                color={color}
                isRecommend={recommend.map((r) => r === index)}
              />
            );
          })}
        </ShootingBox>
        {/* <Arrow style={{ bottom: 100, left: 80 }}>
          <ArrowCircleRightIcon style={{ fontSize: 100 }} />
        </Arrow> */}

        <Controller style={{ bottom: 100, right: 10 }}>
          <ControllerButton
            variant="outlined"
            onClick={setButton(ButtonID.YURAYURA)}
          // onTouchEnd={setButton(ButtonID.YURAYURA, false)}
          >
            ﾕﾗﾕﾗ
          </ControllerButton>

          <ControllerButton
            variant="outlined"
            onClick={setButton(ButtonID.UP_50)}
            // onMouseUp={setButton(ButtonID.UP_50, false)}
            color='warning'
          >
            50mm↑
          </ControllerButton>
          <ControllerButton
            variant="outlined"
            onClick={setButton(ButtonID.UP_10)}
            // onMouseUp={setButton(ButtonID.UP_10, false)}
            color='warning'
          >
            10mm↑
          </ControllerButton>
          <ControllerButton
            variant="outlined"
            onClick={setButton(ButtonID.UP_5)}
            // onMouseUp={setButton(ButtonID.UP_5, false)}
            color='warning'
          >
            5mm↑
          </ControllerButton>
          <ControllerButton
            variant="outlined"
            onClick={setButton(ButtonID.DOWN_5)}
            // onMouseUp={setButton(ButtonID.DOWN_5, false)}
            color='warning'
          >
            5mm↓
          </ControllerButton>
          <ControllerButton
            variant="outlined"
            onClick={setButton(ButtonID.DOWN_10)}
            // onMouseUp={setButton(ButtonID.DOWN_10, false)}
            color='warning'
          >
            10mm↓
          </ControllerButton>
          <ControllerButton
            variant="outlined"
            onClick={setButton(ButtonID.DOWN_50)}
            // onMouseUp={setButton(ButtonID.DOWN_50, false)}
            color='warning'
          >
            50mm↓
          </ControllerButton>
        </Controller>


        <Controller style={{ bottom: 100, right: 150 }}>
          <ControllerButton
            variant="outlined"
            onClick={setButton(ButtonID.PATAPATA)}
          // onTouchEnd={setButton(ButtonID.PATAPATA, false)}
          >
            ﾊﾟﾀﾊﾟﾀ
          </ControllerButton>
          <ControllerButton
            variant="outlined"
            onClick={setButton(ButtonID.DEFAULT)}
            color="error"
          // onTouchEnd={setButton(ButtonID.PATAPATA, false)}
          >
            STOP
          </ControllerButton>
        </Controller>
        <Controller style={{ bottom: 350, right: 150, height: 'auto' }}>
          <ControllerButton
            variant="outlined"
            onClick={setButton(ButtonID.SERVO_UP)}
          // onTouchEnd={setButton(ButtonID.SERVO_UP, false)}
          >
            SERVO↑
          </ControllerButton>
          <ControllerButton
            variant="outlined"
            onClick={setButton(ButtonID.SERVO_DOWN)}
          // onTouchEnd={setButton(ButtonID.SERVO_DOWN, false)}
          >
            SERVO↓
          </ControllerButton>
        </Controller>

        <div style={{ bottom: 150, right: 180, position: 'absolute' }}>
          <ControllerButton
            variant="contained"
            onClick={setButton(ButtonID.STOP)}
            // onTouchEnd={setButton(ButtonID.STOP, false)}
            style={{ fontSize: 30 }}
            color='error'
          >
            STOP
          </ControllerButton>
        </div>
        <div style={{ bottom: 50, right: 180, position: 'absolute' }}>
          <ControllerButton
            variant="contained"
            // onClick={setButton(ButtonID.REVERSE)}
            onTouchStart={setButton(ButtonID.REVERSE)}
            onTouchEnd={setButton(ButtonID.REVERSE, false)}
            style={{ fontSize: 30 }}
            color='secondary'
          >
            逆転
          </ControllerButton>
        </div>

        <div style={{ bottom: 50, right: 50, position: 'absolute' }}>
          <ControllerButton
            variant="contained"
            // onClick={setButton(ButtonID.FORWARD)}
            onTouchStart={setButton(ButtonID.FORWARD)}
            onTouchEnd={setButton(ButtonID.FORWARD, false)}
            style={{ fontSize: 30 }}
            color='success'
          >
            正転
          </ControllerButton>
        </div>



        <RefleshButton />
      </StyledHome>
    </Root >
  );
}
export default Seiton;
