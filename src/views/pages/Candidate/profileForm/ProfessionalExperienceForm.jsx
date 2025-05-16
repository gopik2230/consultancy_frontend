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

const emptyExperience = {
  jobTitle: '',
  companyName: '',
  location: '',
  startDate: '',
  endDate: '',
  responsibilityInput: '',
  responsibilities: [],
};

const ProfessionalExperienceForm = () => {
  const [experiences, setExperiences] = useState([structuredClone(emptyExperience)]);
  const [errors, setErrors] = useState([]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...experiences];
    updated[index][name] = value;
    setExperiences(updated);
  };

  const addResponsibility = (index) => {
    const updated = [...experiences];
    const input = updated[index].responsibilityInput.trim();
    if (input) {
      updated[index].responsibilities.push(input);
      updated[index].responsibilityInput = '';
      setExperiences(updated);
    }
  };

  const removeResponsibility = (expIdx, respIdx) => {
    const updated = [...experiences];
    updated[expIdx].responsibilities.splice(respIdx, 1);
    setExperiences(updated);
  };

  const addExperience = () => {
    setExperiences(prev => [...prev, structuredClone(emptyExperience)]);
    setErrors(prev => [...prev, {}]);
  };

  const removeExperience = (index) => {
    setExperiences(prev => prev.filter((_, i) => i !== index));
    setErrors(prev => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = experiences.map((exp) => {
      const e = {};
      if (!exp.jobTitle.trim()) e.jobTitle = 'Job Title is required';
      if (!exp.companyName.trim()) e.companyName = 'Company Name is required';
      if (!exp.location.trim()) e.location = 'Location is required';
      if (!exp.startDate.trim()) e.startDate = 'Start Date is required';
      if (!exp.endDate.trim()) e.endDate = 'End Date is required';
      if (exp.responsibilities.length === 0) e.responsibilities = 'Add at least one responsibility';
      return e;
    });
    setErrors(newErrors);
    return newErrors.every(err => Object.keys(err).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Submitted Experiences:', experiences);
      // API call or state save here
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
     

      {experiences.map((exp, index) => (
        <Paper key={index} sx={{ p: 2, mb: 4 }} elevation={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Experience {index + 1}
              </Typography>
              {experiences.length > 1 && (
                <Button
                  variant="text"
                  color="error"
                  onClick={() => removeExperience(index)}
                  size="small"
                >
                  Remove Experience
                </Button>
              )}
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Job Title"
                name="jobTitle"
                value={exp.jobTitle}
                onChange={(e) => handleChange(index, e)}
                error={Boolean(errors[index]?.jobTitle)}
                helperText={errors[index]?.jobTitle}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Name"
                name="companyName"
                value={exp.companyName}
                onChange={(e) => handleChange(index, e)}
                error={Boolean(errors[index]?.companyName)}
                helperText={errors[index]?.companyName}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Location (City, State/Country)"
                name="location"
                value={exp.location}
                onChange={(e) => handleChange(index, e)}
                error={Boolean(errors[index]?.location)}
                helperText={errors[index]?.location}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="month"
                name="startDate"
                label="Start Date"
                value={exp.startDate}
                onChange={(e) => handleChange(index, e)}
                error={Boolean(errors[index]?.startDate)}
                helperText={errors[index]?.startDate}
                InputLabelProps={{ shrink: true }}
                placeholder="YYYY-MM"
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="month"
                name="endDate"
                label="End Date"
                value={exp.endDate}
                onChange={(e) => handleChange(index, e)}
                error={Boolean(errors[index]?.endDate)}
                helperText={errors[index]?.endDate}
                InputLabelProps={{ shrink: true }}
                placeholder="YYYY-MM"
              />
            </Grid>

            {/* Responsibilities */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Responsibility or Achievement"
                name="responsibilityInput"
                value={exp.responsibilityInput}
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addResponsibility(index);
                  }
                }}
              />
              <Button onClick={() => addResponsibility(index)} variant="outlined" sx={{ mt: 1 }}>
                Add Responsibility
              </Button>
              {errors[index]?.responsibilities && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  {errors[index]?.responsibilities}
                </Typography>
              )}
            </Grid>

            {exp.responsibilities.length > 0 && (
              <Grid item xs={12}>
                <List dense>
                  {exp.responsibilities.map((item, idx) => (
                    <ListItem key={idx} disablePadding>
                      <ListItemText primary={`• ${item}`} />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => removeResponsibility(index, idx)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            )}
          </Grid>
        </Paper>
      ))}

      <Button onClick={addExperience} variant="outlined" sx={{ mb: 2 }}>
        Add Another Experience
      </Button>

      <Grid item xs={12}>
        <Button type="submit" variant="contained" color="primary">
          Save All Experiences
        </Button>
      </Grid>
    </Box>
  );
};

export default ProfessionalExperienceForm;
