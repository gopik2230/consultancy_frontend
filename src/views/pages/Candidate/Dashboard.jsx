import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Chip,
  Stack,
  Avatar,
  Divider,
  Paper,
  InputBase,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import { Business, LocationOn, AccessTime, AttachMoney, Search, Tune, BookmarkBorder, Share } from '@mui/icons-material';

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechNova',
    location: 'Remote',
    type: 'Full-Time',
    salary: '$80,000 - $100,000',
    posted: '2 days ago',
    skills: ['React', 'TypeScript', 'CSS']
  },
  {
    id: 2,
    title: 'Backend Engineer',
    company: 'CloudCore Inc.',
    location: 'San Francisco, CA',
    type: 'Contract',
    salary: '$60/hr',
    posted: '1 week ago',
    skills: ['Node.js', 'AWS', 'Python']
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'DesignHub',
    location: 'New York, NY',
    type: 'Part-Time',
    salary: '$45,000 - $60,000',
    posted: '3 days ago',
    skills: ['Figma', 'Sketch', 'User Research']
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'ScaleOps',
    location: 'Remote',
    type: 'Full-Time',
    salary: '$110,000 - $130,000',
    posted: 'Just now',
    skills: ['Docker', 'Kubernetes', 'CI/CD']
  },
  {
    id: 5,
    title: 'Data Scientist',
    company: 'Analytics Pro',
    location: 'Boston, MA',
    type: 'Full-Time',
    salary: '$95,000 - $120,000',
    posted: '5 days ago',
    skills: ['Python', 'Machine Learning', 'SQL']
  },
  {
    id: 6,
    title: 'Mobile Developer',
    company: 'AppWorks',
    location: 'Remote',
    type: 'Contract',
    salary: '$70/hr',
    posted: '1 day ago',
    skills: ['Flutter', 'Dart', 'Firebase']
  }
];

const Dashboard = () => {
  return (
    <Box
      sx={{
        mt: 0,
        px: { xs: 2, md: 4 },
        pb: 4,
        minHeight: '100vh'
      }}
    >
      <Box
        sx={{
          maxWidth: '1400px',
          mx: 'auto',

          px: { xs: 2, sm: 3 }
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            mb: 3,
            color: '#5E35B1',
            pt: 3,
            display: 'flex',
            alignItems: 'center',

            gap: 1
          }}
        >
          <Box
            sx={{
              width: '12px',
              height: '32px',
              backgroundColor: '#5E35B1',
              borderRadius: '4px'
            }}
          />
          Find Your Dream Job
        </Typography>

        {/* Search and Filter Bar */}
        <Paper
          component="form"
          sx={{
            py: 2,
            px: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 4,
            borderRadius: 3,
            boxShadow: 2,
            flexWrap: 'wrap',
            gap: 2,
            backgroundColor: 'white',
            minHeight: '72px' // ensures even height visually
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: 1,
              minWidth: '250px',
              flex: '1 1 300px'
            }}
          >
            <IconButton sx={{ p: '10px', color: '#5E35B1' }}>
              <Search />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search jobs, companies, keywords..."
              inputProps={{ 'aria-label': 'search jobs' }}
            />
          </Box>

          <Divider sx={{ height: 28, mx: 1 }} orientation="vertical" flexItem />

          <FormControl sx={{ minWidth: 140 }} size="small">
            <InputLabel>Job Type</InputLabel>
            <Select value="" label="Job Type" sx={{ borderRadius: 2 }}>
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="Full-Time">Full-Time</MenuItem>
              <MenuItem value="Part-Time">Part-Time</MenuItem>
              <MenuItem value="Contract">Contract</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 140 }} size="small">
            <InputLabel>Location</InputLabel>
            <Select value="" label="Location" sx={{ borderRadius: 2 }}>
              <MenuItem value="">All Locations</MenuItem>
              <MenuItem value="Remote">Remote</MenuItem>
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="Europe">Europe</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            sx={{
              ml: 'auto',
              px: 3,
              borderRadius: 2,
              backgroundColor: '#5E35B1',
              whiteSpace: 'nowrap',
              '&:hover': {
                backgroundColor: '#4527A0'
              }
            }}
          >
            Search
          </Button>
        </Paper>

        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={job.id} sx={{ display: 'flex' }}>
              <Card
                sx={{
                  borderRadius: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(94, 53, 177, 0.2)'
                  },
                  borderTop: '4px solid #5E35B1'
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" alignItems="center" spacing={2} mb={2}>
                      <Avatar
                        sx={{
                          bgcolor: '#EDE7F6',
                          width: 48,
                          height: 48,
                          color: '#5E35B1'
                        }}
                      >
                        <Business fontSize="medium" />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={600} color="#5E35B1">
                          {job.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {job.company}
                        </Typography>
                      </Box>
                    </Stack>
                    <IconButton
                      sx={{
                        color: '#5E35B1',
                        width: 40, // or 48 for a bigger button
                        height: 40,
                        borderRadius: '50%',
                        '&:hover': {
                          backgroundColor: '#ede7f6'
                        }
                      }}
                    >
                      <BookmarkBorder />
                    </IconButton>
                  </Stack>

                  <Stack
  direction="row"
  sx={{
    mb: 2,
    flexWrap: 'wrap',
    gap: 1,           // consistent spacing
    rowGap: 1,        // optional: consistent vertical spacing
    columnGap: 1      // optional: consistent horizontal spacing
  }}
>
  <Chip
    icon={<LocationOn fontSize="small" sx={{ color: '#5E35B1' }} />}
    label={job.location}
    size="small"
    variant="outlined"
    sx={{ color: '#5E35B1' }}
  />
  <Chip
    icon={<AccessTime fontSize="small" sx={{ color: '#5E35B1' }} />}
    label={job.type}
    size="small"
    sx={{
      backgroundColor: '#EDE7F6',
      color: '#5E35B1'
    }}
  />
  <Chip
    icon={<AttachMoney fontSize="small" sx={{ color: '#5E35B1' }} />}
    label={job.salary}
    size="small"
    sx={{ color: '#5E35B1' }}
  />
</Stack>


                  <Divider sx={{ my: 1, borderColor: '#EDE7F6' }} />

                  <Typography variant="caption" color="text.secondary">
                    Posted {job.posted}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" fontWeight={500} gutterBottom color="#5E35B1">
                      Key Skills:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {job.skills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderRadius: 1,
                            color: '#5E35B1',
                            borderColor: '#D1C4E9'
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      py: 1,
                      backgroundColor: '#5E35B1',
                      '&:hover': {
                        backgroundColor: '#4527A0'
                      }
                    }}
                  >
                    Apply Now
                  </Button>
                  <IconButton sx={{ color: '#5E35B1' }}>
                    <Share />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            sx={{
              px: 4,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              color: '#5E35B1',
              borderColor: '#5E35B1',
              '&:hover': {
                borderColor: '#4527A0',
                backgroundColor: '#EDE7F6'
              }
            }}
          >
            Load More Jobs
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
