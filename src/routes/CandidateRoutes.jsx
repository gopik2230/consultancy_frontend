import CandidateLayout from 'layout/MainLayout/CandidateLayout';
import Dashboard from 'views/pages/Candidate/Dashboard';

import Profile from 'views/pages/Candidate/Profile';
import Skills from 'views/pages/Candidate/Skills';


const CandidateRoutes = {
  path: '/candidate',
  element: <CandidateLayout />,
  children: [
    { path: '', element: <Dashboard /> },
    { path: 'profile', element: <Profile /> },
    { path: 'skills', element: <Skills /> }
  ]
};

export default CandidateRoutes;
