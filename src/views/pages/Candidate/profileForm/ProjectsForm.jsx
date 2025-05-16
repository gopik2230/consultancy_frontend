import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProjectsForm = () => {
  const [formData, setFormData] = useState({
    projectTitle: '',
    role: '',
    date: '',
    description: '',
  });

  const [projectsList, setProjectsList] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.projectTitle.trim()) newErrors.projectTitle = 'Project title is required';
    if (!formData.role.trim()) newErrors.role = 'Role/Position is required';
    if (!formData.date.trim()) newErrors.date = 'Date is required';
    if (!formData.description.trim()) newErrors.description = 'Project description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddProject = () => {
    if (validate()) {
      setProjectsList(prev => [...prev, { ...formData }]);
      setFormData({
        projectTitle: '',
        role: '',
        date: '',
        description: '',
      });
      setErrors({});
    }
  };

  const handleRemoveProject = (index) => {
    setProjectsList(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectsList.length === 0) {
      setErrors({ form: 'Please add at least one project.' });
      return;
    }

    console.log('Submitted Projects List:', projectsList);
    // Submit logic here (e.g., send to backend)
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Project Title"
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleChange}
            error={Boolean(errors.projectTitle)}
            helperText={errors.projectTitle}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Role/Position"
            name="role"
            value={formData.role}
            onChange={handleChange}
            error={Boolean(errors.role)}
            helperText={errors.role}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Date"
            name="date"
            type="month"
            value={formData.date}
            onChange={handleChange}
            error={Boolean(errors.date)}
            helperText={errors.date}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            minRows={3}
            value={formData.description}
            onChange={handleChange}
            error={Boolean(errors.description)}
            helperText={errors.description}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="outlined" onClick={handleAddProject}>
            Add Project
          </Button>
          {errors.form && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {errors.form}
            </Typography>
          )}
        </Grid>

        {projectsList.length > 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Added Projects
              </Typography>
              <List>
                {projectsList.map((proj, index) => (
                  <ListItem key={index} alignItems="flex-start">
                    <ListItemText
                      primary={`${proj.projectTitle} — ${proj.role}`}
                      secondary={
                        <>
                          <Typography variant="body2">Date: {new Date(proj.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Typography>
                          <Typography variant="body2">{proj.description}</Typography>
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => handleRemoveProject(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        )}

        <Grid item xs={12}>
          <Button type="submit" variant="contained">
            Submit Projects
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectsForm;
