import { NavLink, useLocation, useNavigate } from "react-router-dom";

interface SidebarLinkButtonProps {
  icon: string;
  label: string;
  location: string;
}

const SidebarLinkButton: React.FC<SidebarLinkButtonProps> = ({ icon, label, location }) => {
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const isActive = currentLocation.pathname === location;
  const handleClick = () => {
    navigate(location);
  };
  return (
    <button className={`menu-item ${isActive ? "focused" : ""}`} onClick={handleClick}>
      <NavLink to={location}></NavLink>
      <span className="icon">
        <img src={icon} alt={label} />
      </span>
      {label}
    </button>
  );
};

export default SidebarLinkButton;
