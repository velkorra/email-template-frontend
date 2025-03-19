import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SidebarButtonProps {
  icon: string;
  label: string;
  onClick?: () => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ icon, label, onClick }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <button className={`menu-item ${isFocused ? "focused" : ""}`} onBlur={() => setIsFocused(false)} onClick={onClick}>
      <span className="icon">
        <img src={icon} alt={label} />
      </span>
      {label}
    </button>
  );
};

export default SidebarButton;
