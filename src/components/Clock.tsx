import { useEffect, useState } from "react";
import styled from "@emotion/styled";

const StyleClock = styled.div(() => ({
    // position: "absolute",
    // top: "10px",
    // left: "4%",
    fontSize: "30pt",
    zIndex: 1,
  }));
  
function Clock() {
    const [sec, setSec] = useState(0);
    const [flg, setFlg] = useState(false);
  
    useEffect(() => {
      setSec(180);
    }, []);
  
    const handleClick = () => {
      if (!flg) {
        setFlg(true);
        const interval = setInterval(() => {
          setSec((sec) => {
            if (sec === 0) {
              setFlg(true);
              clearInterval(interval);
              setSec(180);
            }
            return sec - 1;
          });
        }, 1000);
        return () => clearInterval(interval);
      }
    };
  
    return (
      <StyleClock onClick={handleClick}>
        {("0" + Math.floor(sec / 60)).slice(-2)}:
        {("0" + Math.floor(sec % 60)).slice(-2)}
      </StyleClock>
    );
  }

  export default Clock;