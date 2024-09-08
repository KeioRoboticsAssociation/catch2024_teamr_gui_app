import { Button } from "@mui/material";
import ROSLIB from "roslib";


function EmergencyStop({ topic }: any) {
  return (
    <Button
      variant="contained"
      color="error"
      style={{
        // position: "absolute",
        fontSize: "30px",
        // top: "38%",
        // left: "5%",
        width: "80px",
        height: "80px",
        borderRadius: "100%",
      }}
      onClick={() => {
        const msg = new ROSLIB.Message({
          data: true,
        });
        topic.publish(msg);
      }}
    >
      STOP
    </Button>
  );
}

export default EmergencyStop;
