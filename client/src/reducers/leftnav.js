import { GET_LEFT_NAV, LEFT_NAV_ERROR } from '../actions/types';

const initialState = {
  leftnav: [],
  loading: true,
  error: {}
};

const getLeftNavMenu = (payload, id) => {
  switch (payload.screen) {
    case 'profile':
      return [
        {
          name: 'profile',
          title: 'My Profile',
          icon: 'fas fa-user-edit',
          url: '/view-profile'
        },
        {
          name: 'account',
          title: 'Account Settings',
          icon: 'fas fa-user-cog',
          url: '/account'
        }
      ];

    case 'groups':
    case 'discovergroup':
      return [
        {
          name: 'my_groups',
          title: 'My Groups',
          icon: 'fas fa-users',
          url: '/groups'
        },
        {
          name: 'search_group',
          title: 'Discover Groups',
          icon: 'fas fa-search',
          url: '/discovergroup/'
        }
      ];
    case 'group':
      return [
        {
          name: 'members',
          title: 'Membership',
          icon: 'fas fa-user-edit',
          url: '/group/members/' + payload.id
        },
        {
          name: 'group_rules',
          title: 'Group Rules',
          icon: 'fas fa-user-cog',
          url: '/group/group_rules/' + payload.id
        },
        {
          name: 'about_group',
          title: 'About',
          //icon: 'fas fa-user-edit',
          url: '/group/about/' + payload.id
        }
      ];
    default:
      return [];
  }
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LEFT_NAV:
      const leftNavItems = getLeftNavMenu(payload);
      return {
        ...state,
        leftnav: leftNavItems,
        loading: false
      };

    case LEFT_NAV_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
