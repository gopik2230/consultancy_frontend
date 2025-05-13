import React, { useState } from 'react';
import { Avatar, Box, Grid, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import ContactForm from './profileForm/ContactForm';
import ProfessionalSummaryForm from './profileForm/ProfessionalSummaryForm';
import CoreCompetenciesForm from './profileForm/CoreCompetenciesForm';
import ProfessionalExperienceForm from './profileForm/ProfessionalExperienceForm';
import EducationForm from './profileForm/EducationForm';
import CertificationsForm from './profileForm/CertificationForm';
import ProjectsForm from './profileForm/ProjectsForm';
import AdditionalSectionsForm from './profileForm/AdditionalSectionsForm';

const sections = {
  contact: 'Contact Information',
  professinal: 'Professional Summary',
  skills: 'Core Competencies',
  experience: 'Professional Experience',
  education: 'Education',
  certification: 'Certification',
  project: 'Projects',
  additionalSections: 'Additional Sections'
};

const Profile = () => {
  const [selectedSection, setSelectedSection] = useState('contact');

  const renderContent = () => {
    switch (selectedSection) {
      case 'contact':
        return <ContactForm />;
      case 'professinal':
        return <ProfessionalSummaryForm />;
      case 'skills':
        return <CoreCompetenciesForm />;
      case 'experience':
        return <ProfessionalExperienceForm />;

      case 'education':
        return <EducationForm />;
      case 'experience':
        return <ProfessionalExperienceForm />;
      case 'certification':
        return <CertificationsForm />;
      case 'project':
        return <ProjectsForm />;
      case 'additionalSections':
        return <AdditionalSectionsForm />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: '70vh', display: 'flex', flexDirection: 'column' }}>
      {/* Main Grid Container */}
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
              <Avatar src="https://via.placeholder.com/100" alt="Candidate" sx={{ width: 80, height: 80, mb: 1 }} />
              <Typography variant="subtitle1">Candidate Name</Typography>
            </Box>
            <List>
              {Object.entries(sections).map(([key, label]) => (
                <ListItem key={key} disablePadding sx={{ mb: 1, borderRadius: 2, overflow: 'hidden' }}>
                  <ListItemButton
                    selected={selectedSection === key}
                    onClick={() => setSelectedSection(key)}
                    sx={{
                      borderRadius: 2,
                      padding: '8px 16px', // optional, for spacing inside the button
                      backgroundColor: selectedSection === key ? 'primary.main' : 'transparent',
                
                      '&:hover': {
                        backgroundColor: 'primary.light' // Hover effect
                      }
                    }}
                  >
                    <ListItemText primary={label} sx={{
                              color: selectedSection === key ? '#5E35B1' : 'black', // Custom color when selected
                    }}/>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h5" gutterBottom>
              {sections[selectedSection]}
            </Typography>
            {renderContent()}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
