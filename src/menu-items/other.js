// assets
import { IconBrandChrome, IconHelp,IconHome,IconUserCircle,IconId } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp,IconHome,IconUserCircle,IconId};

// ==============================|| CLIENT MENU ||============================== //

const clientMenu = {
  id: 'client-menu',
  type: 'group',
  children: [
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '/',
      icon: icons.IconBrandChrome,
      breadcrumbs: false
    },
    {
      id: 'createJob',
      title: 'Create Job',
      type: 'collapse',
      icon: icons.IconBrandChrome,
      children: [
        {
          id: 'jobPostInternal',
          title: 'Job Post Internal',
          type: 'item',
          url: '/jobPost/internal',
          breadcrumbs: true
        },
        {
          id: 'jobPostExternal',
          title: 'Job Post External',
          type: 'item',
          url: '/jobPost/external',
          breadcrumbs: true
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
    return clientMenu;
  } else if (userType === 'candidate') {
    return candidateMenu;
  } else {
    return { id: 'empty', type: 'group', children: [] };
  }
};
