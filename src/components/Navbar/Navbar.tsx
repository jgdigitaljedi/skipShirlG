import React, { FunctionComponent, useEffect, useState, useCallback } from 'react';
import './Navbar.scss';
import { appLinks, IAppLinksSection } from '../../constants/nav.constants';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';

const Navbar: FunctionComponent<any> = () => {
  // @TODO: write auth logic and user logic and use it here
  const userLogged = false;
  const [currentRoute, setCurrentRoute] = useState<string>('/');

  const getCurrentPath = useCallback(() => {
    const path = window.location.pathname;
    setCurrentRoute(path);
  }, [setCurrentRoute]);

  const openDialog = (link: IAppLinksSection) => {
    console.log('link for dialog', link);
  };

  useEffect(() => {
    getCurrentPath();
  }, [getCurrentPath]);

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
                to={link.path as string}
                key={index}
                activeClassName="active-route"
                isActive={() => currentRoute === link.path}
                onClick={() => setCurrentRoute(link.path as string)}
              >
                {link.label}
              </NavLink>
            );
          })}
          {appLinks.user
            .filter((item) => item.logged === userLogged)
            .map((link: IAppLinksSection, index) => {
              return link.path ? (
                <NavLink
                  to={link.path as string}
                  key={index}
                  activeClassName="active-route"
                  isActive={() => currentRoute === link.path}
                  onClick={() => setCurrentRoute(link.path as string)}
                >
                  <FontAwesomeIcon icon={['fas', link.icon as IconName]} />
                </NavLink>
              ) : (
                <button className="icon-button" onClick={() => openDialog(link)}>
                  <FontAwesomeIcon icon={['fas', link.icon as IconName]} />
                </button>
              );
            })}
          {/** notifications */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
