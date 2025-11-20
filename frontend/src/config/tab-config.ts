import { TabConfigItem } from '../utils/types/tabs';

export const TAB_CONFIG: TabConfigItem[] = [
  {
    name: 'home',
    title: 'Home',
    icon: 'home',
    showSearch: true,
  },
  {
    name: 'promotions',
    title: 'Promotions',
    icon: 'briefcase',
    showSearch: true,
  },
  {
    name: 'events',
    title: 'Events',
    icon: 'newspaper',
    showSearch: true,
  },
  {
    name: 'groups',
    title: 'Groups',
    icon: 'people',
    showSearch: false,
  },
  {
    name: 'profile',
    title: 'Profile',
    icon: 'person',
    showSearch: true,
  },
];
