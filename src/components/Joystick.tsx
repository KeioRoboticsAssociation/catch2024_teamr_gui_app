import ReactNipple from "react-nipple";
import ROSLIB from "roslib";
import { useState, useEffect, useRef } from "react";

export default function Joystick({ ros, index }: any) {
  const [joyR, setJoyR] = useState([0, 0]);
  const [joyL, setJoyL] = useState([0, 0]);
  const [joytopic, setJoytopic] = useState(
    new ROSLIB.Topic({ ros: ros, name: "/joy", messageType: "sensor_msgs/Joy" })
  );
  const joyRef = useRef({ r: [...joyR], l: [...joyL] });
  useEffect(() => {
    joyRef.current = { r: [...joyR], l: [...joyL] };
    // console.log(joyRef.current.l[0], joyRef.current.r[0]);
  }, [joyR, joyL]);
  useEffect(() => {
    const timer = setInterval(() => {
      const msg = new ROSLIB.Message({
        axes: [
          joyRef.current.l[0],
          joyRef.current.l[1],
          0,
          joyRef.current.r[0],
          joyRef.current.r[1],
          0,
        ],
        buttons: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      });
      // console.log(msg, joyRef.current.l[0]);
      joytopic.publish(msg);
    }, 20);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div
        style={{
          position: "absolute",
          width: 450,
          height: 400,
          bottom: 0,
          left: 0,
        }}
      >
        <ReactNipple
          // supports all nipplejs options
          // see https://github.com/yoannmoinet/nipplejs#options
          options={{ mode: "dynamic", position: { top: "0%", left: "0%" } }}
          // any unknown props will be passed to the container element, e.g. 'title', 'style' etc
          style={{
            backgroundColor: "rgba(255,255, 255, 0.1)",
            borderRadius: "10%",
            width: "100%",
            height: "100%",
            zIndex: 10,
            // if you pass position: 'relative', you don't need to import the stylesheet
          }}
          // all events supported by nipplejs are available as callbacks
          // see https://github.com/yoannmoinet/nipplejs#start
          onMove={(_evt: any, data: any) => {
            console.log(data.vector);
            setJoyL([-data.vector.x, data.vector.y]);
          }}
          onEnd={() => {
            setJoyL([0, 0]);
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          width: 450,
          height: 400,
          bottom: 0,
          right: 0,
        }}
      >
        <ReactNipple
          // supports all nipplejs options
          // see https://github.com/yoannmoinet/nipplejs#options
          options={{ mode: "dynamic", position: { top: "0%", left: "0%" } }}
          // any unknown props will be passed to the container element, e.g. 'title', 'style' etc
          style={{
            backgroundColor: "rgba(255,255, 255, 0.1)",
            borderRadius: "10%",
            width: "100%",
            height: "100%",
            zIndex: 10,
            // if you pass position: 'relative', you don't need to import the stylesheet
          }}
          // all events supported by nipplejs are available as callbacks
          // see https://github.com/yoannmoinet/nipplejs#start
          onMove={(_evt: any, data: any) => {
            console.log(data.vector);
            setJoyR([-data.vector.x, data.vector.y]);
          }}
          onEnd={() => {
            setJoyR([0, 0]);
          }}
        />
      </div>
    </>
  );
}
