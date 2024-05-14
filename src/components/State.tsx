/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import ROSLIB from "roslib";

function State({ros}: any) {
    const [state, setState] = useState("Harvest");
    useEffect(() => {
      const listener = new ROSLIB.Topic({
        ros: ros,
        name: "/state",
        messageType: "std_msgs/String",
      });
      listener.subscribe((message: any) => {
        setState(message.data);
      });
    }, [ros]);
    return (
      <div style={{
        position: "absolute",
        width: "auto",
        top: "65%",
        left: "3%",
      }}>
        <p
          style={{
            fontStyle: "italic",
            fontSize: "15pt",
            margin: "7%",
            textAlign: "left",
            right: "8%",
          }}
        >
          State
        </p>
        <p
          style={{
            fontSize: "24pt",
            margin: "2%",
            textAlign: "left",
            right: "0",
          }}
        >
          {state}
        </p>
      </div>
    );
  }
  
export default State;