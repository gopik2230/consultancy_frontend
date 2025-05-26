import React, { useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { get } from 'utils/api';

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
  const navigate =useNavigate()
  useEffect(() => {
    getJobList()
  },[])

  const getJobList = async() => {
    try {
      const response = await get(`${import.meta.env.VITE_APP_BASE_URL}internal-job/list`)
      console.log("resposne ",response)
    } catch(err) {
      console.log("erro ",err)
    }
  }

  const [activeTab, setActiveTab] = React.useState('applied');
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
      <Card 
  sx={{ 
    mb: 4,
    borderRadius: 3,
    boxShadow: '0 8px 32px rgba(94, 53, 177, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '200px',
    display: 'flex',
    alignItems: 'center',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center 30%',
    color: 'white',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)'
    }
  }}
>
  <CardContent sx={{ 
    zIndex: 1, 
    width: '100%',
    p: 4,
    textShadow: '0 2px 4px rgba(0,0,0,0.5)'
  }}>
    <Typography 
      variant="h3" 
      fontWeight="bold" 
      gutterBottom
      sx={{
        fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
        color: 'white',
        lineHeight: 1.2,
        mb: 2
      }}
    >
      Welcome Back, Gopi! 👋
    </Typography>
    <Typography 
      variant="h5" 
      sx={{ 
        mb: 3, 
        fontWeight: 500,
        fontSize: { xs: '1.1rem', sm: '1.3rem' },
        color: 'rgba(255,255,255,0.95)',
        maxWidth: '600px'
      }}
    >
      Your dream career starts today with <span style={{ 
        fontWeight: 700, 
        color: 'white',
        textShadow: '0 2px 4px rgba(94, 53, 177, 0.7)'
      }}>Hirezo</span>
    </Typography>
    <Button 
      variant="contained" 
      size="large"
      sx={{ 
        backgroundColor: 'white', 
        color: '#5E35B1',
        borderRadius: 2,
        px: 4,
        py: 1.5,
        fontWeight: 700,
        fontSize: '1rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        '&:hover': {
          backgroundColor: '#EDE7F6',
          boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
          transform: 'translateY(-2px)'
        },
        transition: 'all 0.3s ease'
      }}
    >
      Complete Your Profile →
    </Button>
  </CardContent>
</Card>
   <Box 
          sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 4,
            flexWrap: 'wrap',
            '& > *': {
              flex: '1 1 200px'
            }
          }}
        >
          {[
            { id: 'applied', label: 'Applied Jobs', value: '1/3' },
            { id: 'saved', label: 'Saved Jobs', value: '12' },
            { id: 'interviews', label: 'My Interviews', value: '1/5' },
            { id: 'views', label: 'Profile Views', value: '24' }
          ].map((tab) => (
            <Paper 
              key={tab.id}
              elevation={0}
              onClick={() => setActiveTab(tab.id)}
              sx={{
                p: 2,
                borderRadius: 2,
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 
                  'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(8px)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 20px rgba(94, 53, 177, 0.1)'
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: activeTab === tab.id ? '4px' : '0px',
                  background: 'linear-gradient(90deg, #5E35B1 0%, #4527A0 100%)',
                  transition: 'height 0.3s ease'
                }
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {tab.label}
              </Typography>
              <Typography variant="h5" fontWeight="bold" color="#5E35B1">
                {tab.value}
              </Typography>
              {activeTab === tab.id && (
                <Box 
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    backgroundColor: '#5E35B1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.75rem'
                  }}
                >
                  ✓
                </Box>
              )}
            </Paper>
          ))}
        </Box>
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
            <Grid item xs={12} sm={6} md={4} lg={4} key={job.id} sx={{ display: 'flex' }} >
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
                onClick={()=>{
              navigate("/candidate/jobDetails/1")
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
