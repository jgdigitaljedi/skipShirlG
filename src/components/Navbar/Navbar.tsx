import React, { FunctionComponent, useEffect, useState, useCallback } from 'react';
import './Navbar.scss';
import { appLinks, IAppLinksSection } from '../../constants/nav.constants';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';

const Navbar: FunctionComponent<any> = () => {
  // @TODO: write auth logic and user logic and use it here
  const [currentRoute, setCurrentRoute] = useState<string>('home');

  const getCurrentPath = useCallback(() => {
    console.log('window.location', window.location);
    const path = window.location.pathname;
    if (path === '/') {
      setCurrentRoute('home');
    } else {
      setCurrentRoute(path);
    }
  }, [setCurrentRoute]);

  useEffect(() => {
    getCurrentPath();
  }, [getCurrentPath]);
  const userLogged = false;
  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <div className="navbar--brand">
          {/**@TODO: make brand logo */}
          <h2>
            <div>Skip & Shirley</div>
            <div>Gauthier</div>
          </h2>
        </div>
        <div className="navbar--links">
          {appLinks.main.map((link, index) => {
            return (
              <NavLink
                to={link.path}
                key={index}
                activeClassName="active-route"
                isActive={() => currentRoute === link.path}
              >
                {link.label}
              </NavLink>
            );
          })}
          {appLinks.user
            .filter((item) => item.logged === userLogged)
            .map((link: IAppLinksSection, index) => {
              return (
                <NavLink
                  to={link.path as string}
                  key={index}
                  activeClassName="active-route"
                  isActive={() => currentRoute === link.path}
                >
                  <FontAwesomeIcon icon={['fas', link.icon as IconName]} />
                </NavLink>
              );
            })}
          {/** notifications */
          /** login/logout */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
