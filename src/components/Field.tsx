import React, { useState, useEffect } from "react";
import blueImg from "../assets/img/img-blue.svg";
import redImg from "../assets/img/img-red.svg";

export default function Field({ color }) {
  
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "790px" }}>
        <img src={!color ? blueImg : redImg} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
