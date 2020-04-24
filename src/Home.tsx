import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from '@reach/router';
import './Home.scss';

const Home: FunctionComponent<RouteComponentProps> = () => {
  return (
    <div className="home">
      <div>Home</div>
    </div>
  );
};

export default Home;
