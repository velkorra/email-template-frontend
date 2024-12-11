import React from "react";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import Template from "./Template";
import FilledTemplate from "./FilledTemplate";
import PropertiesPanel from "./PropertiesPanel";
import { useTemplateContext } from "../context/TemplateContext";
import ChristmasTemplate from "./ChristmasTemplate";
import Header from "../layout/Header";

const ConstructorPage: React.FC = () => {
  const { fontSize, fontFamily, backgroundColor } = useTemplateContext();
  const [isFilledTemplate, setIsFilledTemplate] = React.useState<boolean | string>(false);

  return (
    <>
      <Header></Header>
      <Grid container height="100vh">
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
            <Button variant="outlined" onClick={() => setIsFilledTemplate(false)}>
              Пустой шаблон
            </Button>
            <Button variant="outlined" onClick={() => setIsFilledTemplate(true)}>
              Заполненный шаблон
            </Button>
            <Button variant="outlined" onClick={() => setIsFilledTemplate("christmas")}>
              С Рождеством
            </Button>
            <Button variant="outlined">Текст</Button>
            <Button variant="outlined">Изображение</Button>
            <Button variant="outlined">Кнопка</Button>
            <Button variant="outlined">Список</Button>
            <Button variant="outlined">Таблица</Button>
            <Button variant="outlined">Другое</Button>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box
            sx={{
              height: "100%",
              padding: 3,
              backgroundColor: "white",
              fontFamily,
              fontSize,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Шаблон
            </Typography>
            <Paper elevation={3} sx={{ height: "calc(100% - 32px)", padding: 2, backgroundColor }}>
              {isFilledTemplate === "christmas" ? (
                <ChristmasTemplate />
              ) : isFilledTemplate ? (
                <FilledTemplate />
              ) : (
                <Template />
              )}
            </Paper>
          </Box>
        </Grid>

        {/* Панель свойств */}
        <Grid item xs={3}>
          <PropertiesPanel />
        </Grid>
      </Grid>
    </>
  );
};

export default ConstructorPage;
