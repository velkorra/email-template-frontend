import React from "react";
import { Box, Typography, Slider, TextField, MenuItem } from "@mui/material";
import { useTemplateContext } from "../context/TemplateContext";

const PropertiesPanel: React.FC = () => {
  const { fontSize, fontFamily, backgroundColor, setFontSize, setFontFamily, setBackgroundColor } =
    useTemplateContext();

  return (
    <Box
      sx={{
        padding: 2,
        borderLeft: "1px solid #ddd",
        backgroundColor: "#f5f5f5",
        height: "100vh",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Свойства шаблона
      </Typography>

      {/* Настройка размера шрифта */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography gutterBottom>Размер шрифта</Typography>
        <Slider value={fontSize} min={10} max={30} step={1} onChange={(e, value) => setFontSize(value as number)} />
        <Typography>{fontSize}px</Typography>
      </Box>

      {/* Настройка шрифта */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography gutterBottom>Шрифт</Typography>
        <TextField select fullWidth value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
          <MenuItem value="Arial">Arial</MenuItem>
          <MenuItem value="Roboto">Roboto</MenuItem>
          <MenuItem value="Times New Roman">Times New Roman</MenuItem>
        </TextField>
      </Box>

      {/* Цвет фона */}
      <Box>
        <Typography gutterBottom>Цвет фона</Typography>
        <TextField
          type="color"
          fullWidth
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default PropertiesPanel;
