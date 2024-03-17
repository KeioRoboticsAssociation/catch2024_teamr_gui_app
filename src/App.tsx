import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./fonts/Oxanium-Regular.ttf";
import "./fonts/Oxanium-Bold.ttf";
import "./fonts/NotoSansJP-Light.ttf";
import AllScrollLock from "./components/AllScrollLock";
import Home from "./pages/Home";
import Stop from "./pages/Stop";
import AutoScreen from "./pages/Auto";
import ConnectionScreen from "./pages/Connection";
import HomeTablet from "./pages/HomeTablet";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: ["Oxanium", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Screen />} />
        <Route path="/em" element={<Emergency />} />
        <Route path="/auto" element={<Auto />} />
        <Route path="/connection" element={<Connection />} />
        <Route path="/tablet" element={<Tablet />} />
      </Routes>
    </div>
  );
}

function Screen() {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Home />
        <CssBaseline />
        <AllScrollLock />
      </ThemeProvider>
    </div>
  );
}

function Tablet(){
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <HomeTablet />
        <CssBaseline />
        <AllScrollLock />
      </ThemeProvider>
    </div>
  );

}

function Emergency() {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Stop />
      </ThemeProvider>
    </div>
  );
}

function Auto() {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <AutoScreen />
        <AllScrollLock />
      </ThemeProvider>
    </div>
  );
}

function Connection() {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <ConnectionScreen />
        <CssBaseline />
        <AllScrollLock />
      </ThemeProvider>
    </div>
  );
}

export default App;
