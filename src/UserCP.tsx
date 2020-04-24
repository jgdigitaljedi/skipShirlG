import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import './UserCP.scss';

// if user clicks usercp link and is not logged in, it should take them to a login screen
// otherwise, if they are logged in it should come here

const UserCP: FunctionComponent<RouteComponentProps> = () => {
  return (
    <div className="user-cp">
      <div>User Control Panel</div>
    </div>
  );
};

export default UserCP;
