import styled from "@emotion/styled";

const StyledSilo = styled.div(() => ({
    height: "200px",
    width: "80px",
    display: "grid",
    border: "5px solid white",
    gridAutoFlow: "raw",
    placeItems: "center",
    alignContent: 'end'
  }));

const StyledBall = styled.div(() => ({
    width: "60px",
    height: "60px",
    borderRadius: "50%",
}));

function Ball({color}){
    if(color==1){
        return (
            <StyledBall  style={{backgroundColor:'#F44336'}}/>
        );
    }else if(color==2){
        return (
            <StyledBall  style={{backgroundColor:'#4275f5'}}/>
        );
    }
}

export default function Silo({colors}){
    return(
        <StyledSilo>
            <Ball color={colors[2]}/>
            <Ball color={colors[1]}/>
            <Ball color={colors[0]}/>
        </StyledSilo>
    )
}