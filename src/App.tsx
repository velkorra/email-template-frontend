import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./context/AuthContext";
import Layout from "./layout/Layout";
import Main from "./layout/Main";
import Library from "./layout/Library";
import Settings from "./layout/Settings";
import ConstructorPage from "./components/ConstructorPage";

const App: React.FC = () => {
  const { isLoading } = useAuth();
  if (isLoading) {
    return null;
  }
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}
      >
        <Route index element={<Main />} />
        <Route path="/library" element={<Library />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/constructor" element={<ConstructorPage />} />

    </Routes>
  );
};

export default App;
