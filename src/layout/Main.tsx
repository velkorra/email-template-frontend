import { Box, Button, Card, CardContent, Container, Grid, Typography } from "@mui/material";

const Main: React.FC = () => {
  return (
    <main className="main">
      <Container maxWidth="lg">
        <Box mt={4} mb={6} textAlign="center">
          <Typography variant="h3" gutterBottom>
            Добро пожаловать на LETTERIA!
          </Typography>
          <Typography variant="h5" paragraph>
            Интеграция с различными системами, создание красивых шаблонов и удобное редактирование.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Card>
              <img
                src="template.png"
                alt="Template"
                style={{ width: "100%", borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Создание шаблонов
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Легко создавайте и настраивайте шаблоны писем для различных целей.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <img
                src="integrate.png"
                alt="Integration"
                style={{ width: "100%", borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Интеграция с CRM системами
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Простая интеграция с популярными системами и сервисами.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <img
                src="control.png" // Замените на ваше изображение
                alt="Email Templates"
                style={{ width: "100%", borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Управление шаблонами
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Удобный интерфейс для редактирования и управления шаблонами писем.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box mt={6} textAlign="center">
          <Button variant="contained" color="primary">
            Начать создание шаблона
          </Button>
        </Box>
      </Container>
    </main>
  );
};

export default Main;
