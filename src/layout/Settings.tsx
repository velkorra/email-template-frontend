import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  Paper,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Divider,
  Snackbar,
  Alert,
  useTheme,
  IconButton,
  Tooltip,
  Container,
  Card,
  CardContent,
  styled,
  Chip,
  Badge,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Person as PersonIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Help as HelpIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Settings: React.FC = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("@gmail.com");
  const [language, setLanguage] = useState<string>("Русский");
  const [activity, setActivity] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [smsNotifications, setSmsNotifications] = useState<boolean>(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState<boolean>(false);
  const [timezone, setTimezone] = useState<string>("Europe/Moscow");
  const [savedSuccessfully, setSavedSuccessfully] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [showDiscardDialog, setShowDiscardDialog] = useState<boolean>(false);

  // Initialize with default values to track changes
  const [initialState, setInitialState] = useState({
    profilePic,
    firstName,
    lastName,
    email,
    language,
    activity,
    bio,
    phoneNumber,
    location,
    darkMode,
    emailNotifications,
    smsNotifications,
    twoFactorAuth,
    timezone,
  });

  // Check for unsaved changes
  useEffect(() => {
    const currentState = {
      profilePic,
      firstName,
      lastName,
      email,
      language,
      activity,
      bio,
      phoneNumber,
      location,
      darkMode,
      emailNotifications,
      smsNotifications,
      twoFactorAuth,
      timezone,
    };

    setHasUnsavedChanges(JSON.stringify(currentState) !== JSON.stringify(initialState));
  }, [
    profilePic,
    firstName,
    lastName,
    email,
    language,
    activity,
    bio,
    phoneNumber,
    location,
    darkMode,
    emailNotifications,
    smsNotifications,
    twoFactorAuth,
    timezone,
    initialState,
  ]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    if (hasUnsavedChanges) {
      setShowDiscardDialog(true);
      return;
    }
    setTabValue(newValue);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setProfilePic(reader.result.toString());
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSave = () => {
    // Here you would typically save to backend
    console.log("Saving settings...");

    // Update initial state to current values
    setInitialState({
      profilePic,
      firstName,
      lastName,
      email,
      language,
      activity,
      bio,
      phoneNumber,
      location,
      darkMode,
      emailNotifications,
      smsNotifications,
      twoFactorAuth,
      timezone,
    });

    setSavedSuccessfully(true);
    setHasUnsavedChanges(false);
  };

  const handleReset = () => {
    setProfilePic(initialState.profilePic);
    setFirstName(initialState.firstName);
    setLastName(initialState.lastName);
    setEmail(initialState.email);
    setLanguage(initialState.language);
    setActivity(initialState.activity);
    setBio(initialState.bio);
    setPhoneNumber(initialState.phoneNumber);
    setLocation(initialState.location);
    setDarkMode(initialState.darkMode);
    setEmailNotifications(initialState.emailNotifications);
    setSmsNotifications(initialState.smsNotifications);
    setTwoFactorAuth(initialState.twoFactorAuth);
    setTimezone(initialState.timezone);
    setHasUnsavedChanges(false);
  };

  const handleCloseSnackbar = () => {
    setSavedSuccessfully(false);
  };

  const handleConfirmTabChange = (confirmed: boolean) => {
    setShowDiscardDialog(false);
    if (confirmed) {
      handleReset();
      setTabValue(tabValue === 0 ? 1 : 0); // Toggle between tabs
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          background: theme.palette.background.paper,
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: theme.palette.primary.main, color: "white" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="settings tabs"
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
          >
            <Tab icon={<PersonIcon />} iconPosition="start" label="Персональные данные" id="settings-tab-0" />
            <Tab icon={<NotificationsIcon />} iconPosition="start" label="Уведомления" id="settings-tab-1" />
            <Tab icon={<SecurityIcon />} iconPosition="start" label="Безопасность" id="settings-tab-2" />
            <Tab icon={<PaletteIcon />} iconPosition="start" label="Внешний вид" id="settings-tab-3" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
            Персональная информация
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Card
                elevation={2}
                sx={{ width: "100%", mb: 2, p: 2, display: "flex", flexDirection: "column", alignItems: "center" }}
              >
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    alt={`${firstName} ${lastName}`}
                    src={profilePic ?? undefined}
                    sx={{
                      width: 120,
                      height: 120,
                      mb: 2,
                      border: `3px solid ${theme.palette.primary.main}`,
                    }}
                  />
                </StyledBadge>

                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {firstName || lastName ? `${firstName} ${lastName}` : "Ваш профиль"}
                </Typography>

                <Typography variant="body2" color="text.secondary" gutterBottom sx={{ textAlign: "center" }}>
                  {activity || "Укажите сферу деятельности"}
                </Typography>

                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  sx={{ mt: 2, mb: 1 }}
                  color="primary"
                  fullWidth
                >
                  Загрузить фото
                  <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                </Button>

                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                  mt={1}
                  sx={{ textAlign: "center" }}
                >
                  Поддерживаемые форматы: PNG, JPG, GIF (max: 3MB)
                </Typography>
              </Card>

              <Card elevation={2} sx={{ width: "100%", p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Миниатюры
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", mb: 2 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Avatar alt="Small" src={profilePic ?? undefined} sx={{ width: 24, height: 24 }} />
                    <Typography variant="caption" mt={1}>
                      Маленький
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Avatar alt="Medium" src={profilePic ?? undefined} sx={{ width: 40, height: 40 }} />
                    <Typography variant="caption" mt={1}>
                      Средний
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Avatar alt="Large" src={profilePic ?? undefined} sx={{ width: 56, height: 56 }} />
                    <Typography variant="caption" mt={1}>
                      Большой
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  Основная информация
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Имя"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      variant="outlined"
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Фамилия"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      variant="outlined"
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      variant="outlined"
                      required
                      type="email"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Телефон"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Местоположение"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="О себе"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      variant="outlined"
                      multiline
                      rows={4}
                    />
                  </Grid>
                </Grid>
              </Card>

              <Card elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                  Настройки и предпочтения
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Язык интерфейса</InputLabel>
                      <Select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as string)}
                        label="Язык интерфейса"
                        startAdornment={<LanguageIcon color="action" sx={{ mr: 1 }} />}
                      >
                        <MenuItem value="Русский">Русский</MenuItem>
                        <MenuItem value="English">English</MenuItem>
                        <MenuItem value="Deutsch">Deutsch</MenuItem>
                        <MenuItem value="Français">Français</MenuItem>
                        <MenuItem value="Español">Español</MenuItem>
                        <MenuItem value="中文">中文</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Сфера деятельности</InputLabel>
                      <Select
                        value={activity}
                        onChange={(e) => setActivity(e.target.value as string)}
                        label="Сфера деятельности"
                      >
                        <MenuItem value="IT">IT и разработка</MenuItem>
                        <MenuItem value="Образование">Образование</MenuItem>
                        <MenuItem value="Медицина">Медицина</MenuItem>
                        <MenuItem value="Финансы">Финансы</MenuItem>
                        <MenuItem value="Маркетинг">Маркетинг</MenuItem>
                        <MenuItem value="Искусство">Искусство и дизайн</MenuItem>
                        <MenuItem value="Производство">Производство</MenuItem>
                        <MenuItem value="Другое">Другое</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Часовой пояс</InputLabel>
                      <Select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value as string)}
                        label="Часовой пояс"
                      >
                        <MenuItem value="Europe/Moscow">Москва (UTC+3)</MenuItem>
                        <MenuItem value="Europe/London">Лондон (UTC+0)</MenuItem>
                        <MenuItem value="America/New_York">Нью-Йорк (UTC-5)</MenuItem>
                        <MenuItem value="Asia/Tokyo">Токио (UTC+9)</MenuItem>
                        <MenuItem value="Australia/Sydney">Сидней (UTC+11)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
            Настройки уведомлений
          </Typography>

          <Card elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Каналы связи
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  color="primary"
                />
              }
              label="Email-уведомления"
              sx={{ mb: 2, display: "block" }}
            />

            {emailNotifications && (
              <Box sx={{ pl: 4, mb: 3 }}>
                <FormControlLabel
                  control={<Switch defaultChecked color="primary" />}
                  label="Важные обновления системы"
                />
                <FormControlLabel control={<Switch defaultChecked color="primary" />} label="Новости и анонсы" />
                <FormControlLabel control={<Switch defaultChecked color="primary" />} label="Отчеты и аналитика" />
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            <FormControlLabel
              control={
                <Switch
                  checked={smsNotifications}
                  onChange={(e) => setSmsNotifications(e.target.checked)}
                  color="primary"
                />
              }
              label="SMS-уведомления"
              sx={{ mb: 2, display: "block" }}
            />

            {smsNotifications && (
              <Box sx={{ pl: 4, mb: 3 }}>
                <FormControlLabel
                  control={<Switch defaultChecked color="primary" />}
                  label="Авторизация и безопасность"
                />
                <FormControlLabel control={<Switch color="primary" />} label="Маркетинговые сообщения" />
              </Box>
            )}
          </Card>

          <Card elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Частота и формат
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Частота дайджеста</InputLabel>
                  <Select defaultValue="weekly" label="Частота дайджеста">
                    <MenuItem value="daily">Ежедневно</MenuItem>
                    <MenuItem value="weekly">Еженедельно</MenuItem>
                    <MenuItem value="monthly">Ежемесячно</MenuItem>
                    <MenuItem value="never">Никогда</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Формат писем</InputLabel>
                  <Select defaultValue="html" label="Формат писем">
                    <MenuItem value="html">HTML (форматированный текст)</MenuItem>
                    <MenuItem value="plain">Только текст</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Card>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
            Безопасность и приватность
          </Typography>

          <Card elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Авторизация
            </Typography>

            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={twoFactorAuth}
                    onChange={(e) => setTwoFactorAuth(e.target.checked)}
                    color="primary"
                  />
                }
                label="Двухфакторная аутентификация"
              />
              <Typography variant="body2" color="text.secondary" ml={4}>
                Дополнительный уровень защиты вашего аккаунта с помощью SMS-кода или приложения-аутентификатора
              </Typography>
            </Box>

            <Button variant="outlined" color="primary" sx={{ mb: 2 }}>
              Сменить пароль
            </Button>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Сессии и устройства
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Активные устройства
              </Typography>

              <Box sx={{ pl: 2 }}>
                <Typography variant="body2" gutterBottom>
                  <b>Chrome на Windows</b> • Москва, Россия • Активно сейчас
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <b>Firefox на macOS</b> • Санкт-Петербург, Россия • 2 дня назад
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <b>iOS App</b> • Москва, Россия • 5 дней назад
                </Typography>
              </Box>
            </Box>

            <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
              Завершить все сессии
            </Button>
          </Card>

          <Card elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Конфиденциальность
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked color="primary" />}
                  label="Показывать мой онлайн-статус"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked color="primary" />}
                  label="Использовать данные для улучшения сервиса"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch color="primary" />}
                  label="Участвовать в программе аналитики пользовательского опыта"
                />
              </Grid>
            </Grid>
          </Card>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
            Настройки внешнего вида
          </Typography>

          <Card elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Тема
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  color="primary"
                  icon={<DarkModeIcon />}
                  checkedIcon={<DarkModeIcon />}
                />
              }
              label="Темный режим"
              sx={{ mb: 2 }}
            />

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item>
                <Box
                  sx={{
                    width: 100,
                    height: 70,
                    bgcolor: "#1976d2",
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    border: "2px solid",
                    borderColor: theme.palette.primary.main === "#1976d2" ? "green" : "transparent",
                  }}
                >
                  <Typography variant="body2" color="white">
                    Синяя
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    width: 100,
                    height: 70,
                    bgcolor: "#9c27b0",
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="body2" color="white">
                    Фиолетовая
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    width: 100,
                    height: 70,
                    bgcolor: "#2e7d32",
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="body2" color="white">
                    Зеленая
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box
                  sx={{
                    width: 100,
                    height: 70,
                    bgcolor: "#ed6c02",
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="body2" color="white">
                    Оранжевая
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Card>

          <Card elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Интерфейс
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Плотность интерфейса</InputLabel>
                  <Select defaultValue="comfortable" label="Плотность интерфейса">
                    <MenuItem value="compact">Компактный</MenuItem>
                    <MenuItem value="comfortable">Стандартный</MenuItem>
                    <MenuItem value="spacious">Просторный</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Размер шрифта</InputLabel>
                  <Select defaultValue="medium" label="Размер шрифта">
                    <MenuItem value="small">Маленький</MenuItem>
                    <MenuItem value="medium">Средний</MenuItem>
                    <MenuItem value="large">Большой</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Switch defaultChecked color="primary" />}
                  label="Отображать анимации в интерфейсе"
                />
              </Grid>
            </Grid>
          </Card>
        </TabPanel>

        <Box sx={{ p: 3, display: "flex", justifyContent: "space-between", borderTop: 1, borderColor: "divider" }}>
          <Box>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<RefreshIcon />}
              onClick={handleReset}
              disabled={!hasUnsavedChanges}
              sx={{ mr: 2 }}
            >
              Сбросить
            </Button>

            <Button
              variant="contained"
              color="success"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
            >
              Сохранить
            </Button>
          </Box>

          <Tooltip title="Нужна помощь?">
            <IconButton color="primary">
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>

      {/* Snackbar для уведомлений */}
      <Snackbar open={savedSuccessfully} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          Настройки успешно сохранены!
        </Alert>
      </Snackbar>

      {/* Диалог подтверждения при переключении вкладок с несохраненными изменениями */}
      <Dialog
        open={showDiscardDialog}
        onClose={() => setShowDiscardDialog(false)}
        aria-labelledby="discard-dialog-title"
      >
        <DialogTitle id="discard-dialog-title">Несохраненные изменения</DialogTitle>
        <DialogContent>
          <DialogContentText>
            У вас есть несохраненные изменения. Хотите сохранить их перед переходом на другую вкладку?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmTabChange(false)} color="primary">
            Отменить
          </Button>
          <Button onClick={() => handleSave()} color="primary" autoFocus>
            Сохранить
          </Button>
          <Button onClick={() => handleConfirmTabChange(true)} color="error">
            Не сохранять
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Settings;
