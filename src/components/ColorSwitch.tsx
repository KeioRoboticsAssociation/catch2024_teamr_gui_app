import { styled } from "@mui/system";
import Switch from "@mui/material/Switch";

const ToggleSwitch = styled(Switch)(() => ({
    padding: 8,
    transform: "scale(1.4)",
    // position: "absolute",
    zIndex: 1,
    // top: "21%",
    // left: "6%",
    opacity: 1,
    "& .Mui-checked": {
      "& + .MuiSwitch-track": {
        borderRadius: 22 / 2,
        backgroundColor: "#8682ff",
        "&:before, &:after": {
          content: '""',
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%) scale(4)", // adjust scale to make switch bigger
          width: 16,
          height: 16,
        },
      },
      "&:before": {},
      "&:after": {},
    },
  
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      backgroundColor: "#ff0000",
      "&:before, &:after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%) scale(4)", // adjust scale to make switch bigger
        width: 16,
        height: 16,
      },
    },
  }));
  
  function ColorSwitch({ onChange }:any) {
    return (
      <ToggleSwitch onChange={onChange} />
    );
  }

  export default ColorSwitch;