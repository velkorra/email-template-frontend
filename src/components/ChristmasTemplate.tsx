import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { useTemplateContext } from "../context/TemplateContext";

const ChristmasTemplate: React.FC = () => {
  const { backgroundColor } = useTemplateContext();
  const borderRadius = "15px";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        padding: 3,
        backgroundColor,
      }}
    >
      <Paper
        elevation={2}
        sx={{
          padding: 3,
          backgroundColor: "#ffe0b2",
          borderRadius,
        }}
      >
        <Typography variant="h3" align="center" sx={{ color: "#d84315" }}>
          Счастливого Рождества!
        </Typography>
      </Paper>

      {/* Изображение с рождественской елкой */}
      <Paper
        elevation={2}
        sx={{
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff3e0", // Светлый фон для контраста
          borderRadius,
          overflow: "hidden", // Ensures the image fits within the Paper
        }}
      >
        <img 
          src="/mc.png" 
          alt="Рождественская елка" 
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Ensures the image covers the entire area
          }}
        />
      </Paper>

      {/* Пожелание */}
      <Paper
        elevation={2}
        sx={{
          padding: 2,
          backgroundColor: "#dcedc8", // Мягкий зеленый
          borderRadius,
        }}
      >
        <Typography variant="h5" align="center">
          Пусть это Рождество принесет в ваш дом тепло, счастье и радость!
        </Typography>
      </Paper>

      {/* Нижний блок с кнопками */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Paper
          elevation={2}
          sx={{
            flex: 1,
            padding: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffccbc", // Светло-красный
            borderRadius,
          }}
        >
          <Typography>Подробнее</Typography>
        </Paper>
        <Paper
          elevation={2}
          sx={{
            flex: 1,
            padding: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#c5e1a5", // Светло-зеленый
            borderRadius,
          }}
        >
          <Typography>Связаться с нами</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default ChristmasTemplate;