import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';

const ProfessionalSummaryForm = () => {
  const [formData, setFormData] = useState({
    summaryType: 'professionalSummary', // Default to Professional Summary
    summaryText: '',
  });

  const [errors, setErrors] = useState({
    summaryText: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear the error message when the user starts typing
    setErrors({
      ...errors,
      summaryText: ''
    });
  };

  const validate = () => {
    let valid = true;
    let newErrors = { summaryText: '' };

    // Professional Summary / Objective validation
    if (!formData.summaryText.trim()) {
      newErrors.summaryText = 'Please provide your Professional Summary or Objective.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form Submitted:', formData);
      // Handle form submission (e.g., save to state or backend)
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        {/* Dropdown for selecting Professional Summary or Objective */}
        <Grid item xs={12}>
          <FormControl fullWidth error={Boolean(errors.summaryText)}>
            <InputLabel>Summary Type</InputLabel>
            <Select
              label="Summary Type"
              name="summaryType"
              value={formData.summaryType}
              onChange={handleChange}
            >
              <MenuItem value="professionalSummary">Professional Summary</MenuItem>
              <MenuItem value="objectiveStatement">Objective Statement</MenuItem>
            </Select>
            <FormHelperText>{errors.summaryText}</FormHelperText>
          </FormControl>
        </Grid>

        {/* Textfield for entering the Professional Summary or Objective */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label={formData.summaryType === 'professionalSummary' ? 'Professional Summary' : 'Objective Statement'}
            name="summaryText"
            value={formData.summaryText}
            onChange={handleChange}
            error={Boolean(errors.summaryText)}
            helperText={errors.summaryText}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            Save Summary/Objective
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfessionalSummaryForm;
