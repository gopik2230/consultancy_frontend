// assets
import { IconBrandChrome, IconHelp,IconHome,IconUserCircle,IconId,IconBriefcase } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp,IconHome,IconUserCircle,IconId,IconBriefcase};

// ==============================|| CLIENT MENU ||============================== //

const clientMenu = {
  id: 'client-menu',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/',
      icon: icons.IconHome,
      breadcrumbs: false
    },
    {
      id: 'createJob',
      title: 'Create Job',
      type: 'collapse',
      icon: icons.IconBriefcase,
      children: [
        {
          id: 'jobList',
          title: 'Jobs',
          type: 'item',
          url: '/jobs/list',
          breadcrumbs: false
        },
        {
          id: 'jobPostInternal',
          title: 'Job Post Internal',
          type: 'item',
          url: '/job/internal',
          breadcrumbs: false
        },
        {
          id: 'jobPostExternal',
          title: 'Job Post External',
          type: 'item',
          url: '/job/external',
          breadcrumbs: false
        }
      ]
    }
  ]
};

// ==============================|| CANDIDATE MENU ||============================== //

const candidateMenu = {
  id: 'candidate-menu',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/candidate',
      icon: icons.IconHome,
      breadcrumbs: false
    },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/candidate/profile',
      icon: icons.IconUserCircle,
      breadcrumbs: true
    },
    {
      id: 'skills',
      title: 'Skills',
      type: 'item',
      url: '/candidate/skills',
      icon: icons.IconId,
      breadcrumbs: true
    }
  ]
};

// ==============================|| EXPORT BASED ON USER TYPE ||============================== //

export const getSideMenu = (userType) => {
  
  if (userType === 'client') {
    console.log("ifuserType ",userType)
    return clientMenu;
  } else if (userType === 'candidate') {
    return candidateMenu;
  } else {
    return { id: 'empty', type: 'group', children: [] };
  }
};
