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

const CertificationsForm = () => {
  const [formData, setFormData] = useState({
    certificationName: '',
    issuingOrganization: '',
    obtainedDate: '',
    expirationDate: '',
  });

  const [certificationList, setCertificationList] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.certificationName.trim()) newErrors.certificationName = 'Certification name is required';
    if (!formData.issuingOrganization.trim()) newErrors.issuingOrganization = 'Issuing organization is required';
    if (!formData.obtainedDate.trim()) newErrors.obtainedDate = 'Obtained date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCertification = () => {
    if (validate()) {
      setCertificationList(prev => [...prev, { ...formData }]); // create a shallow copy
      setFormData({
        certificationName: '',
        issuingOrganization: '',
        obtainedDate: '',
        expirationDate: '',
      });
      setErrors({});
    }
  };

  const handleRemoveCertification = (index) => {
    setCertificationList(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (certificationList.length === 0) {
      setErrors({ form: 'Please add at least one certification entry.' });
      return;
    }

    console.log('Submitted Certification List:', certificationList);
    // Submit logic here (e.g., send to backend)
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
     

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Certification Name"
            name="certificationName"
            value={formData.certificationName}
            onChange={handleChange}
            error={Boolean(errors.certificationName)}
            helperText={errors.certificationName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Issuing Organization"
            name="issuingOrganization"
            value={formData.issuingOrganization}
            onChange={handleChange}
            error={Boolean(errors.issuingOrganization)}
            helperText={errors.issuingOrganization}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Date Obtained"
            name="obtainedDate"
            type="month"
            value={formData.obtainedDate}
            onChange={handleChange}
            error={Boolean(errors.obtainedDate)}
            helperText={errors.obtainedDate}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Expiration Date (if applicable)"
            name="expirationDate"
            type="month"
            value={formData.expirationDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="outlined" onClick={handleAddCertification}>
            Add Certification Entry
          </Button>
          {errors.form && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {errors.form}
            </Typography>
          )}
        </Grid>

        {certificationList.length > 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Added Certifications
              </Typography>
              <List>
                {certificationList.map((cert, index) => (
                  <ListItem key={index} alignItems="flex-start">
                    <ListItemText
                      primary={`${cert.certificationName} — ${cert.issuingOrganization}`}
                      secondary={
                        <>
                          <Typography variant="body2">
                            Obtained: {new Date(cert.obtainedDate).toLocaleDateString('en-US', {
                              month: 'long',
                              year: 'numeric',
                            })}
                          </Typography>
                          {cert.expirationDate && (
                            <Typography variant="body2">
                              Expiration: {new Date(cert.expirationDate).toLocaleDateString('en-US', {
                                month: 'long',
                                year: 'numeric',
                              })}
                            </Typography>
                          )}
                        </>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => handleRemoveCertification(index)}>
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
            Submit Certifications
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CertificationsForm;
