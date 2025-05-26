import CandidateLayout from 'layout/MainLayout/CandidateLayout';
import AppliedJobsPage from 'views/pages/Candidate/AppliedJobs';
import Dashboard from 'views/pages/Candidate/Dashboard';
import InterviewsPage from 'views/pages/Candidate/InterviewsPage';
import JobDetails from 'views/pages/Candidate/JobDetails';

import Profile from 'views/pages/Candidate/Profile';
import ProfileViewsPage from 'views/pages/Candidate/ProfileViewPage';
import SavedJobsPage from 'views/pages/Candidate/SavedJobsPage';
import Skills from 'views/pages/Candidate/Skills';
import TrackApplicationsPage from 'views/pages/Candidate/TrackAppliccation';

const CandidateRoutes = {
  path: '/candidate',
  element: <CandidateLayout />,
  children: [
    { path: '', element: <Dashboard /> },
    { path: 'profile', element: <Profile /> },
    { path: 'skills', element: <Skills /> },
    { path: 'jobDetails/:id', element: <JobDetails /> },
    
    { 
      path: 'applied-jobs', 
      element: <AppliedJobsPage />,
     
    },
    { 
      path: 'saved-jobs', 
      element: <SavedJobsPage />,
      
    },
    { 
      path: 'interviews', 
      element: <InterviewsPage />,
      
    },
    { 
      path: 'profile-views', 
      element: <ProfileViewsPage />,
      
    },
    { 
      path: 'Track-application', 
      element: <TrackApplicationsPage />,
      
    },
    // Additional routes can be added here
  ]
};

export default CandidateRoutes;
