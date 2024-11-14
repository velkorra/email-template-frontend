import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Container,
    Paper,
    ListItemButton,
  } from "@mui/material";
  import MenuIcon from "@mui/icons-material/Menu";
  import HomeIcon from "@mui/icons-material/Home";
  import MailIcon from "@mui/icons-material/Mail";
  import SettingsIcon from "@mui/icons-material/Settings";
  import { useState } from "react";
  
  const DRAWER_WIDTH = 240;
  
  const MainPage = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
  
    const drawer = (
      <Box>
        <Toolbar />
        <List>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Главная" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Письма" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Настройки" />
          </ListItemButton>
        </List>
      </Box>
    );
  
    return (
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Email Forge
            </Typography>
          </Toolbar>
        </AppBar>
  
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
            },
            display: { xs: "none", sm: "block" },
          }}
        >
          {drawer}
        </Drawer>
  
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Container maxWidth="lg">
            <Paper sx={{ p: 3, mt: 2 }}>
              <Typography variant="h5" gutterBottom>
                Подписка
              </Typography>
              {/* Add your subscription content here */}
            </Paper>
  
            <Paper sx={{ p: 3, mt: 2 }}>
              <Typography variant="h5" gutterBottom>
                Доступно
              </Typography>
              {/* Add your available resources content here */}
            </Paper>
          </Container>
        </Box>
      </Box>
    );
  };
  
  export default MainPage;