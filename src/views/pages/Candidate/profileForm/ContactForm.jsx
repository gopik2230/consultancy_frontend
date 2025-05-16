import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  InputAdornment
} from '@mui/material';
import { Email, Phone, LinkedIn, LocationOn, Person } from '@mui/icons-material'; // Import Material UI Icons

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    linkedIn: '',
    location: ''
  });

  const [errors, setErrors] = useState({
    fullName: '',
    phone: '',
    email: '',
    linkedIn: '',
    location: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({
        ...errors,
        [name]: ''
      });
  
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let valid = true;
    let newErrors = { fullName: '', phone: '', email: '', linkedIn: '', location: '' };

    // Full Name
    if (!formData.fullName) {
      newErrors.fullName = 'Full Name is required';
      valid = false;
    }

    // Phone
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!/^\+?[0-9\s\-()]{7,15}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid phone number';
      valid = false;
    }

    // Email
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
      valid = false;
    }

    // LinkedIn (Optional but validate if entered)
    if (formData.linkedIn && !/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/.test(formData.linkedIn)) {
      newErrors.linkedIn = 'Enter a valid LinkedIn URL';
      valid = false;
    }

    // Location
    if (!formData.location) {
      newErrors.location = 'Location is required';
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
      
      <Grid container spacing={4} > {/* Increased spacing to 3 for more gap between TextFields */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={Boolean(errors.fullName)}
            helperText={errors.fullName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: '#5E57C9' }} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone sx={{ color: '#5E57C9' }} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: '#5E57C9' }} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="LinkedIn Profile (optional)"
            name="linkedIn"
            value={formData.linkedIn}
            onChange={handleChange}
            error={Boolean(errors.linkedIn)}
            helperText={errors.linkedIn}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkedIn sx={{ color: '#5E57C9' }} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Location (City, State/Country)"
            name="location"
            value={formData.location}
            onChange={handleChange}
            error={Boolean(errors.location)}
            helperText={errors.location}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOn sx={{ color: '#5E57C9' }} />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            Save Contact Info
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactForm;
