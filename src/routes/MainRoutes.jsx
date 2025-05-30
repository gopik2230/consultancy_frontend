import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import MinimalLayout from 'layout/MinimalLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
// const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
// const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

import AuthLogin from 'views/pages/authentication/auth-forms/AuthLogin';

// sample page routing
const HomePage = Loadable(lazy(() => import('views/pages/Home')));
const InternalJob = Loadable(lazy(() => import('views/pages/CreateJob/Internal/addJob')));
const ExternalJob = Loadable(lazy(() => import('views/pages/CreateJob/External/addJob')));
const token = localStorage.getItem('token')
console.log("token ",token)
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  // element: token ? <MainLayout /> : <MinimalLayout/>,
  element: <MainLayout /> ,
  children: [
    {
      path: '/',
      element:  <HomePage /> 
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <HomePage />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'tabler-icons',
    //       element: <UtilsTablerIcons />
    //     }
    //   ]
    // },
    // {
    //   path: 'icons',
    //   children: [
    //     {
    //       path: 'material-icons',
    //       element: <UtilsMaterialIcons />
    //     }
    //   ]
    // },
    {
      path: 'sample-page',
      element: <HomePage />
    },
    // {
    //   path: 'jobPost',
    //   children: [
    //     {
    //       path: 'internal',
    //       element: <InternalJob />
    //     }
    //   ]
    // },
    {
      path: 'jobPost',
      children: [
        {
          path: 'internal',
          element: <InternalJob />
        }
      ]
    },
    {
      path: 'jobPost',
      children: [
        {
          path: 'external',
          element: <ExternalJob />
        }
      ]
    },
    // {
    //   path: 'jobPost',
    //   children: [
    //     {
    //       path: 'external',
    //       element: <ExternalJob />
    //     }
    //   ]
    // },
  ]
};

export default MainRoutes;
