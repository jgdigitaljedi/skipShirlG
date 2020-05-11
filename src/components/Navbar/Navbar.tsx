import React, { FunctionComponent } from 'react';
import './Navbar.scss';
import { appLinks, IAppLinksSection } from '../../constants/nav.constants';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';

const Navbar: FunctionComponent<any> = () => {
  // @TODO: write auth logic and user logic and use it here
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
              <Link to={link.path} key={index}>
                {link.label}
              </Link>
            );
          })}
          {appLinks.user
            .filter((item) => item.logged === userLogged)
            .map((link: IAppLinksSection, index) => {
              return (
                <Link to={link.path as string} key={index}>
                  <FontAwesomeIcon icon={['fas', link.icon as IconName]} />
                </Link>
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
