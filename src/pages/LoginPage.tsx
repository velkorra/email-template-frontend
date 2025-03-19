import { Box, Grid2 as Grid } from "@mui/material";

import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegistrationFrom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [state, setState] = useState("login");
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    window.location.href = "/";
  }

  return (
    <Box
      sx={{
        overflow: "hidden",
      }}
    >
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid
          size={4}
          sx={{
            "@media(max-width: 780px)": { display: "none" },
          }}
        >
          <Box
            sx={{
              height: "100vh",
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
        <Grid size={8}>
          {state === "login" ? (
            <LoginForm changeState={setState}></LoginForm>
          ) : (
            <RegisterForm changeState={setState}></RegisterForm>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
