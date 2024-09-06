import Silo from "./Silo";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import ROSLIB from "roslib";

const SiloArea = styled.div(() => ({
  height: "200px",
  width: "600px",
  display: "grid",
  position: "absolute",
  right: "70px",
  top: "40px",
  gridAutoFlow: "column",
  placeItems: "center",
  alignContent: "end",
}));

export default function Area3({ ros }) {
  const [gameState, setGameState] = useState("");
  // useEffect(() => {
  //   const listener = new ROSLIB.Topic({
  //     ros: ros,
  //     name: "/game_state",
  //     messageType: "silo_status/GameState",
  //   });
  //   listener.subscribe((message: any) => {
  //     setGameState(message.data);
  //     console.log(message.data.toString());
  //   });
  // }, [ros]);
  return (
    <SiloArea>
      <Silo colors={[1, 2, 1]} />
      <Silo colors={[1, 2, 1]} />
      <Silo colors={[1, 2, 1]} />
      <Silo colors={[1, 2, 1]} />
      <Silo colors={[1, 2, 1]} />
    </SiloArea>
  );
}
