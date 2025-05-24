import { 
  Box, 
  Typography, 
  Card, 
  Stack, 
  Chip, 
  Button, 
  Avatar,
  Divider,
  Grid,
  Paper,
  Tooltip,
  LinearProgress
} from '@mui/material';
import { 
  Business, 
  CalendarToday, 
  CheckCircle, 
  Schedule, 
  Visibility, 
  ArrowForward,
  PendingActions
} from '@mui/icons-material';

const AppliedJobsPage = () => {
  // Enhanced sample data with status types and progress
  const appliedJobs = [
    { 
      id: 1, 
      title: 'Senior Frontend Developer', 
      company: 'TechCorp', 
      status: 'In Review', 
      appliedDate: 'May 15, 2023',
      progress: 40,
      type: 'Full-time',
      logo: '/static/images/avatar/1.jpg'
    },
    { 
      id: 2, 
      title: 'UX Designer', 
      company: 'DesignHub', 
      status: 'Interview Scheduled', 
      appliedDate: 'May 20, 2023',
      progress: 70,
      type: 'Contract',
      logo: '/static/images/avatar/2.jpg'
    },
    { 
      id: 3, 
      title: 'Backend Engineer', 
      company: 'DataSystems', 
      status: 'Application Viewed', 
      appliedDate: 'May 5, 2023',
      progress: 20,
      type: 'Full-time',
      logo: '/static/images/avatar/3.jpg'
    },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Interview Scheduled': return 'success';
      case 'In Review': return 'warning';
      case 'Application Viewed': return 'info';
      default: return 'primary';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Interview Scheduled': return <CheckCircle fontSize="small" />;
      case 'In Review': return <PendingActions fontSize="small" />;
      case 'Application Viewed': return <Visibility fontSize="small" />;
      default: return <Schedule fontSize="small" />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ 
        mb: 3,
        fontWeight: 700,
        color: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <PendingActions fontSize="large" />
        Applied Jobs ({appliedJobs.length})
      </Typography>

      <Grid container spacing={3}>
        {appliedJobs.map((job) => (
          <Grid item xs={12} key={job.id}>
            <Paper elevation={2} sx={{ 
              borderRadius: 3,
              overflow: 'hidden',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 4
              }
            }}>
              {/* Progress bar */}
              <LinearProgress 
                variant="determinate" 
                value={job.progress} 
                sx={{ 
                  height: 6,
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: getStatusColor(job.status) === 'success' ? 
                      'success.main' : 
                      getStatusColor(job.status) === 'warning' ? 
                      'warning.main' : 
                      'info.main'
                  }
                }} 
              />

              <Box sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar 
                    src={job.logo} 
                    sx={{ 
                      width: 56, 
                      height: 56,
                      bgcolor: 'primary.light',
                      '& .MuiSvgIcon-root': { color: 'primary.main' }
                    }}
                  >
                    <Business />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={600}>
                      {job.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {job.company}
                    </Typography>
                  </Box>
                  <Chip
                    label={job.type}
                    color="primary"
                    size="small"
                    sx={{ alignSelf: 'flex-start' }}
                  />
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2}>
                      <Chip
                        icon={getStatusIcon(job.status)}
                        label={job.status}
                        color={getStatusColor(job.status)}
                        variant="filled"
                        sx={{ fontWeight: 600 }}
                      />
                      <Chip
                        icon={<CalendarToday fontSize="small" />}
                        label={`Applied: ${job.appliedDate}`}
                        variant="outlined"
                        sx={{ color: 'text.secondary' }}
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: { xs: 'flex-start', md: 'flex-end' },
                      gap: 2
                    }}>
                      <Tooltip title="View application details">
                        <Button 
                          variant="outlined" 
                          startIcon={<Visibility />}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 600
                          }}
                        >
                          Details
                        </Button>
                      </Tooltip>
                      <Button 
                        variant="contained" 
                        endIcon={<ArrowForward />}
                        sx={{
                          borderRadius: 2,
                          px: 3,
                          textTransform: 'none',
                          fontWeight: 600
                        }}
                      >
                        Track Application
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {appliedJobs.length === 0 && (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '50vh',
          textAlign: 'center'
        }}>
          <PendingActions sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No applications submitted yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Browse jobs and submit your first application
          </Typography>
          <Button variant="contained" size="large">
            Find Jobs
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AppliedJobsPage;