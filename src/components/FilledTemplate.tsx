import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useTemplateContext } from "../context/TemplateContext";

const FilledTemplate: React.FC = () => {
  const { backgroundColor } = useTemplateContext();
  const borderRadius = "15px";
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
        backgroundColor,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          padding: 2,
          backgroundColor: "#e3f2fd",
          borderRadius
        }}
      >
        <Typography variant="h4" align="center">
          Добро пожаловать в наш сервис!
        </Typography>
      </Paper>

      {/* Описание */}
      <Paper
        elevation={2}
        sx={{
          padding: 2,
          borderRadius
        }}
      >
        <Typography>
          Здесь вы найдете лучшие предложения и самые интересные акции. Мы рады приветствовать вас среди наших
          пользователей!
        </Typography>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          height: "150px",
          backgroundColor: "#bbdefb",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius
        }}
      >
        <Typography color="textSecondary">[Здесь будет ваше изображение]</Typography>
      </Paper>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Paper
          elevation={2}
          sx={{
            flex: 1,
            padding: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#c8e6c9",
            borderRadius
          }}
        >
          <Typography>Кнопка 1</Typography>
        </Paper>
        <Paper
          elevation={2}
          sx={{
            flex: 1,
            padding: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffcdd2",
            borderRadius
          }}
        >
          <Typography>Кнопка 2</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default FilledTemplate;
