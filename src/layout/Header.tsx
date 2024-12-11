import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isAuth, setIsAuth] = useState(isAuthenticated);
  return (
    <header className="header">
      <NavLink to="/" className="logo">
        LETTERIA
      </NavLink>
      <div className="account-section">
        {isAuth ? (
          <div className="user-info">
            <span>Привет, Антон!</span>
            <button
              className="logout-button"
              onClick={async () => {
                setIsAuth(false);
                await logout();
              }}
            >
              Выйти
            </button>
          </div>
        ) : (
          <div className="auth-links">
            <NavLink to="/login" className="auth-link">
              Войти или зарегистрироваться
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
