// assets
import { IconBrandChrome, IconHelp,IconHome,IconUserCircle,IconId,IconChecklist ,IconBookmark,IconCalendarEvent,IconEye,IconMessages} from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp,IconHome,IconUserCircle,IconId,IconChecklist,IconBookmark,IconCalendarEvent,IconEye,IconMessages};

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
      id: 'applied-jobs',
      title: 'Applied Jobs (1/3)',
      type: 'item',
      url: '/candidate/applied-jobs',
      icon: icons.IconChecklist,
      breadcrumbs: true
    },
    {
      id: 'saved-jobs',
      title: 'Saved Jobs (12)',
      type: 'item',
      url: '/candidate/saved-jobs',
      icon: icons.IconBookmark,
      breadcrumbs: true
    },
     {
      id: 'track-application',
      title: 'Track-application',
      type: 'item',
      url: '/candidate/Track-application',
      icon: icons.IconChecklist,
      breadcrumbs: true
    },
    {
      id: 'interviews',
      title: 'My Interviews (1/5)',
      type: 'item',
      url: '/candidate/interviews',
      icon: icons.IconCalendarEvent,
      breadcrumbs: true
    },
    {
      id: 'profile-views',
      title: 'Profile Views (24)',
      type: 'item',
      url: '/candidate/profile-views',
      icon: icons.IconEye,
      breadcrumbs: true
    },
   
    {
      id: 'profile',
      title: 'My Profile',
      type: 'item',
      url: '/candidate/profile',
      icon: icons.IconUserCircle,
      breadcrumbs: true
    },
   
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
