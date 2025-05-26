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
  useTheme
} from '@mui/material';
import { CalendarMonth, AccessTime, Business, ArrowForward } from '@mui/icons-material';
import { motion } from 'framer-motion';

const InterviewsPage = () => {
  const theme = useTheme();
  
  // Enhanced sample data with more variety
  const interviews = [
    { 
      id: 1, 
      company: 'TechNova Solutions', 
      position: 'Senior Frontend Developer', 
      date: 'June 15, 2023', 
      time: '10:00 AM',
      type: 'Technical Round',
      status: 'Upcoming',
      avatar: '/static/images/avatar/1.jpg',
      duration: '60 mins'
    },
    { 
      id: 2, 
      company: 'CloudCore Systems', 
      position: 'DevOps Engineer', 
      date: 'June 20, 2023', 
      time: '2:30 PM',
      type: 'HR Interview',
      status: 'Scheduled',
      avatar: '/static/images/avatar/2.jpg',
      duration: '45 mins'
    },
    { 
      id: 3, 
      company: 'DataDyne Inc.', 
      position: 'Backend Engineer', 
      date: 'June 18, 2023', 
      time: '11:15 AM',
      type: 'Technical Screening',
      status: 'Completed',
      avatar: '/static/images/avatar/3.jpg',
      duration: '90 mins'
    },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Upcoming': return 'warning';
      case 'Scheduled': return 'info';
      case 'Completed': return 'success';
      default: return 'primary';
    }
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 },
      maxWidth: '1400px',
      mx: 'auto'
    }}>
      <Typography variant="h4" component="h1" sx={{ 
        mb: 4,
        fontWeight: 700,
        color: theme.palette.text.primary,
        textAlign: 'center'
      }}>
        Your Interviews
      </Typography>
      
      <Grid container spacing={3}>
        {interviews.map((interview, index) => (
          <Grid item xs={12} md={6} lg={4} key={interview.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card sx={{
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid',
                borderColor: theme.palette.divider,
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                  borderColor: theme.palette.primary.light
                }
              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Avatar 
                      src={interview.avatar} 
                      sx={{ 
                        width: 60, 
                        height: 60,
                        bgcolor: theme.palette.primary.light,
                        '& .MuiSvgIcon-root': { 
                          color: theme.palette.primary.main,
                          fontSize: '1.8rem'
                        }
                      }}
                    >
                      <Business />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600} noWrap>
                        {interview.position}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {interview.company}
                      </Typography>
                    </Box>
                  </Stack>

                  <Divider sx={{ 
                    my: 2,
                    borderColor: theme.palette.divider,
                    borderBottomWidth: 1
                  }} />

                  <Stack spacing={2} sx={{ mb: 3 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CalendarMonth fontSize="small" color="action" />
                      <Typography variant="body2" color="text.primary">
                        {interview.date}
                      </Typography>
                    </Stack>
                    
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AccessTime fontSize="small" color="action" />
                      <Typography variant="body2" color="text.primary">
                        {interview.time} • {interview.duration}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Chip
                      label={interview.type}
                      color="primary"
                      variant="filled"
                      size="small"
                      sx={{ 
                        fontWeight: 500,
                        borderRadius: 1
                      }}
                    />
                    <Chip
                      label={interview.status}
                      color={getStatusColor(interview.status)}
                      variant={interview.status === 'Completed' ? 'filled' : 'outlined'}
                      size="small"
                      sx={{ 
                        fontWeight: 500,
                        borderRadius: 1
                      }}
                    />
                  </Stack>
                </CardContent>

                <Box sx={{ 
                  px: 2, 
                  pb: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                
                  <Button 
                    variant="contained" 
                    endIcon={<ArrowForward />}
                    size="small"
                    sx={{
                      borderRadius: 2,
                      px: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      boxShadow: 'none',
                      '&:hover': {
                        boxShadow: `0 2px 8px ${theme.palette.primary.light}`
                      }
                    }}
                  >
                    Details
                  </Button>
                </Box>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {interviews.length === 0 && (
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
            height: '60vh',
            textAlign: 'center',
            p: 4,
            borderRadius: 3,
            backgroundColor: theme.palette.background.paper,
            border: `1px dashed ${theme.palette.divider}`
          }}>
            <Box sx={{ 
              width: 120, 
              height: 120, 
              borderRadius: '50%', 
              bgcolor: theme.palette.action.hover,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3
            }}>
              <CalendarMonth sx={{ 
                fontSize: 48, 
                color: theme.palette.text.secondary 
              }} />
            </Box>
            <Typography variant="h5" sx={{ 
              mb: 1.5,
              fontWeight: 600,
              color: theme.palette.text.primary
            }}>
              No interviews scheduled
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ 
              mb: 3,
              maxWidth: '400px'
            }}>
              You don't have any upcoming interviews. Start applying to jobs or check your application status.
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
    </Box>
  );
};

export default InterviewsPage;