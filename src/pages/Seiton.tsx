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

const NUMBER_OF_BUTTONS = 12;
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
  const [recommend, setRecommend] = useState<number[]>([0, 1, 2]);

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

        <Controller style={{ bottom: 10, right: 10 }}>
          <ControllerButton
            variant="outlined"
            onTouchStart={setButton(ButtonID.UP_50)}
            onTouchEnd={setButton(ButtonID.UP_50, false)}
          >
            50mm↑
          </ControllerButton>
          <ControllerButton
            variant="outlined"
            onTouchStart={setButton(ButtonID.UP_10)}
            onTouchEnd={setButton(ButtonID.UP_10, false)}
          >
            10mm↑
          </ControllerButton>
          <ControllerButton
            variant="outlined"
            onTouchStart={setButton(ButtonID.UP_5)}
            onTouchEnd={setButton(ButtonID.UP_5, false)}
          >
            5mm↑
          </ControllerButton>
          <ControllerButton
            variant="outlined"
            onTouchStart={setButton(ButtonID.DOWN_5)}
            onTouchEnd={setButton(ButtonID.DOWN_5, false)}
          >
            5mm↓
          </ControllerButton>
          <ControllerButton
            variant="outlined"
            onTouchStart={setButton(ButtonID.DOWN_10)}
            onTouchEnd={setButton(ButtonID.DOWN_10, false)}
          >
            10mm↓
          </ControllerButton>
          <ControllerButton
            variant="outlined"
            onTouchStart={setButton(ButtonID.DOWN_50)}
            onTouchEnd={setButton(ButtonID.DOWN_50, false)}
          >
            50mm↓
          </ControllerButton>
        </Controller>

        <Controller style={{ bottom: 10, right: 150 }}>
          <ControllerButton
            variant="outlined"
            onTouchStart={setButton(ButtonID.YURAYURA)}
            onTouchEnd={setButton(ButtonID.YURAYURA, false)}
          >
            ﾕﾗﾕﾗ
          </ControllerButton>
          <ControllerButton
            variant="outlined"
            onTouchStart={setButton(ButtonID.GRIGRI)}
            onTouchEnd={setButton(ButtonID.GRIGRI, false)}
          >
            ｸﾞﾘｸﾞﾘ
          </ControllerButton>
          <ControllerButton
            variant="outlined"
            onTouchStart={setButton(ButtonID.PATAPATA)}
            onTouchEnd={setButton(ButtonID.PATAPATA, false)}
          >
            ﾊﾟﾀﾊﾟﾀ
          </ControllerButton>
          <ControllerButton
            variant="outlined"
            onTouchStart={setButton(9)}
            onTouchEnd={setButton(10, false)}
          >
            SERVO↑
          </ControllerButton>
          <ControllerButton
            variant="outlined"
            onTouchStart={setButton(10)}
            onTouchEnd={setButton(10, false)}
          >
            SERVO↓
          </ControllerButton>
          <ControllerButton
            variant="outlined"
            onTouchStart={setButton(11)}
            onTouchEnd={setButton(9, false)}
          >
            ｺﾝﾍﾞｱ+
          </ControllerButton>
          <ControllerButton
            variant="outlined"
            onTouchStart={setButton(12)}
            onTouchEnd={setButton(10, false)}
          >
            ｺﾝﾍﾞｱ-
          </ControllerButton>
        </Controller>

        <RefleshButton />
      </StyledHome>
    </Root>
  );
}
export default Seiton;
