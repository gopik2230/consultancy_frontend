import { createBrowserRouter } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './AuthenticationRoutes';
import CandidateRoutes from './CandidateRoutes';

// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([MainRoutes, LoginRoutes,CandidateRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
