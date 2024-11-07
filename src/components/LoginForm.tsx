import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Link,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";

export default function LoginForm({ changeState }: { changeState: any }) {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(value.trim() === "");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(value.trim() === "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setEmailError(!email);
    setPasswordError(!password);

    if (!email || !password) return;
    console.log("Email:", email);
    console.log("Password:", password);
    const response = await axios.post("http://localhost:5000/users/login", {
      email,
      password,
    });
    if (response.status === 200) {
      console.log(response);

      // redirect("/main");          
    } else alert(response.data);
  };

  return (
    <Container maxWidth="xs" sx={{ paddingBottom: "30px"}}>
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="/logo.png"
          alt="Logo"
          style={{ width: 120, marginBottom: 24 }}
        />
        <Paper
          elevation={3}
          sx={{ p: 4, width: "100%", borderRadius: 2, textAlign: "center" }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Добро пожаловать!
          </Typography>
          <div onClick={()=>changeState("register")}>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Нет аккаунта? <Link>Зарегистрироваться</Link>
            </Typography>
          </div>
          <Button
          onClick={() => {
            window.open(
              'http://localhost:5000/auth/google/callback',
              'Google Auth',
              'width=500,height=600,left=500,top=200'
            );
          }}
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{ mb: 2 }}
          >
            Войти с Google
          </Button>
          <Divider sx={{ my: 2 }}>или</Divider>
          <TextField
            value={email}
            error={emailError}
            helperText={emailError ? "Email не может быть пустым" : ""}
            fullWidth
            label="Email"
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={handleEmailChange}
          />
          <TextField
            value={password}
            error={passwordError}
            helperText={passwordError ? "Пароль не может быть пустым" : ""}
            fullWidth
            type="password"
            label="Пароль"
            variant="outlined"
            sx={{ mb: 1 }}
            onChange={handlePasswordChange}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Link href="/forgot-password">Забыли пароль?</Link>
          </Box>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleSubmit}
          >
            Войти
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}
