import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  Chip,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Skeleton,
  Snackbar,
  Alert,
  Badge,
  Container,
  InputAdornment,
  Tabs,
  Tab,
  CircularProgress,
  Collapse,
  Fade,
  useTheme,
  alpha,
  styled,
  FormControlLabel,
  Switch,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Folder as FolderIcon,
  Mail as MailIcon,
  Settings as SettingsIcon,
  ContentCopy as CopyIcon,
  Archive as ArchiveIcon,
  Share as ShareIcon,
  Search as SearchIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  People as PeopleIcon,
  Build as BuildIcon,
  BarChart as StatsIcon,
  OpenInNew as OpenIcon,
  ViewList as ListViewIcon,
  ViewModule as GridViewIcon,
  Sort as SortIcon,
} from "@mui/icons-material";

// Типы для данных проекта
interface ProjectTemplate {
  id: number;
  name: string;
  type: string;
  lastModified: string;
}

interface ProjectStats {
  templateCount: number;
  sentEmails: number;
  openRate: number;
  clickRate: number;
}

interface ProjectMember {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  industry: string;
  createdAt: string;
  updatedAt: string;
  isStarred: boolean;
  status: "active" | "archived" | "draft";
  templates: ProjectTemplate[];
  stats: ProjectStats;
  members: ProjectMember[];
  thumbnailColor: string;
}

// Стили для карточек проектов
const ProjectCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[10],
  },
}));

const ProjectIcon = styled(Avatar)(({ theme }) => ({
  width: 60,
  height: 60,
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
}));

// Заглушка для получения проектов с бэкенда
const fetchProjects = (): Promise<Project[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'Интернет-магазин "TechHub"',
          description: "Проект для e-commerce платформы электроники и гаджетов",
          industry: "Электронная коммерция",
          createdAt: "2023-06-15T10:30:00Z",
          updatedAt: "2023-11-20T16:45:00Z",
          isStarred: true,
          status: "active",
          thumbnailColor: "#1976d2",
          templates: [
            { id: 101, name: "Подтверждение заказа", type: "Транзакционное", lastModified: "2023-11-15T14:22:00Z" },
            { id: 102, name: "Статус доставки", type: "Информационное", lastModified: "2023-11-02T09:15:00Z" },
            { id: 103, name: "Брошенная корзина", type: "Маркетинговое", lastModified: "2023-10-28T11:40:00Z" },
            { id: 104, name: "Отзыв о покупке", type: "Информационное", lastModified: "2023-09-15T16:30:00Z" },
          ],
          stats: {
            templateCount: 4,
            sentEmails: 12458,
            openRate: 65.3,
            clickRate: 23.8,
          },
          members: [
            {
              id: 1,
              name: "Алексей Петров",
              email: "alex@example.com",
              role: "Admin",
              avatar: "https://i.pravatar.cc/150?img=1",
            },
            {
              id: 2,
              name: "Ирина Смирнова",
              email: "irina@example.com",
              role: "Editor",
              avatar: "https://i.pravatar.cc/150?img=5",
            },
            {
              id: 3,
              name: "Максим Иванов",
              email: "maxim@example.com",
              role: "Viewer",
              avatar: "https://i.pravatar.cc/150?img=3",
            },
          ],
        },
        {
          id: 2,
          name: 'Образовательная платформа "LearnNow"',
          description: "Рассылки для онлайн-курсов и образовательных программ",
          industry: "Образование",
          createdAt: "2023-08-10T08:15:00Z",
          updatedAt: "2023-11-25T14:20:00Z",
          isStarred: false,
          status: "active",
          thumbnailColor: "#9c27b0",
          templates: [
            { id: 201, name: "Приветственное письмо", type: "Информационное", lastModified: "2023-11-10T15:30:00Z" },
            { id: 202, name: "Новый курс", type: "Маркетинговое", lastModified: "2023-10-05T11:20:00Z" },
            { id: 203, name: "Напоминание о занятии", type: "Транзакционное", lastModified: "2023-09-22T09:45:00Z" },
          ],
          stats: {
            templateCount: 3,
            sentEmails: 8752,
            openRate: 72.1,
            clickRate: 31.5,
          },
          members: [
            {
              id: 4,
              name: "Екатерина Соколова",
              email: "kate@example.com",
              role: "Admin",
              avatar: "https://i.pravatar.cc/150?img=9",
            },
            {
              id: 5,
              name: "Дмитрий Козлов",
              email: "dmitry@example.com",
              role: "Editor",
              avatar: "https://i.pravatar.cc/150?img=4",
            },
          ],
        },
        {
          id: 3,
          name: 'Фитнес-клуб "FitLife"',
          description: "Проект для сети фитнес-центров и тренировочных программ",
          industry: "Здоровье и фитнес",
          createdAt: "2023-05-05T09:00:00Z",
          updatedAt: "2023-11-15T17:10:00Z",
          isStarred: true,
          status: "active",
          thumbnailColor: "#2e7d32",
          templates: [
            {
              id: 301,
              name: "Приветствие нового клиента",
              type: "Информационное",
              lastModified: "2023-11-12T10:15:00Z",
            },
            { id: 302, name: "Расписание тренировок", type: "Информационное", lastModified: "2023-10-18T14:30:00Z" },
            { id: 303, name: "Специальное предложение", type: "Маркетинговое", lastModified: "2023-09-30T16:45:00Z" },
            { id: 304, name: "Продление абонемента", type: "Транзакционное", lastModified: "2023-08-25T11:20:00Z" },
            { id: 305, name: "Отзыв о тренировке", type: "Информационное", lastModified: "2023-07-19T09:35:00Z" },
          ],
          stats: {
            templateCount: 5,
            sentEmails: 6327,
            openRate: 58.7,
            clickRate: 19.2,
          },
          members: [
            {
              id: 6,
              name: "Ольга Новикова",
              email: "olga@example.com",
              role: "Admin",
              avatar: "https://i.pravatar.cc/150?img=10",
            },
            {
              id: 7,
              name: "Андрей Волков",
              email: "andrey@example.com",
              role: "Editor",
              avatar: "https://i.pravatar.cc/150?img=7",
            },
            {
              id: 8,
              name: "Наталья Морозова",
              email: "nataly@example.com",
              role: "Viewer",
              avatar: "https://i.pravatar.cc/150?img=11",
            },
          ],
        },
        {
          id: 4,
          name: 'Туристическое агентство "TravelDream"',
          description: "Рассылки для туристических туров и сервисов",
          industry: "Туризм",
          createdAt: "2023-09-20T13:45:00Z",
          updatedAt: "2023-11-28T10:30:00Z",
          isStarred: false,
          status: "draft",
          thumbnailColor: "#f57c00",
          templates: [
            {
              id: 401,
              name: "Подтверждение бронирования",
              type: "Транзакционное",
              lastModified: "2023-11-20T15:40:00Z",
            },
            { id: 402, name: "Горящие туры", type: "Маркетинговое", lastModified: "2023-10-15T11:25:00Z" },
          ],
          stats: {
            templateCount: 2,
            sentEmails: 3145,
            openRate: 62.8,
            clickRate: 28.3,
          },
          members: [
            {
              id: 9,
              name: "Сергей Кузнецов",
              email: "sergey@example.com",
              role: "Admin",
              avatar: "https://i.pravatar.cc/150?img=8",
            },
            {
              id: 10,
              name: "Анна Павлова",
              email: "anna@example.com",
              role: "Editor",
              avatar: "https://i.pravatar.cc/150?img=12",
            },
          ],
        },
        {
          id: 5,
          name: 'Ресторан "Gusto"',
          description: "Email-маркетинг для сети ресторанов итальянской кухни",
          industry: "Рестораны и общепит",
          createdAt: "2023-07-12T11:20:00Z",
          updatedAt: "2023-11-10T09:15:00Z",
          isStarred: false,
          status: "archived",
          thumbnailColor: "#d32f2f",
          templates: [
            { id: 501, name: "Специальное меню", type: "Маркетинговое", lastModified: "2023-10-30T16:50:00Z" },
            { id: 502, name: "Подтверждение резервации", type: "Транзакционное", lastModified: "2023-10-02T13:15:00Z" },
            { id: 503, name: "Программа лояльности", type: "Информационное", lastModified: "2023-09-15T10:40:00Z" },
          ],
          stats: {
            templateCount: 3,
            sentEmails: 5278,
            openRate: 53.6,
            clickRate: 22.1,
          },
          members: [
            {
              id: 11,
              name: "Марина Соловьева",
              email: "marina@example.com",
              role: "Admin",
              avatar: "https://i.pravatar.cc/150?img=13",
            },
            {
              id: 12,
              name: "Павел Игнатьев",
              email: "pavel@example.com",
              role: "Viewer",
              avatar: "https://i.pravatar.cc/150?img=14",
            },
          ],
        },
        {
          id: 6,
          name: 'Медицинский центр "HealthCare"',
          description: "Проект для сети клиник и медицинских услуг",
          industry: "Здравоохранение",
          createdAt: "2023-10-05T14:30:00Z",
          updatedAt: "2023-11-25T13:45:00Z",
          isStarred: true,
          status: "active",
          thumbnailColor: "#00acc1",
          templates: [
            { id: 601, name: "Напоминание о приеме", type: "Транзакционное", lastModified: "2023-11-22T09:30:00Z" },
            { id: 602, name: "Результаты анализов", type: "Информационное", lastModified: "2023-11-05T15:20:00Z" },
            { id: 603, name: "Профилактический осмотр", type: "Маркетинговое", lastModified: "2023-10-18T11:45:00Z" },
          ],
          stats: {
            templateCount: 3,
            sentEmails: 4627,
            openRate: 78.2,
            clickRate: 32.5,
          },
          members: [
            {
              id: 13,
              name: "Елена Васильева",
              email: "elena@example.com",
              role: "Admin",
              avatar: "https://i.pravatar.cc/150?img=15",
            },
            {
              id: 14,
              name: "Виктор Николаев",
              email: "victor@example.com",
              role: "Editor",
              avatar: "https://i.pravatar.cc/150?img=16",
            },
            {
              id: 15,
              name: "Юлия Федорова",
              email: "julia@example.com",
              role: "Editor",
              avatar: "https://i.pravatar.cc/150?img=17",
            },
          ],
        },
      ]);
    }, 1500);
  });
};

const CreateProjectDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onSubmit: (project: Partial<Project>) => void;
}> = ({ open, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;

    onSubmit({
      name,
      description,
      industry,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isStarred: false,
      thumbnailColor: getRandomColor(),
      templates: [],
      stats: {
        templateCount: 0,
        sentEmails: 0,
        openRate: 0,
        clickRate: 0,
      },
      members: [],
    });

    setName("");
    setDescription("");
    setIndustry("");
    onClose();
  };

  const getRandomColor = () => {
    const colors = [
      "#1976d2", // синий
      "#9c27b0", // фиолетовый
      "#2e7d32", // зеленый
      "#f57c00", // оранжевый
      "#d32f2f", // красный
      "#00acc1", // голубой
      "#fbc02d", // желтый
      "#5d4037", // коричневый
      "#455a64", // серо-синий
      "#7b1fa2", // темно-фиолетовый
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Создание нового проекта</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 3 }}>
          Создайте новый проект для организации ваших почтовых шаблонов и рассылок. Каждый проект может содержать набор
          шаблонов для конкретного бизнес-направления.
        </DialogContentText>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoFocus
              required
              label="Название проекта"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="dense"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Описание"
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="dense"
              variant="outlined"
              placeholder="Краткое описание проекта и его назначения"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Отрасль"
              fullWidth
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              margin="dense"
              variant="outlined"
              placeholder="Например: Электронная коммерция, Образование, Здравоохранение"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Отмена
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" disabled={!name.trim()}>
          Создать проект
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ProjectDetailsDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  project: Project | null;
}> = ({ open, onClose, project }) => {
  const [tabValue, setTabValue] = useState(0);

  if (!project) return null;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Avatar
              sx={{
                bgcolor: project.thumbnailColor,
                color: "white",
                mr: 2,
                width: 40,
                height: 40,
                fontSize: "1.2rem",
              }}
            >
              {project.name.substring(0, 2).toUpperCase()}
            </Avatar>
            <Typography variant="h6" component="div">
              {project.name}
            </Typography>
          </Box>
          <Chip
            label={project.status === "active" ? "Активный" : project.status === "draft" ? "Черновик" : "Архивный"}
            color={project.status === "active" ? "success" : project.status === "draft" ? "warning" : "default"}
            size="small"
          />
        </Box>
      </DialogTitle>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth" aria-label="project details tabs">
          <Tab label="Обзор" icon={<FolderIcon />} iconPosition="start" />
          <Tab label="Шаблоны" icon={<MailIcon />} iconPosition="start" />
          <Tab label="Участники" icon={<PeopleIcon />} iconPosition="start" />
          <Tab label="Настройки" icon={<SettingsIcon />} iconPosition="start" />
        </Tabs>
      </Box>

      <DialogContent dividers>
        {tabValue === 0 && (
          <Box>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Информация о проекте
            </Typography>
            <Typography variant="body2" paragraph>
              {project.description}
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Отрасль
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {project.industry}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Дата создания
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Статистика
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h5" color="primary" fontWeight="bold">
                    {project.stats.templateCount}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Шаблонов
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.1),
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h5" color="secondary" fontWeight="bold">
                    {project.stats.sentEmails.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Отправлено
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h5" color="success.main" fontWeight="bold">
                    {project.stats.openRate}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Open Rate
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    bgcolor: (theme) => alpha(theme.palette.info.main, 0.1),
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h5" color="info.main" fontWeight="bold">
                    {project.stats.clickRate}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Click Rate
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                Шаблоны писем ({project.templates.length})
              </Typography>
              <Button variant="outlined" size="small" startIcon={<AddIcon />}>
                Добавить шаблон
              </Button>
            </Box>

            {project.templates.length === 0 ? (
              <Paper
                variant="outlined"
                sx={{
                  p: 3,
                  textAlign: "center",
                  bgcolor: (theme) => alpha(theme.palette.background.default, 0.5),
                }}
              >
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  В этом проекте пока нет шаблонов
                </Typography>
                <Button variant="contained" startIcon={<AddIcon />} sx={{ mt: 1 }}>
                  Создать первый шаблон
                </Button>
              </Paper>
            ) : (
              <Paper variant="outlined" sx={{ overflow: "hidden" }}>
                {project.templates.map((template, index) => (
                  <React.Fragment key={template.id}>
                    <Box
                      sx={{
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                      }}
                    >
                      <Box display="flex" alignItems="center">
                        <MailIcon color="action" sx={{ mr: 2 }} />
                        <Box>
                          <Typography variant="body1">{template.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {template.type} • Обновлено {new Date(template.lastModified).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Tooltip title="Редактировать">
                          <IconButton size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Открыть">
                          <IconButton size="small" color="primary">
                            <OpenIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                    {index < project.templates.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </Paper>
            )}
          </Box>
        )}

        {tabValue === 2 && (
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                Участники проекта ({project.members.length})
              </Typography>
              <Button variant="outlined" size="small" startIcon={<AddIcon />}>
                Добавить участника
              </Button>
            </Box>

            <Paper variant="outlined" sx={{ overflow: "hidden" }}>
              {project.members.map((member, index) => (
                <React.Fragment key={member.id}>
                  <Box
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <Avatar src={member.avatar} alt={member.name} sx={{ mr: 2 }} />
                      <Box>
                        <Typography variant="body1">{member.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {member.email}
                        </Typography>
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <Chip
                        label={member.role}
                        size="small"
                        color={member.role === "Admin" ? "primary" : member.role === "Editor" ? "info" : "default"}
                        sx={{ mr: 1 }}
                      />
                      <IconButton size="small">
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  {index < project.members.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </Paper>
          </Box>
        )}

        {tabValue === 3 && (
          <Box>
            <Typography variant="subtitle1" gutterBottom fontWeight="bold">
              Настройки проекта
            </Typography>

            <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Общие настройки
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Название проекта"
                    defaultValue={project.name}
                    variant="outlined"
                    size="small"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Описание"
                    defaultValue={project.description}
                    variant="outlined"
                    size="small"
                    margin="dense"
                    multiline
                    rows={3}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Отрасль"
                    defaultValue={project.industry}
                    variant="outlined"
                    size="small"
                    margin="dense"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Статус проекта"
                    defaultValue={project.status}
                    variant="outlined"
                    size="small"
                    margin="dense"
                  >
                    <MenuItem value="active">Активный</MenuItem>
                    <MenuItem value="draft">Черновик</MenuItem>
                    <MenuItem value="archived">Архивный</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Paper>

            <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Настройки отправки
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Email отправителя"
                    defaultValue="default"
                    variant="outlined"
                    size="small"
                    margin="dense"
                  >
                    <MenuItem value="default">По умолчанию (info@company.com)</MenuItem>
                    <MenuItem value="support">Поддержка (support@company.com)</MenuItem>
                    <MenuItem value="sales">Продажи (sales@company.com)</MenuItem>
                    <MenuItem value="custom">Настроить другой...</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Имя отправителя"
                    defaultValue="company"
                    variant="outlined"
                    size="small"
                    margin="dense"
                  >
                    <MenuItem value="company">Название компании</MenuItem>
                    <MenuItem value="project">Название проекта</MenuItem>
                    <MenuItem value="custom">Настроить другое...</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel control={<Switch defaultChecked />} label="Отслеживание открытий писем" />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel control={<Switch defaultChecked />} label="Отслеживание кликов по ссылкам" />
                </Grid>
              </Grid>
            </Paper>

            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom color="error">
                Опасная зона
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Button variant="outlined" color="warning" startIcon={<ArchiveIcon />} size="small">
                  Архивировать проект
                </Button>
                <Button variant="outlined" color="error" startIcon={<DeleteIcon />} size="small">
                  Удалить проект
                </Button>
              </Box>
            </Paper>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Закрыть
        </Button>
        {tabValue !== 0 && (
          <Button color="primary" variant="contained">
            Сохранить изменения
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

const Projects: React.FC = () => {
  const theme = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isViewMode, setIsViewMode] = useState<"grid" | "list">("grid");
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    show: false,
    message: "",
    severity: "info",
  });

  // Получение проектов с бэкенда
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
        setFilteredProjects(data);
      } catch (err) {
        setError("Не удалось загрузить проекты. Пожалуйста, попробуйте позже.");
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  useEffect(() => {
    let result = [...projects];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (project) =>
          project.name.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.industry.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((project) => project.status === statusFilter);
    }

    setFilteredProjects(result);
  }, [searchQuery, statusFilter, projects]);

  const handleCreateProject = (project: Partial<Project>) => {
    const newProject = {
      ...project,
      id: Math.max(0, ...projects.map((p) => p.id)) + 1,
    } as Project;

    setProjects([newProject, ...projects]);

    setNotification({
      show: true,
      message: `Проект "${newProject.name}" успешно создан`,
      severity: "success",
    });
  };

  const handleOpenProjectDetails = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDialog = () => {
    setSelectedProject(null);
    setIsDialogOpen(false);
  };

  const handleToggleStar = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    const updatedProjects = projects.map((project) =>
      project.id === id ? { ...project, isStarred: !project.isStarred } : project
    );
    setProjects(updatedProjects);

    const project = updatedProjects.find((p) => p.id === id);
    if (project) {
      setNotification({
        show: true,
        message: project.isStarred
          ? `Проект "${project.name}" добавлен в избранное`
          : `Проект "${project.name}" удален из избранного`,
        severity: "success",
      });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, show: false });
  };

  const renderSkeletons = () => {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <Card>
              <CardContent>
                <Skeleton variant="circular" width={60} height={60} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="70%" height={32} />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="60%" />
              </CardContent>
              <CardActions>
                <Skeleton variant="circular" width={30} height={30} />
                <Skeleton variant="circular" width={30} height={30} />
                <Skeleton variant="circular" width={30} height={30} />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderError = () => {
    return (
      <Box textAlign="center" py={5}>
        <Typography color="error" variant="h6" gutterBottom>
          {error}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<RefreshIcon />}
          onClick={() => window.location.reload()}
        >
          Попробовать снова
        </Button>
      </Box>
    );
  };

  const renderEmptyState = () => {
    return (
      <Box textAlign="center" py={5}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Проекты не найдены
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Попробуйте изменить параметры поиска или создайте новый проект
        </Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setIsDialogOpen(true)}>
          Создать проект
        </Button>
      </Box>
    );
  };

  const renderGridView = () => {
    return (
      <Grid container spacing={3}>
        {filteredProjects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <ProjectCard onClick={() => handleOpenProjectDetails(project)}>
              <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <ProjectIcon sx={{ bgcolor: project.thumbnailColor }}>
                    {project.name.substring(0, 2).toUpperCase()}
                  </ProjectIcon>
                  <IconButton
                    onClick={(e) => handleToggleStar(project.id, e)}
                    color={project.isStarred ? "warning" : "default"}
                    size="small"
                    sx={{ alignSelf: "flex-start" }}
                  >
                    {project.isStarred ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                </Box>

                <Box sx={{ width: "100%" }}>
                  <Typography variant="h6" component="div" gutterBottom noWrap>
                    {project.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      height: "40px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      mb: 2,
                    }}
                  >
                    {project.description}
                  </Typography>

                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Chip label={project.industry} size="small" variant="outlined" />
                    <Chip
                      label={
                        project.status === "active" ? "Активный" : project.status === "draft" ? "Черновик" : "Архивный"
                      }
                      color={
                        project.status === "active" ? "success" : project.status === "draft" ? "warning" : "default"
                      }
                      size="small"
                    />
                  </Box>
                </Box>
              </CardContent>

              <Divider />

              <CardContent sx={{ py: 1 }}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Box display="flex" alignItems="center">
                      <MailIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {project.templates.length} шаблонов
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box display="flex" alignItems="center">
                      <PeopleIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {project.members.length} участников
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>

              <CardActions sx={{ justifyContent: "space-between", pt: 0 }}>
                <Button size="small" endIcon={<OpenIcon />} onClick={() => handleOpenProjectDetails(project)}>
                  Открыть
                </Button>

                <IconButton
                  size="small"
                  aria-label="действия"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Здесь можно добавить меню действий
                  }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </CardActions>
            </ProjectCard>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderListView = () => {
    return (
      <Paper variant="outlined">
        {filteredProjects.map((project, index) => (
          <React.Fragment key={project.id}>
            <Box
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                "&:hover": {
                  bgcolor: "action.hover",
                },
                cursor: "pointer",
              }}
              onClick={() => handleOpenProjectDetails(project)}
            >
              <Avatar
                sx={{
                  bgcolor: project.thumbnailColor,
                  color: "white",
                  mr: 2,
                  width: 50,
                  height: 50,
                  fontSize: "1.2rem",
                }}
              >
                {project.name.substring(0, 2).toUpperCase()}
              </Avatar>

              <Box sx={{ flexGrow: 1, mr: 2 }}>
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" component="div">
                    {project.name}
                  </Typography>
                  <IconButton
                    onClick={(e) => handleToggleStar(project.id, e)}
                    color={project.isStarred ? "warning" : "default"}
                    size="small"
                    sx={{ ml: 1 }}
                  >
                    {project.isStarred ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
                  </IconButton>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  noWrap
                  sx={{ maxWidth: { xs: "200px", sm: "400px", md: "600px" } }}
                >
                  {project.description}
                </Typography>
              </Box>

              <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2, mr: 2 }}>
                <Chip label={project.industry} size="small" variant="outlined" />

                <Box display="flex" alignItems="center">
                  <MailIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {project.templates.length}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center">
                  <PeopleIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {project.members.length}
                  </Typography>
                </Box>
              </Box>

              <Chip
                label={project.status === "active" ? "Активный" : project.status === "draft" ? "Черновик" : "Архивный"}
                color={project.status === "active" ? "success" : project.status === "draft" ? "warning" : "default"}
                size="small"
                sx={{ mr: 2 }}
              />

              <IconButton
                size="small"
                aria-label="действия"
                onClick={(e) => {
                  e.stopPropagation();
                  // Здесь можно добавить меню действий
                }}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Box>
            {index < filteredProjects.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Paper>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Проекты
          </Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setIsDialogOpen(true)}>
            Создать проект
          </Button>
        </Box>

        <Paper elevation={0} variant="outlined" sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                placeholder="Поиск проектов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Статус"
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: <FilterListIcon color="action" sx={{ mr: 1 }} />,
                }}
              >
                <MenuItem value="all">Все статусы</MenuItem>
                <MenuItem value="active">Активные</MenuItem>
                <MenuItem value="draft">Черновики</MenuItem>
                <MenuItem value="archived">Архивные</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} md={5}>
              <Box display="flex" justifyContent="flex-end" gap={1}>
                <Chip
                  label={`${filteredProjects.length} из ${projects.length} проектов`}
                  variant="outlined"
                  size="medium"
                />

                <Box
                  sx={{
                    display: "flex",
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                  }}
                >
                  <Tooltip title="Вид сетки">
                    <IconButton
                      color={isViewMode === "grid" ? "primary" : "default"}
                      onClick={() => setIsViewMode("grid")}
                      size="small"
                    >
                      <GridViewIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Вид списка">
                    <IconButton
                      color={isViewMode === "list" ? "primary" : "default"}
                      onClick={() => setIsViewMode("list")}
                      size="small"
                    >
                      <ListViewIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>

                {loading && (
                  <Chip
                    icon={<CircularProgress size={16} color="inherit" />}
                    label="Загрузка..."
                    variant="outlined"
                    size="medium"
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Box sx={{ mb: 4 }}>
        {loading
          ? renderSkeletons()
          : error
          ? renderError()
          : filteredProjects.length === 0
          ? renderEmptyState()
          : isViewMode === "grid"
          ? renderGridView()
          : renderListView()}
      </Box>

      <CreateProjectDialog open={isDialogOpen} onClose={handleCloseDialog} onSubmit={handleCreateProject} />

      <ProjectDetailsDialog open={selectedProject !== null} onClose={handleCloseDialog} project={selectedProject} />

      <Snackbar
        open={notification.show}
        autoHideDuration={4000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Projects;
