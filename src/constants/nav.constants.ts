import { IconName } from '@fortawesome/fontawesome-svg-core';

export interface IAppLinksSection {
  path: string;
  icon: IconName | null;
  label: string;
  logged?: boolean;
}

export interface IAppLinks {
  main: IAppLinksSection[];
  user: IAppLinksSection[];
}

export const appLinks: IAppLinks = {
  main: [
    { path: '/', label: 'Home', icon: null },
    { path: '/gallery', label: 'Gallery', icon: null },
    { path: '/slideshow', label: 'Slideshow', icon: null }
  ],
  user: [
    { path: '/user', label: '', icon: 'user', logged: true },
    { path: '/login', label: '', icon: 'sign-in-alt', logged: false },
    { path: '/logout', label: '', icon: 'sign-out-alt', logged: true }
  ]
};
