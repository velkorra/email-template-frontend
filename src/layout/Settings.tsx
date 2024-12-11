import React, { useState } from 'react';
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
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Settings: React.FC = () => {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('@gmail.com');
  const [language, setLanguage] = useState<string>('Русский');
  const [activity, setActivity] = useState<string>('');

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

  return (
    <Box padding={3} border={1} borderRadius={2} borderColor="grey.300" bgcolor="white">
      <Typography variant="h6" gutterBottom>
        Персональная информация
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Фото профиля</Typography>
          <Avatar
            alt="Profile Picture"
            src={profilePic ?? undefined}
            sx={{ width: 70, height: 70 }}
          />
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{ marginTop: 1 }}
          >
            Загрузить фото
            <input
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          <Typography variant="caption" display="block" color="text.secondary" mt={1}>
            Это может быть файл формата PNG, JPG или GIF. Размер не должен превышать 3 Мб.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography>Миниатюра</Typography>
          <Avatar
            alt="Profile Thumbnail"
            src={profilePic ?? undefined}
            sx={{ width: 40, height: 40 }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Имя"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            margin="normal"
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Фамилия"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            margin="normal"
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Адрес электронной почты"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Язык интерфейса</InputLabel>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <MenuItem value="Русский">Русский</MenuItem>
              <MenuItem value="Английский">Английский</MenuItem>
              <MenuItem value="Немецкий">Немецкий</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Сфера деятельности</InputLabel>
            <Select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            >
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="Образование">Образование</MenuItem>
              <MenuItem value="Медицина">Медицина</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;