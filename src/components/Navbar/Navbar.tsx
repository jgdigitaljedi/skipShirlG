import React, { FunctionComponent } from 'react';
import './Navbar.scss';
import { appLinks } from '../../constants/nav.constants';
import { Link } from 'react-router-dom';

const Navbar: FunctionComponent<any> = () => {
  return (
    <div className="navbar">
      <div className="navbar--brand">
      {/**@TODO: make brand logo */}
        <h2>
          <div>Skip & Shirley</div>
          <div>Gauthier</div>
        </h2>
      </div>
      <div className="navbar--links">
        {
          appLinks.main.map((link, index) => {
            return (
              <Link to={link.path} key={index}>{link.label}</Link>
            );
          })
        }
      </div>
      <div className="navbar--user">
        {/** notifications */
        /** login/logout */}
      </div>
    </div>
  );
};

export default Navbar;
