// Template.tsx
import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

const Template: React.FC = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        height: "100%",
        backgroundColor: "#fff",
        padding: 3,
        overflow: "auto",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Пример шаблона
      </Typography>
      <Box
        sx={{
          border: "1px dashed #ccc",
          padding: 3,
          minHeight: "300px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Grid container spacing={2}>
          {/* Верхний текстовый блок */}
          <Grid item xs={12}>
            <Paper sx={{ padding: 2, backgroundColor: "#e8f5e9" }}>
              <Typography align="center">Введите текст и настройте его стили</Typography>
            </Paper>
          </Grid>

          {/* Средние 2 блока */}
          <Grid item xs={6}>
            <Paper
              sx={{
                height: "150px",
                backgroundColor: "#e3f2fd",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>Бросьте контент сюда</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              sx={{
                height: "150px",
                backgroundColor: "#e3f2fd",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>Бросьте контент сюда</Typography>
            </Paper>
          </Grid>

          {/* Нижний блок */}
          <Grid item xs={12}>
            <Paper
              sx={{
                height: "150px",
                backgroundColor: "#fce4ec",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography>Бросьте контент сюда</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default Template;