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

const EducationForm = () => {
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    location: '',
    graduationDate: '',
    additionalDetails: '',
  });

  const [educationList, setEducationList] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.degree.trim()) newErrors.degree = 'Degree is required';
    if (!formData.institution.trim()) newErrors.institution = 'Institution name is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.graduationDate.trim()) newErrors.graduationDate = 'Graduation date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddEducation = () => {
    if (validate()) {
      setEducationList(prev => [...prev, { ...formData }]); // create a shallow copy
      setFormData({
        degree: '',
        institution: '',
        location: '',
        graduationDate: '',
        additionalDetails: '',
      });
      setErrors({});
    }
  };

  const handleRemoveEducation = (index) => {
    setEducationList(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (educationList.length === 0) {
      setErrors({ form: 'Please add at least one education entry.' });
      return;
    }

    console.log('Submitted Education List:', educationList);
    // Submit logic here (e.g., send to backend)
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
    
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Degree"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            error={Boolean(errors.degree)}
            helperText={errors.degree}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Institution Name"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            error={Boolean(errors.institution)}
            helperText={errors.institution}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Location (City, State/Country)"
            name="location"
            value={formData.location}
            onChange={handleChange}
            error={Boolean(errors.location)}
            helperText={errors.location}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Graduation Date"
            name="graduationDate"
            type="month"
            value={formData.graduationDate}
            onChange={handleChange}
            error={Boolean(errors.graduationDate)}
            helperText={errors.graduationDate}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            minRows={2}
            label="Honors, Relevant Coursework, or GPA (Optional)"
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="outlined" onClick={handleAddEducation}>
            Add Education Entry
          </Button>
          {errors.form && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {errors.form}
            </Typography>
          )}
        </Grid>

        {educationList.length > 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Added Education Entries
              </Typography>
              <List>
                {educationList.map((edu, index) => (
                  <ListItem key={index} alignItems="flex-start">
                    <ListItemText
                      primary={`${edu.degree} — ${edu.institution}`}
                      secondary={
                        <>
                          <Typography variant="body2">{edu.location}</Typography>
                          <Typography variant="body2">
                            Graduated: {new Date(edu.graduationDate).toLocaleDateString('en-US', {
                              month: 'long',
                              year: 'numeric',
                            })}
                          </Typography>
                          {edu.additionalDetails && (
                            <Typography variant="body2">{edu.additionalDetails}</Typography>
                          )}
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => handleRemoveEducation(index)}>
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
            Submit Education
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EducationForm;
