// ConstructorPage.tsx
import React from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import Template from "./Template";

const ConstructorPage: React.FC = () => {
  return (
    <Grid container height="100vh">
      {/* Левое меню */}
      <Grid
        item
        xs={3}
        sx={{
          backgroundColor: "#f5f5f5",
          padding: 2,
          borderRight: "1px solid #ddd",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Компоненты
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <Button variant="outlined">Текст</Button>
          <Button variant="outlined">Изображение</Button>
          <Button variant="outlined">Кнопка</Button>
          <Button variant="outlined">Список</Button>
          <Button variant="outlined">Таблица</Button>
          <Button variant="outlined">Другое</Button>
        </Box>
      </Grid>

      {/* Центральная область */}
      <Grid item xs={9}>
        <Box
          sx={{
            height: "100%",
            padding: 3,
            backgroundColor: "#fff",
          }}
        >
          <Template />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ConstructorPage;
