import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Chip,
  Stack,
  Avatar,
  Divider,
  IconButton
} from '@mui/material';
import { Bookmark, LocationOn, Business, Share, Delete } from '@mui/icons-material';

const SavedJobsPage = () => {
  // Enhanced sample data
  const savedJobs = [
    { 
      id: 1, 
      title: 'Senior Product Manager', 
      company: 'InnovateCo', 
      location: 'Remote', 
      salary: '$120,000 - $150,000',
      type: 'Full-time',
      posted: '2 days ago'
    },
    { 
      id: 2, 
      title: 'Data Scientist', 
      company: 'AnalyticsPro', 
      location: 'New York, NY', 
      salary: '$110,000 - $130,000',
      type: 'Full-time',
      posted: '1 week ago'
    },
    { 
      id: 3, 
      title: 'UX Designer', 
      company: 'DesignHub', 
      location: 'San Francisco, CA', 
      salary: '$95,000 - $115,000',
      type: 'Contract',
      posted: '3 days ago'
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
    

      {savedJobs.length > 0 ? (
        <Grid container spacing={3}>
          {savedJobs.map((job) => (
            <Grid item xs={12} sm={6} lg={4} key={job.id}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                }
              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Avatar 
                      sx={{ 
                        width: 48, 
                        height: 48,
                        bgcolor: 'primary.light',
                        color: 'primary.main'
                      }}
                    >
                      <Business />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {job.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {job.company}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip
                      icon={<LocationOn fontSize="small" />}
                      label={job.location}
                      size="small"
                      variant="outlined"
                      sx={{ color: 'text.secondary' }}
                    />
                    <Chip
                      label={job.type}
                      size="small"
                      color="primary"
                    />
                  </Stack>

                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <Box component="span" fontWeight={600}>Salary:</Box> {job.salary}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    Posted {job.posted}
                  </Typography>
                </CardContent>

                <Divider sx={{ mx: 2 }} />

                <Box sx={{ 
                  p: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Button 
                    variant="contained" 
                    size="small"
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      textTransform: 'none',
                      fontWeight: 600
                    }}
                  >
                    Apply Now
                  </Button>
                  <Stack direction="row" spacing={1}>
                    <IconButton size="small">
                      <Share fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <Delete fontSize="small" />
                    </IconButton>
                  </Stack>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '50vh',
          textAlign: 'center'
        }}>
          <Bookmark color="action" sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            You haven't saved any jobs yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Browse jobs and click the bookmark icon to save them for later
          </Typography>
          <Button variant="contained" size="large">
            Browse Jobs
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SavedJobsPage;