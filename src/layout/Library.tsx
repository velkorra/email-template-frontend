import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  Tooltip,
  Paper,
  Divider,
  CircularProgress,
  styled,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Edit as EditIcon,
  ContentCopy as ContentCopyIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Preview as PreviewIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

// Типы для данных шаблона
interface TemplateTag {
  id: number;
  name: string;
  color: string;
}

interface TemplateData {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  previewUrl: string;
  htmlContent: string;
  category: string;
  tags: TemplateTag[];
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  usageCount: number;
}

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "all 0.3s ease-in-out",
  cursor: "pointer",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[8],
  },
}));

const fetchTemplates = (): Promise<TemplateData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Приветственное письмо",
          description: "Шаблон для приветствия новых пользователей после регистрации",
          thumbnail: "https://via.placeholder.com/400x250/1976d2/ffffff?text=Welcome+Email",
          previewUrl: "https://via.placeholder.com/800x1200/1976d2/ffffff?text=Welcome+Email+Preview",
          htmlContent: "<h1>Добро пожаловать!</h1><p>Спасибо за регистрацию в нашем сервисе...</p>",
          category: "Регистрация",
          tags: [
            { id: 1, name: "Приветствие", color: "#1976d2" },
            { id: 2, name: "Регистрация", color: "#2e7d32" },
          ],
          createdAt: "2023-10-15T14:30:00Z",
          updatedAt: "2023-11-20T09:15:00Z",
          isFavorite: true,
          usageCount: 1458,
        },
        {
          id: 2,
          name: "Сброс пароля",
          description: "Шаблон для отправки инструкций по сбросу пароля",
          thumbnail: "https://via.placeholder.com/400x250/e91e63/ffffff?text=Password+Reset",
          previewUrl: "https://via.placeholder.com/800x1200/e91e63/ffffff?text=Password+Reset+Preview",
          htmlContent: "<h1>Сброс пароля</h1><p>Вы запросили сброс пароля...</p>",
          category: "Безопасность",
          tags: [
            { id: 3, name: "Безопасность", color: "#e91e63" },
            { id: 4, name: "Пароль", color: "#ff9800" },
          ],
          createdAt: "2023-09-05T11:20:00Z",
          updatedAt: "2023-11-15T16:45:00Z",
          isFavorite: false,
          usageCount: 2365,
        },
        {
          id: 3,
          name: "Праздничная распродажа",
          description: "Шаблон для уведомления о сезонных скидках и специальных предложениях",
          thumbnail: "https://via.placeholder.com/400x250/9c27b0/ffffff?text=Holiday+Sale",
          previewUrl: "https://via.placeholder.com/800x1200/9c27b0/ffffff?text=Holiday+Sale+Preview",
          htmlContent: "<h1>Праздничная распродажа!</h1><p>Только сегодня скидки до 50%...</p>",
          category: "Маркетинг",
          tags: [
            { id: 5, name: "Маркетинг", color: "#9c27b0" },
            { id: 6, name: "Распродажа", color: "#f44336" },
          ],
          createdAt: "2023-11-01T08:00:00Z",
          updatedAt: "2023-11-28T13:20:00Z",
          isFavorite: true,
          usageCount: 856,
        },
        {
          id: 4,
          name: "Ежемесячный отчет",
          description: "Шаблон для отправки регулярных отчетов о статистике использования сервиса",
          thumbnail: "https://via.placeholder.com/400x250/4caf50/ffffff?text=Monthly+Report",
          previewUrl: "https://via.placeholder.com/800x1200/4caf50/ffffff?text=Monthly+Report+Preview",
          htmlContent: "<h1>Ваш ежемесячный отчет</h1><p>Статистика использования за прошедший месяц...</p>",
          category: "Отчеты",
          tags: [
            { id: 7, name: "Статистика", color: "#4caf50" },
            { id: 8, name: "Отчет", color: "#607d8b" },
          ],
          createdAt: "2023-08-20T16:15:00Z",
          updatedAt: "2023-11-05T10:30:00Z",
          isFavorite: false,
          usageCount: 344,
        },
        {
          id: 5,
          name: "Подтверждение заказа",
          description: "Шаблон для подтверждения оформленного заказа с деталями и инструкциями",
          thumbnail: "https://via.placeholder.com/400x250/ff5722/ffffff?text=Order+Confirmation",
          previewUrl: "https://via.placeholder.com/800x1200/ff5722/ffffff?text=Order+Confirmation+Preview",
          htmlContent: "<h1>Заказ подтвержден!</h1><p>Спасибо за ваш заказ №12345...</p>",
          category: "Электронная коммерция",
          tags: [
            { id: 9, name: "Заказ", color: "#ff5722" },
            { id: 10, name: "Подтверждение", color: "#009688" },
          ],
          createdAt: "2023-07-12T09:40:00Z",
          updatedAt: "2023-10-18T14:25:00Z",
          isFavorite: true,
          usageCount: 1756,
        },
        {
          id: 6,
          name: "Уведомление о доставке",
          description: "Шаблон для информирования о статусе и деталях доставки",
          thumbnail: "https://via.placeholder.com/400x250/3f51b5/ffffff?text=Shipping+Notification",
          previewUrl: "https://via.placeholder.com/800x1200/3f51b5/ffffff?text=Shipping+Notification+Preview",
          htmlContent: "<h1>Ваш заказ отправлен!</h1><p>Детали отправки и номер для отслеживания...</p>",
          category: "Электронная коммерция",
          tags: [
            { id: 9, name: "Заказ", color: "#ff5722" },
            { id: 11, name: "Доставка", color: "#3f51b5" },
          ],
          createdAt: "2023-09-25T13:10:00Z",
          updatedAt: "2023-11-10T11:05:00Z",
          isFavorite: false,
          usageCount: 982,
        },
        {
          id: 7,
          name: "Новостная рассылка",
          description: "Шаблон для регулярной рассылки новостей и обновлений",
          thumbnail: "https://via.placeholder.com/400x250/00bcd4/ffffff?text=Newsletter",
          previewUrl: "https://via.placeholder.com/800x1200/00bcd4/ffffff?text=Newsletter+Preview",
          htmlContent: "<h1>Новости компании</h1><p>Последние обновления и события за месяц...</p>",
          category: "Информационный",
          tags: [
            { id: 12, name: "Новости", color: "#00bcd4" },
            { id: 13, name: "Рассылка", color: "#cddc39" },
          ],
          createdAt: "2023-10-05T15:30:00Z",
          updatedAt: "2023-11-25T08:45:00Z",
          isFavorite: true,
          usageCount: 532,
        },
        {
          id: 8,
          name: "Напоминание о событии",
          description: "Шаблон для напоминания о предстоящих мероприятиях или встречах",
          thumbnail: "https://via.placeholder.com/400x250/ffc107/ffffff?text=Event+Reminder",
          previewUrl: "https://via.placeholder.com/800x1200/ffc107/ffffff?text=Event+Reminder+Preview",
          htmlContent: "<h1>Напоминание</h1><p>Завтра состоится важное мероприятие...</p>",
          category: "События",
          tags: [
            { id: 14, name: "Напоминание", color: "#ffc107" },
            { id: 15, name: "Событие", color: "#673ab7" },
          ],
          createdAt: "2023-11-15T10:20:00Z",
          updatedAt: "2023-11-27T16:35:00Z",
          isFavorite: false,
          usageCount: 245,
        },
      ]);
    }, 1500);
  });
};

// Компонент предпросмотра шаблона
const TemplatePreview: React.FC<{ template: TemplateData | null; onClose: () => void }> = ({ template, onClose }) => {
  if (!template) return null;

  return (
    <Dialog open={true} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{template.name}</Typography>
          <Button variant="contained" color="primary" startIcon={<EditIcon />}>
            Редактировать
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight="bold">
            Информация о шаблоне
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {template.description}
          </Typography>
          <Box display="flex" gap={1} mb={2}>
            {template.tags.map((tag) => (
              <Chip key={tag.id} label={tag.name} size="small" sx={{ bgcolor: tag.color, color: "white" }} />
            ))}
          </Box>
          <Typography variant="body2" color="text.secondary">
            Категория: <b>{template.category}</b> • Использовано: <b>{template.usageCount}</b> раз • Последнее
            обновление: <b>{new Date(template.updatedAt).toLocaleDateString()}</b>
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          Предпросмотр шаблона
        </Typography>

        <Paper
          variant="outlined"
          sx={{
            p: 1,
            overflow: "hidden",
            textAlign: "center",
            height: "auto",
            maxHeight: "600px",
            overflowY: "auto",
          }}
        >
          <img src={template.previewUrl} alt={template.name} style={{ maxWidth: "100%", height: "auto" }} />
        </Paper>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
          HTML-код шаблона
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            bgcolor: "#f5f5f5",
            overflowX: "auto",
            maxHeight: "200px",
            fontFamily: "monospace",
            fontSize: "0.875rem",
          }}
        >
          {template.htmlContent}
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button
          startIcon={<ContentCopyIcon />}
          color="primary"
          onClick={() => {
            navigator.clipboard.writeText(template.htmlContent);
            // Здесь можно добавить уведомление о копировании
          }}
        >
          Копировать HTML
        </Button>
        <Button startIcon={<DownloadIcon />} color="primary">
          Скачать
        </Button>
        <Button onClick={onClose} color="inherit">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const EmailTemplates: React.FC = () => {
  const [templates, setTemplates] = useState<TemplateData[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<TemplateData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(null);
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState<number>(0);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    severity: "success" | "error" | "info" | "warning";
  }>({
    show: false,
    message: "",
    severity: "info",
  });

  // Получение шаблонов с бэкенда
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setLoading(true);
        const data = await fetchTemplates();
        setTemplates(data);
        setFilteredTemplates(data);
      } catch (err) {
        setError("Не удалось загрузить шаблоны. Пожалуйста, попробуйте позже.");
        console.error("Error fetching templates:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

  useEffect(() => {
    let result = [...templates];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (template) =>
          template.name.toLowerCase().includes(query) ||
          template.description.toLowerCase().includes(query) ||
          template.tags.some((tag) => tag.name.toLowerCase().includes(query))
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter((template) => template.category === categoryFilter);
    }

    if (tabValue === 1) {
      result = result.filter((template) => template.isFavorite);
    }

    setFilteredTemplates(result);
  }, [searchQuery, categoryFilter, templates, tabValue]);

  const categories = React.useMemo(() => {
    const uniqueCategories = new Set(templates.map((template) => template.category));
    return Array.from(uniqueCategories);
  }, [templates]);

  const handleToggleFavorite = (id: number) => {
    const updatedTemplates = templates.map((template) =>
      template.id === id ? { ...template, isFavorite: !template.isFavorite } : template
    );
    setTemplates(updatedTemplates);

    setNotification({
      show: true,
      message: updatedTemplates.find((t) => t.id === id)?.isFavorite
        ? "Шаблон добавлен в избранное"
        : "Шаблон удален из избранного",
      severity: "success",
    });
  };

  const handleOpenPreview = (template: TemplateData) => {
    setSelectedTemplate(template);
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, show: false });
  };

  const renderTemplates = () => {
    if (loading) {
      return (
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
              <Card sx={{ height: "100%" }}>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" width="80%" height={28} />
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="60%" />
                </CardContent>
                <CardActions>
                  <Skeleton variant="circular" width={36} height={36} />
                  <Skeleton variant="circular" width={36} height={36} />
                  <Skeleton variant="circular" width={36} height={36} />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      );
    }

    if (error) {
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
    }

    if (filteredTemplates.length === 0) {
      return (
        <Box textAlign="center" py={5}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Шаблоны не найдены
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Попробуйте изменить параметры поиска или фильтрации
          </Typography>
        </Box>
      );
    }

    return (
      <Grid container spacing={3}>
        {filteredTemplates.map((template) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={template.id}>
            <StyledCard>
              <CardMedia
                sx={{
                  height: 200,
                  position: "relative",
                  "&:hover .preview-overlay": {
                    opacity: 1,
                  },
                }}
                image={template.thumbnail}
                title={template.name}
                onClick={() => handleOpenPreview(template)}
              >
                <Box
                  className="preview-overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                >
                  <Button variant="contained" color="primary" startIcon={<PreviewIcon />}>
                    Просмотр
                  </Button>
                </Box>
              </CardMedia>

              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                  <Typography variant="h6" component="div" gutterBottom noWrap>
                    {template.name}
                  </Typography>
                  <Chip label={template.category} size="small" color="primary" variant="outlined" />
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    mb: 1,
                  }}
                >
                  {template.description}
                </Typography>

                <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", mb: 1 }}>
                  {template.tags.map((tag) => (
                    <Chip
                      key={tag.id}
                      label={tag.name}
                      size="small"
                      sx={{ bgcolor: tag.color, color: "white", fontSize: "0.7rem" }}
                    />
                  ))}
                </Box>

                <Typography variant="caption" color="text.secondary">
                  Использовано {template.usageCount} раз
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: "space-between" }}>
                <Box>
                  <Tooltip title={template.isFavorite ? "Удалить из избранного" : "Добавить в избранное"}>
                    <IconButton
                      color={template.isFavorite ? "secondary" : "default"}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(template.id);
                      }}
                    >
                      {template.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Редактировать">
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Tooltip title="Дублировать шаблон">
                  <IconButton>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Шаблоны писем
          </Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            Создать шаблон
          </Button>
        </Box>

        <Paper elevation={0} variant="outlined" sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                placeholder="Поиск шаблонов..."
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
              <FormControl fullWidth size="small" variant="outlined">
                <InputLabel>Категория</InputLabel>
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value as string)}
                  label="Категория"
                  startAdornment={<FilterListIcon color="action" sx={{ mr: 1 }} />}
                >
                  <MenuItem value="all">Все категории</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={5}>
              <Box display="flex" justifyContent="flex-end" gap={1}>
                <Chip label={`${filteredTemplates.length} шаблон(ов)`} variant="outlined" size="medium" />

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

        <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 3 }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Все шаблоны" />
            <Tab
              label={
                <Box display="flex" alignItems="center">
                  <FavoriteIcon sx={{ mr: 1, fontSize: "1.2rem" }} color="secondary" />
                  Избранное
                </Box>
              }
            />
          </Tabs>
        </Box>
      </Box>

      {renderTemplates()}

      {openPreview && selectedTemplate && <TemplatePreview template={selectedTemplate} onClose={handleClosePreview} />}

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

export default EmailTemplates;
