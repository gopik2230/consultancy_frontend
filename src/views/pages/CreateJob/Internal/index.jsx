// material-ui
import {
    Box,
    Typography,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Chip,
    IconButton,
    Skeleton,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@mui/material';
import { useState, useEffect } from 'react';
import { get } from 'utils/api';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow, format } from 'date-fns';
import useToast from 'ui-component/Toast';
import MainCard from 'ui-component/cards/MainCard';

const InternalJobList = () => {
    const [jobList, setJobList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentJob, setCurrentJob] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogConfig, setDialogConfig] = useState({});
    const navigate = useNavigate();
    const showToast = useToast();

    const getJobs = async (pageNum) => {
        setLoading(true);
        try {
            const response = await get(`${import.meta.env.VITE_APP_BASE_URL}internal-job/list?page=${pageNum}&limit=5`);
            setJobList(response?.data?.jobs || []);
            setHasMore(response?.data?.pagination?.hasMore);
            setPage(pageNum);
        } catch (error) {
            console.error("Error fetching jobs:", error);
            showToast(error?.response?.data?.message || 'Failed to fetch jobs', 'error');
            if (error.response?.status === 401) {
                localStorage.removeItem('token'); // Clear expired token
                window.location.href = '/login'; // Redirect to login
              }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getJobs(1);
    }, []);

    const handleMenuClick = (event, job) => {
        setAnchorEl(event.currentTarget);
        setCurrentJob(job);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setCurrentJob(null);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setDialogConfig({});
    };

    const handleActionConfirm = async () => {
        if (!currentJob) return;

        try {
            let endpoint = '';
            let payload = {};

            if (dialogConfig.action === 'pause') {
                endpoint = 'pause';
                payload = { status: 'paused' };
            } else if (dialogConfig.action === 'resume') {
                endpoint = 'resume';
                payload = { status: 'open' };
            } else if (dialogConfig.action === 'remove') {
                endpoint = 'remove';
            }

            const response = await axios.put(
                `${import.meta.env.VITE_APP_BASE_URL}internal/job/${currentJob.id}/${endpoint}`,
                payload
            );

            showToast(response?.data?.message, 'success');
            getJobs(page); // Refresh the job list
        } catch (error) {
            showToast(error?.response?.data?.message || 'Action failed', 'error');
        } finally {
            handleDialogClose();
            handleMenuClose();
        }
    };

    const openActionDialog = (action) => {
        let title = '';
        let description = '';

        switch (action) {
            case 'pause':
                title = 'Do you want to pause this job?';
                description = 'You can resume this job anytime.';
                break;
            case 'resume':
                title = 'Do you want to resume this job?';
                description = 'This will make the job active again.';
                break;
            case 'remove':
                title = 'Do you want to remove this job?';
                description = 'This action cannot be undone.';
                break;
            default:
                return;
        }

        setDialogConfig({
            action,
            title,
            description
        });
        setDialogOpen(true);
    };

    const getStatusChip = (status) => {
        let color = '';
        let bgColor = '';

        switch (status?.toLowerCase()) {
            case 'open':
                color = 'success.dark';
                bgColor = 'success.light';
                break;
            case 'paused':
                color = 'warning.dark';
                bgColor = 'warning.light';
                break;
            case 'closed':
                color = 'error.dark';
                bgColor = 'error.light';
                break;
            default:
                color = 'default.dark';
                bgColor = 'default.light';
        }

        return (
            <Chip
                label={status}
                sx={{
                    color: color,
                    backgroundColor: bgColor,
                    fontWeight: 'bold'
                }}
            />
        );
    };

    const handleEdit = (jobId) => {
        navigate(`/jobPost/internal/edit-job/${jobId}`);
        handleMenuClose();
    };

    const handleLoadMore = () => {
        if (hasMore && !loading) {
          getJobs(page + 1);
        }
    };

    const formatPostedDate = (dateString) => {
        if (!dateString) return '-';

        try {
            const date = new Date(dateString);
            return (
                <Box display="flex" flexDirection="column">
                    <Typography variant="body2">
                        {formatDistanceToNow(date, { addSuffix: true })}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        {format(date, 'MMM d, yyyy')}
                    </Typography>
                </Box>
            );
        } catch (error) {
            console.error('Error formatting date:', error);
            return '-';
        }
    };

    // Skeleton rows for loading state
    const skeletonRows = Array(5).fill(0).map((_, index) => (
        <TableRow key={`skeleton-${index}`}>
            <TableCell><Skeleton variant="text" width="80%" /></TableCell>
            <TableCell><Skeleton variant="text" width="60%" /></TableCell>
            <TableCell>
                <Box display="flex" flexDirection="column">
                    <Skeleton variant="text" width="70%" />
                    <Skeleton variant="text" width="50%" />
                </Box>
            </TableCell>
            <TableCell><Skeleton variant="rounded" width={80} height={24} /></TableCell>
            <TableCell><Skeleton variant="circular" width={40} height={40} /></TableCell>
        </TableRow>
    ));

    return (
        <MainCard title="Internal Job List">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Job Title</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Posted</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ? (
                        skeletonRows
                    ) : jobList.length > 0 ? (
                        jobList.map((job) => (
                            <TableRow key={job._id || job.id}>
                                <TableCell>{job.job_title || '-'}</TableCell>
                                <TableCell>{job.location || '-'}</TableCell>
                                <TableCell>{formatPostedDate(job.updatedAt)}</TableCell>
                                <TableCell>{getStatusChip(job.job_status)}</TableCell>
                                <TableCell>
                                    <IconButton
                                        aria-label="more"
                                        aria-controls={`job-menu-${job.id}`}
                                        aria-haspopup="true"
                                        onClick={(e) => handleMenuClick(e, job)}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>

                                    <Menu
                                        id={`job-menu-${job.id}`}
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl && currentJob?.id === job.id)}
                                        onClose={handleMenuClose}
                                    >
                                        <MenuItem onClick={() => handleEdit(job.id)}>Edit</MenuItem>
                                        {job.job_status?.toLowerCase() === 'open' ? (
                                            <MenuItem onClick={() => openActionDialog('pause')}>Pause Job</MenuItem>
                                        ) : job.job_status?.toLowerCase() === 'paused' ? (
                                            <MenuItem onClick={() => openActionDialog('resume')}>Resume Job</MenuItem>
                                        ) : null}
                                        <MenuItem onClick={() => openActionDialog('remove')}>Remove Job</MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} align="center">
                                No jobs found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Confirmation Dialog */}
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: '12px',
                        padding: '16px'
                    }
                }}
            >
                <DialogTitle
                    id="alert-dialog-title"
                    sx={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        padding: '16px 24px 8px 24px',
                        color: 'text.primary'
                    }}
                >
                    {dialogConfig.title}
                </DialogTitle>
                <DialogContent sx={{ padding: '8px 24px 16px 24px' }}>
                    <DialogContentText
                        id="alert-dialog-description"
                        sx={{
                            fontSize: '1rem',
                            color: 'text.secondary'
                        }}
                    >
                        {dialogConfig.description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ padding: '16px 24px' }}>
                    <Box sx={{display:"flex", justifyContent:"space-between", width:"100%"}}>
                        <Button
                            onClick={handleDialogClose}
                            variant="contained"
                            color="error"
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                borderRadius: '8px',
                                padding: '8px 16px',
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: 'none'
                                }
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleActionConfirm}
                            variant="contained"
                            color="primary"
                            autoFocus
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                borderRadius: '8px',
                                padding: '8px 16px',
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: 'none'
                                }
                            }}
                        >
                            OK
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
}

export default InternalJobList;