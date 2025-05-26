import { 
  Box, 
  Typography, 
  Avatar, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText,
  Chip,
  Divider,
  Button,
  Stack,
  useTheme,
  Paper,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material';
import {
  Search,
  FilterList,
  MoreVert,
  Business,
  Schedule,
  ArrowForward
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const ProfileViewsPage = () => {
  const theme = useTheme();
  
  // Enhanced sample data
  const viewers = [
    { 
      id: 1, 
      name: 'Sarah Johnson', 
      position: 'Technical Recruiter',
      company: 'RecruitPro', 
      time: '2 hours ago',
      avatar: '/static/images/avatar/1.jpg',
      isHiring: true,
      mutualConnections: 3
    },
    { 
      id: 2, 
      name: 'Michael Chen', 
      position: 'HR Director',
      company: 'HireFast', 
      time: '1 day ago',
      avatar: '/static/images/avatar/2.jpg',
      isHiring: false,
      mutualConnections: 1
    },
    { 
      id: 3, 
      name: 'Emma Rodriguez', 
      position: 'Talent Acquisition',
      company: 'TechTalent', 
      time: '3 days ago',
      avatar: '/static/images/avatar/3.jpg',
      isHiring: true,
      mutualConnections: 5
    },
    { 
      id: 4, 
      name: 'David Kim', 
      position: 'Engineering Manager',
      company: 'DevSolutions', 
      time: '1 week ago',
      avatar: '/static/images/avatar/4.jpg',
      isHiring: false,
      mutualConnections: 2
    },
    { 
      id: 5, 
      name: 'Lisa Wong', 
      position: 'Head of Talent',
      company: 'GrowthHack', 
      time: '2 weeks ago',
      avatar: '/static/images/avatar/5.jpg',
      isHiring: true,
      mutualConnections: 0
    },
  ];

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 },
      maxWidth: '1200px',
      mx: 'auto'
    }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ 
          fontWeight: 700,
          color: theme.palette.text.primary,
        }}>
          Profile Views <Chip label="24" color="primary" size="small" sx={{ ml: 1 }} />
        </Typography>
        
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            variant="outlined"
            placeholder="Search viewers..."
            size="small"
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
            sx={{ width: 200 }}
          />
          
          <Button 
            variant="outlined" 
            startIcon={<FilterList />}
            sx={{
              borderRadius: 2,
              px: 2,
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Filters
          </Button>
        </Stack>
      </Stack>

      <Paper sx={{ 
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        overflow: 'hidden'
      }}>
        <List sx={{ 
          width: '100%', 
          bgcolor: 'background.paper',
          p: 0
        }}>
          {viewers.map((viewer, index) => (
            <motion.div
              key={viewer.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ListItem 
                sx={{ 
                  px: { xs: 2, md: 3 },
                  py: 2,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover
                  }
                }}
                secondaryAction={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton edge="end" aria-label="more">
                      <MoreVert />
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemAvatar>
                  <Avatar 
                    alt={viewer.name} 
                    src={viewer.avatar}
                    sx={{ 
                      width: 56, 
                      height: 56,
                      mr: 2,
                      border: `2px solid ${theme.palette.primary.light}`
                    }} 
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {viewer.name}
                      </Typography>
                      {viewer.isHiring && (
                        <Chip 
                          label="Hiring" 
                          color="success" 
                          size="small" 
                          variant="outlined"
                          sx={{ 
                            fontWeight: 500,
                            borderRadius: 1
                          }}
                        />
                      )}
                    </Stack>
                  }
                  secondary={
                    <>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0, sm: 2 }} alignItems={{ xs: 'flex-start', sm: 'center' }}>
                        <Typography variant="body2" color="text.primary">
                          {viewer.position} • {viewer.company}
                        </Typography>
                        {viewer.mutualConnections > 0 && (
                          <Typography variant="caption" color="text.secondary">
                            {viewer.mutualConnections} mutual connection{viewer.mutualConnections > 1 ? 's' : ''}
                          </Typography>
                        )}
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
                        <Schedule fontSize="small" color="action" sx={{ fontSize: 16 }} />
                        <Typography variant="caption" color="text.secondary">
                          Viewed {viewer.time}
                        </Typography>
                      </Stack>
                    </>
                  }
                  sx={{ my: 0 }}
                />
              </ListItem>
              {index < viewers.length - 1 && (
                <Divider variant="inset" component="li" sx={{ ml: { xs: 0, sm: 9 } }} />
              )}
            </motion.div>
          ))}
        </List>

        <Box sx={{ 
          p: 3, 
          display: 'flex', 
          justifyContent: 'center',
          borderTop: `1px solid ${theme.palette.divider}`
        }}>
          <Button 
            variant="outlined" 
            endIcon={<ArrowForward />}
            sx={{
              borderRadius: 2,
              px: 4,
              textTransform: 'none',
              fontWeight: 600
            }}
          >
            View All Profile Visitors
          </Button>
        </Box>
      </Paper>

      {viewers.length === 0 && (
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
              <Business sx={{ 
                fontSize: 48, 
                color: theme.palette.text.secondary 
              }} />
            </Box>
            <Typography variant="h5" sx={{ 
              mb: 1.5,
              fontWeight: 600,
              color: theme.palette.text.primary
            }}>
              No profile views yet
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ 
              mb: 3,
              maxWidth: '400px'
            }}>
              Your profile hasn't been viewed by recruiters yet. Try updating your profile with relevant skills and experience.
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
              Enhance My Profile
            </Button>
          </Box>
        </motion.div>
      )}
    </Box>
  );
};

export default ProfileViewsPage;