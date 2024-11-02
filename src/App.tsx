import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Grid2 as Grid,
  Toolbar,
} from "@mui/material";
import "./App.css";
import LoginForm from "./components/LoginForm";
import { useState } from "react";
import RegisterForm from "./components/RegistrationFrom";

function App() {
  const [state, setState] = useState("login");
  return (
    <>
      <CssBaseline>
        <Box
          sx={{
            overflow: "hidden",
          }}
        >
          <Grid container>
            <Grid
              size={4}
              sx={{
                "@media(max-width: 780px)": { display: "none" },
              }}
            >
              <Box
                sx={{
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <img
                  src="/beato-ext.png"
                  alt="beato"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 30%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    transform: "scale(1.2)",
                  }}
                />
              </Box>
            </Grid>
            <Grid
              size={8}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {state === "login" ? (
                <LoginForm changeState={setState}></LoginForm>
              ) : (
                <RegisterForm changeState={setState}></RegisterForm>
              )}
            </Grid>
          </Grid>
        </Box>
      </CssBaseline>
    </>
  );
}

export default App;
