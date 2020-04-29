import React, { FunctionComponent } from 'react';
import './Navbar.scss';

const Navbar: FunctionComponent<any> = () => {
  return (
    <div className="navbar">
      {/**@TODO: make brand logo */}
      <div className="navbar--brand">Skip & Shirley Gauthier</div>
      <div className="navbar--links">
        {
          // links to paths
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
