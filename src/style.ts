import { styled } from "@mui/system";

const Root = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(to bottom, #211f20, #11283b)",
}));

export { Root };
