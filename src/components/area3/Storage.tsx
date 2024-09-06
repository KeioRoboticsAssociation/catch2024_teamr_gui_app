import Silo from "./Silo";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import ROSLIB from "roslib";
import area3 from "../../assets/img/area3.svg";
import Robot from "./Robot";
import Ball from "./Ball";

const StorageArea = styled.div(() => ({
  height: "900px",
  width: "600px",
  display: "grid",
  position: "absolute",
  right: "70px",
  bottom: "40px",
  gridAutoFlow: "column",
  placeItems: "center",
  alignContent: "end",
  backgroundImage: `url(${area3})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
}));

export default function Storage({ ros }) {
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
    <StorageArea>
      <Robot ros={ros} />
      <Ball ros={ros} />
    </StorageArea>
  );
}
