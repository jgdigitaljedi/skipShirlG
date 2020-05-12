import { IconName } from '@fortawesome/fontawesome-svg-core';

export interface IAppLinksSection {
  path: string;
  icon: IconName | null;
  label: string;
  tooltip: string;
  logged?: boolean;
}

export interface IAppLinks {
  main: IAppLinksSection[];
  user: IAppLinksSection[];
}

export const appLinks: IAppLinks = {
  main: [
    { path: '/', label: 'Home', icon: null, tooltip: 'Landing page' },
    { path: '/gallery', label: 'Gallery', icon: null, tooltip: 'Photo Gallery' },
    { path: '/slideshow', label: 'Slideshow', icon: null, tooltip: 'Photo slideshow' }
  ],
  user: [
    { path: '/user', label: '', icon: 'user', logged: true, tooltip: 'Your dashboard' },
    {
      path: '/login',
      label: '',
      icon: 'sign-in-alt',
      logged: false,
      tooltip: 'Login or create an account'
    },
    { path: '/logout', label: '', icon: 'sign-out-alt', logged: true, tooltip: 'Logout' }
  ]
};
