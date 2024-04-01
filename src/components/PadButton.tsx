import { Button } from "@mui/material";
import styled from "@emotion/styled";

const StyledButton = styled(Button)(() => ({
  borderRadius: "100%",
  fontSize: "30px",
  fontWeight: "Bold",
  width: "50px!important",
  height: "65px!important",
  zIndex: 1,
  color: "white",
  border: "3px solid white",
  position: "relative"
}));

function PadButton() {
  return (
    <div style={{width: 150, height:150, border:"1px solid white" }}>
      <StyledButton variant="contained" style={{ backgroundColor: "green"}}>
        △
      </StyledButton>
      <StyledButton variant="contained" style={{ backgroundColor: "#ff5533" }}>
        ○
      </StyledButton>
      <StyledButton variant="contained" style={{ backgroundColor: "blue" }}>
        ✕
      </StyledButton>
      <StyledButton variant="contained" style={{ backgroundColor: "#ad0079" }}>
        □
      </StyledButton>
    </div>
  );
}

export default PadButton;
