import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  Button,
  Avatar,
  Divider,
  Grid,
  useTheme,
  Paper,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Pagination
} from '@mui/material';
import {
  Search,
  FilterList,
  Business,
  Work,
  CheckCircle,
  Pending,
  Cancel,
  Schedule,
  ArrowForward,
  Add,
  AccessTime
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import React from 'react';

const TrackApplicationsPage = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = React.useState(0);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [page, setPage] = React.useState(1);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1); // Reset to first page when changing tabs
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page when searching
  };

  // Sample application data with more details
  const applications = [
    {
      id: 1,
      company: 'TechNova Solutions',
      position: 'Senior Frontend Developer',
      appliedDate: 'May 15, 2023',
      status: 'Interview',
      stage: 'Technical Round',
      location: 'San Francisco, CA (Remote)',
      salary: '$120,000 - $140,000',
      type: 'Full-time',
      avatar: '/static/images/avatar/1.jpg',
      lastUpdate: '2 days ago',
      progress: 75
    },
    {
      id: 2,
      company: 'CloudCore Systems',
      position: 'DevOps Engineer',
      appliedDate: 'May 18, 2023',
      status: 'Applied',
      stage: 'Application Review',
      location: 'New York, NY (Hybrid)',
      salary: '$110,000 - $130,000',
      type: 'Full-time',
      avatar: '/static/images/avatar/2.jpg',
      lastUpdate: '1 week ago',
      progress: 25
    },
    {
      id: 3,
      company: 'DataDyne Inc.',
      position: 'Backend Engineer',
      appliedDate: 'May 10, 2023',
      status: 'Rejected',
      stage: 'Final Round',
      location: 'Austin, TX (On-site)',
      salary: '$105,000 - $125,000',
      type: 'Full-time',
      avatar: '/static/images/avatar/3.jpg',
      lastUpdate: '3 days ago',
      progress: 90
    },
    {
      id: 4,
      company: 'Quantum Innovations',
      position: 'Machine Learning Engineer',
      appliedDate: 'May 22, 2023',
      status: 'Offer',
      stage: 'Negotiation',
      location: 'Boston, MA (Remote)',
      salary: '$130,000 - $150,000',
      type: 'Full-time',
      avatar: '/static/images/avatar/4.jpg',
      lastUpdate: 'Yesterday',
      progress: 100
    },
    {
      id: 5,
      company: 'PixelCraft Studios',
      position: 'UI/UX Designer',
      appliedDate: 'May 5, 2023',
      status: 'Interview',
      stage: 'Design Challenge',
      location: 'Seattle, WA (Hybrid)',
      salary: '$95,000 - $115,000',
      type: 'Contract',
      avatar: '/static/images/avatar/5.jpg',
      lastUpdate: '5 days ago',
      progress: 60
    },
    {
      id: 6,
      company: 'GreenTech Solutions',
      position: 'Sustainability Analyst',
      appliedDate: 'May 20, 2023',
      status: 'Applied',
      stage: 'Application Review',
      location: 'Portland, OR (On-site)',
      salary: '$85,000 - $100,000',
      type: 'Full-time',
      avatar: '/static/images/avatar/6.jpg',
      lastUpdate: 'Today',
      progress: 10
    },
  ];

  // Filter applications based on tab and search term
  const filteredApplications = applications.filter(app => {
    // Filter by tab
    let tabMatch = true;
    if (tabValue === 1) tabMatch = app.status === 'Applied';
    if (tabValue === 2) tabMatch = app.status === 'Interview';
    if (tabValue === 3) tabMatch = app.status === 'Offer';
    if (tabValue === 4) tabMatch = app.status === 'Rejected';
    
    // Filter by search term
    const searchMatch = 
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return tabMatch && searchMatch;
  });

  // Pagination
  const itemsPerPage = 4;
  const pageCount = Math.ceil(filteredApplications.length / itemsPerPage);
  const paginatedApplications = filteredApplications.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'Applied': return 'info';
      case 'Interview': return 'warning';
      case 'Offer': return 'success';
      case 'Rejected': return 'error';
      default: return 'primary';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Applied': return <Pending color="info" />;
      case 'Interview': return <Schedule color="warning" />;
      case 'Offer': return <CheckCircle color="success" />;
      case 'Rejected': return <Cancel color="error" />;
      default: return <Work color="primary" />;
    }
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 },
      maxWidth: '1400px',
      mx: 'auto'
    }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ 
          fontWeight: 700,
          color: theme.palette.text.primary,
        }}>
          Track Applications
        </Typography>
        
        <Button 
          variant="contained" 
          startIcon={<Add />}
          sx={{
            borderRadius: 2,
            px: 3,
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: `0 2px 8px ${theme.palette.primary.light}`
            }
          }}
        >
          Add Application
        </Button>
      </Stack>

      {/* Search and Filter Bar */}
      <Paper sx={{ 
        p: 2, 
        mb: 3,
        borderRadius: 2,
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper
              }
            }}
          />
          
          <Button 
            variant="outlined" 
            startIcon={<FilterList />}
            sx={{
              borderRadius: 2,
              px: 3,
              textTransform: 'none',
              fontWeight: 500,
              minWidth: { xs: '100%', md: 'auto' }
            }}
          >
            Filters
          </Button>
        </Stack>
      </Paper>

      {/* Status Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <Tab label="All" icon={<Work fontSize="small" />} iconPosition="start" />
          <Tab label="Applied" icon={<Pending fontSize="small" />} iconPosition="start" />
          <Tab label="Interview" icon={<Schedule fontSize="small" />} iconPosition="start" />
          <Tab label="Offer" icon={<CheckCircle fontSize="small" />} iconPosition="start" />
          <Tab label="Rejected" icon={<Cancel fontSize="small" />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* Application Cards */}
      {paginatedApplications.length > 0 ? (
        <Grid container spacing={3}>
          {paginatedApplications.map((application, index) => (
            <Grid item xs={12} key={application.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card sx={{
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                    borderColor: theme.palette.primary.light
                  }
                }}>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                      <Avatar 
                        src={application.avatar} 
                        sx={{ 
                          width: 56, 
                          height: 56,
                          bgcolor: theme.palette.primary.light,
                          '& .MuiSvgIcon-root': { 
                            color: theme.palette.primary.main,
                            fontSize: '1.8rem'
                          }
                        }}
                      >
                        <Business />
                      </Avatar>
                      
                      <Box sx={{ flexGrow: 1 }}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={1}>
                          <Box>
                            <Typography variant="h6" fontWeight={600}>
                              {application.position}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                              {application.company} • {application.location}
                            </Typography>
                          </Box>
                          
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Chip
                              label={application.status}
                              color={getStatusColor(application.status)}
                              icon={getStatusIcon(application.status)}
                              variant="outlined"
                              size="small"
                              sx={{ 
                                fontWeight: 500,
                                borderRadius: 1
                              }}
                            />
                            <Chip
                              label={application.type}
                              color="default"
                              variant="outlined"
                              size="small"
                              sx={{ 
                                fontWeight: 500,
                                borderRadius: 1
                              }}
                            />
                          </Stack>
                        </Stack>
                        
                        <Box sx={{ mt: 2, mb: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={application.progress} 
                            color={
                              application.status === 'Rejected' ? 'error' : 
                              application.status === 'Offer' ? 'success' : 'primary'
                            } 
                            sx={{ 
                              height: 6, 
                              borderRadius: 3 
                            }} 
                          />
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                            {application.stage} • Applied on {application.appliedDate} • Updated {application.lastUpdate}
                          </Typography>
                        </Box>
                        
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                          <Typography variant="body2" color="text.primary" fontWeight={500}>
                            {application.salary}
                          </Typography>
                          
                          <Button 
                            variant="text" 
                            endIcon={<ArrowForward />}
                            size="small"
                            sx={{
                              textTransform: 'none',
                              fontWeight: 600,
                            }}
                          >
                            View Details
                          </Button>
                        </Stack>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '50vh',
            textAlign: 'center',
            p: 4,
            borderRadius: 3,
            backgroundColor: theme.palette.background.paper,
            border: `1px dashed ${theme.palette.divider}`
          }}>
            <Box sx={{ 
              width: 100, 
              height: 100, 
              borderRadius: '50%', 
              bgcolor: theme.palette.action.hover,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3
            }}>
              <Work sx={{ 
                fontSize: 48, 
                color: theme.palette.text.secondary 
              }} />
            </Box>
            <Typography variant="h5" sx={{ 
              mb: 1.5,
              fontWeight: 600,
              color: theme.palette.text.primary
            }}>
              No applications found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ 
              mb: 3,
              maxWidth: '400px'
            }}>
              {tabValue === 0 
                ? "You haven't applied to any jobs yet. Start your job search today!" 
                : tabValue === 1 
                  ? "No applications in this status. Check your other categories." 
                  : tabValue === 2 
                    ? "No interviews scheduled yet. Keep applying!" 
                    : tabValue === 3 
                      ? "No offers yet. Your perfect opportunity is coming!" 
                      : "No rejected applications. That's great!"}
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              sx={{
                borderRadius: 2,
                px: 4,
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Browse Jobs
            </Button>
          </Box>
        </motion.div>
      )}

      {/* Pagination */}
      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: 1
              }
            }}
          />
        </Box>
      )}

      {/* Stats Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
          Application Statistics
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Applications
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {applications.length}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
                  <Work color="primary" />
                </Avatar>
              </Stack>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Interview Rate
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                   {applications.length > 0 
  ? Math.round((applications.filter(a => a.status === 'Interview').length / applications.length) * 100) 
  : 0}

                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: theme.palette.warning.light }}>
                  <Schedule color="warning" />
                </Avatar>
              </Stack>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Offer Rate
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                 {Math.round((applications.filter(a => a.status === 'Offer').length / applications.length) * 100 || 0)}%

                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: theme.palette.success.light }}>
                  <CheckCircle color="success" />
                </Avatar>
              </Stack>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Avg. Response Time
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    5 days
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: theme.palette.info.light }}>
                  <AccessTime color="info" />
                </Avatar>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TrackApplicationsPage;