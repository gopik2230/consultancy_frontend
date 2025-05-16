import React from 'react';
import {
  Box,
  Button,
  Typography,
  Chip,
  Stack,
  Avatar,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Grid
} from '@mui/material';
import {
  LocationOn,
  AccessTime,
  AttachMoney,
  Work,
  ArrowBack,
  Description,
  People,
  School,
  Schedule
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const JobDetails = ({ job }) => {
  const navigate = useNavigate();

  // Sample job data structure (you'll replace this with data from your API)
  const sampleJob = {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechNova Solutions",
    logo: "TN", // or a URL to the company logo
    shortDescription: "We're looking for an experienced Frontend Developer to lead our UI development efforts and mentor junior team members.",
    fullDescription: `
      As a Senior Frontend Developer at TechNova, you'll be responsible for:
      - Developing and maintaining our core web applications using React and TypeScript
      - Leading the implementation of new features and improvements
      - Collaborating with UX designers to create intuitive user interfaces
      - Optimizing applications for maximum performance across devices
      - Mentoring junior developers and conducting code reviews
      
      Our ideal candidate has a strong eye for detail and passion for creating exceptional user experiences.
    `,
    requiredSkills: [
      { name: "React", level: "Expert" },
      { name: "TypeScript", level: "Advanced" },
      { name: "CSS/SASS", level: "Advanced" },
      { name: "Redux", level: "Intermediate" },
      { name: "Jest/Testing", level: "Intermediate" }
    ],
    experienceRequired: "5+ years of professional frontend development experience",
    location: "Remote (US time zones)",
    salaryRange: "$110,000 - $140,000 per year",
    benefits: [
      "Health, dental, and vision insurance",
      "401(k) with 4% matching",
      "Unlimited PTO",
      "Annual learning budget",
      "Flexible work hours"
    ],
    interviewProcess: [
      "Initial HR screening (30min)",
      "Technical interview (1hr)",
      "Take-home coding challenge",
      "System design interview (1hr)",
      "Final culture fit interview (45min)"
    ],
    jobType: "Full-Time",
    postedDate: "2023-05-15",
    applicationDeadline: "2023-06-15"
  };

  // Use the passed job prop or fallback to sample data
  const jobData = job || sampleJob;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3, color: '#5E35B1' }}
      >
        Back to jobs
      </Button>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        {/* Job Header */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="flex-start" sx={{ mb: 4 }}>
          <Avatar sx={{ 
            bgcolor: '#EDE7F6', 
            width: 80, 
            height: 80,
            color: '#5E35B1',
            fontSize: '2rem',
            fontWeight: 'bold'
          }}>
            {jobData.logo}
          </Avatar>
          
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" fontWeight="bold" color="#5E35B1" gutterBottom>
              {jobData.title}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {jobData.company}
            </Typography>
            
            <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
              <Chip
                icon={<LocationOn color="primary" />}
                label={jobData.location}
                variant="outlined"
                sx={{ color: '#5E35B1' }}
              />
              <Chip
                icon={<AccessTime color="primary" />}
                label={jobData.jobType}
                sx={{ backgroundColor: '#EDE7F6', color: '#5E35B1' }}
              />
              <Chip
                icon={<AttachMoney color="primary" />}
                label={jobData.salaryRange}
                sx={{ color: '#5E35B1' }}
              />
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Job Overview */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom color="#5E35B1">
            Job Overview
          </Typography>
          <Typography variant="body1" paragraph>
            {jobData.shortDescription}
          </Typography>
        </Box>

        {/* Full Description */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom color="#5E35B1">
            Detailed Job Description
          </Typography>
          <Typography whiteSpace="pre-line" paragraph>
            {jobData.fullDescription}
          </Typography>
        </Box>

        {/* Requirements Section */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            {/* Required Skills */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom color="#5E35B1">
                Required Skills
              </Typography>
              <List dense>
                {jobData.requiredSkills.map((skill, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <People color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${skill.name} (${skill.level})`}
                      primaryTypographyProps={{ variant: 'body1' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Experience */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom color="#5E35B1">
                Experience Requirements
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Work color="primary" />
                <Typography>{jobData.experienceRequired}</Typography>
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            {/* Interview Process */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom color="#5E35B1">
                Interview Process
              </Typography>
              <List>
                {jobData.interviewProcess.map((step, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Schedule color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Round ${index + 1}: ${step}`}
                      primaryTypographyProps={{ variant: 'body1' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Benefits */}
            {jobData.benefits && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom color="#5E35B1">
                  Benefits & Perks
                </Typography>
                <List dense>
                  {jobData.benefits.map((benefit, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <School color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={benefit} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Grid>
        </Grid>

        {/* Application Info */}
        <Box sx={{ mt: 3, p: 3, backgroundColor: '#EDE7F6', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom color="#5E35B1">
            📅 Posted on: {new Date(jobData.postedDate).toLocaleDateString()}
          </Typography>
          {jobData.applicationDeadline && (
            <Typography variant="h6" gutterBottom color="#5E35B1">
              ⏰ Application deadline: {new Date(jobData.applicationDeadline).toLocaleDateString()}
            </Typography>
          )}
        </Box>

        {/* Apply Button */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              px: 6,
              py: 2,
              fontSize: '1.1rem',
              backgroundColor: '#5E35B1',
              '&:hover': { backgroundColor: '#4527A0' }
            }}
          >
            Apply Now
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default JobDetails;