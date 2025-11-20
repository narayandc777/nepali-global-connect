type TabRouteNames = 'home' | 'promotions' | 'events' | 'groups' | 'profile';

export type TabConfigItem = {
  name: TabRouteNames; // Use the type
  title: string;
  icon: string;
  showSearch: boolean;
};
