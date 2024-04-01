import styled from "@emotion/styled";
import { Button } from "@mui/material";
import ROSLIB from "roslib";
import pos from "../assets/audio/pos.mp3";

const StyledButton = styled(Button)(() => ({
  borderRadius: "100%",
  fontSize: "30px",
  fontWeight: "Bold",
  width: "50px!important",
  height: "65px!important",
  zIndex: 1,
  color: "white",
  border: "3px solid white",
}));

function TouchButton({ id, isPressed, setIsPressed, topic, data, color }: any) {
  function setArrayMember(arr: any[], index: number, value: boolean) {
    return [...arr.slice(0, index), value, ...arr.slice(index + 1)];
  }
  return (
    <StyledButton
      variant="outlined"
      style={{opacity: isPressed[id] ? 0.2 : 1, backgroundColor: color}}
      onClick={() => {
        const audio = new Audio(pos);
        audio.play();
        const msg = new ROSLIB.Message({
          data: data,
        });
        setIsPressed(setArrayMember(isPressed, id, true));
        topic.publish(msg);
      }}
    >
      {id}
    </StyledButton>
  );
}

export default TouchButton;
