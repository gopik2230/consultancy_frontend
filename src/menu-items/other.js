// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const sideMenu = {
  id: 'sample-docs-roadmap',
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
          url: '/jobPost/internal',
          breadcrumbs: true
        },
        {
          id: 'jobPostExternal',
          title: 'Job Post External',
          type: 'item',
          url: '/jobPost/external',
          breadcrumbs: true
        },
      ]
    }
  ]
};

export default sideMenu;
