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

export default function RegisterForm({ changeState }: { changeState: any }) {
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>(
    undefined
  );
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

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

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordError(value.trim() === "" || value !== password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setEmailError(!email);
    setPasswordError(!password);
    setConfirmPasswordError(!confirmPassword || confirmPassword !== password);

    if (!email || !password || !confirmPassword || password !== confirmPassword)
      return;

    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        {
          email,
          password,
        }
      );
      if (response.status === 201) {
        console.log("Регистрация успешна");
      }
    } catch (error) {
      alert("Ошибка при регистрации");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ paddingBottom: "30px" }}>
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src="/logo.PNG"
          alt="Logo"
          style={{ width: 120, marginBottom: 24 }}
        />
        <Paper
          elevation={3}
          sx={{ p: 4, width: "100%", borderRadius: 2, textAlign: "center" }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Регистрация
          </Typography>
          <div onClick={() => changeState("login")}>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Уже есть аккаунт? <Link>Войти</Link>
            </Typography>
          </div>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{ mb: 2 }}
          >
            Регистрация через Google
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
            sx={{ mb: 2 }}
            onChange={handlePasswordChange}
          />
          <TextField
            value={confirmPassword}
            error={confirmPasswordError}
            helperText={confirmPasswordError ? "Пароли не совпадают" : ""}
            fullWidth
            type="password"
            label="Подтвердите пароль"
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={handleConfirmPasswordChange}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleSubmit}
          >
            Зарегистрироваться
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}
