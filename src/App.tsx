import { createTheme, CssBaseline } from "@mui/material";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { useAuth } from "./context/AuthContext";
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});
function App() {
  const { isAuthenticated, isLoading} = useAuth();
  if (isLoading) {
    return null;
  }
  return (
    <>
      <CssBaseline>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/main" /> : <LoginPage />
              }
            />
            <Route
              path="/main"
              element={isAuthenticated ? <MainPage /> : <Navigate to="/" />}
            />
          </Routes>
        </BrowserRouter>
      </CssBaseline>
    </>
  );
}

export default App;
