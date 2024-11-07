import {
  createTheme,
  CssBaseline,
} from "@mui/material";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});
function App() {
  return (
    <>
      <CssBaseline>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
        </BrowserRouter>
        
      </CssBaseline>
    </>
  );
}

export default App;
