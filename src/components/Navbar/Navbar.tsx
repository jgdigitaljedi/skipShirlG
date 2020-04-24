import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import './Navbar.scss';

const Navbar: FunctionComponent<RouteComponentProps> = () => {
  return (
    <div className="navbar">
      <div>Navbar</div>
    </div>
  );
};

export default Navbar;
