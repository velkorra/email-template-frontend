import SidebarButton from "./components/SidebarButton";
import SidebarLinkButton from "./components/SidebarLinkButton";

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <SidebarLinkButton icon="/icons/home.png" label="Главная" location="/"></SidebarLinkButton>
      <SidebarLinkButton icon="/icons/exlore.png" label="Коллекция" location="/library"></SidebarLinkButton>
      <SidebarLinkButton icon="/icons/projects.png" label="Проекты" location="/projects"></SidebarLinkButton>
      <SidebarLinkButton icon="/icons/settings.png" label="Настройки" location="/settings"></SidebarLinkButton>
      <SidebarLinkButton icon="/icons/create.png" label="Новый шаблон" location="/constructor"></SidebarLinkButton>
    </aside>
  );
};

export default Sidebar;
