import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import PendingRegistration from '../auth/PendingRegistration';

import CreateProfile from '../profile/CreateProfile';
import AccountSettings from '../profile/AccountSettings';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';

import Messages from '../messages/Messages.js';

import Groups from '../groups/Groups.js';
import DiscoverGroup from '../groups/DiscoverGroup.js';
import SingleGroup from '../groups/SingleGroup.js';

import Posts from '../posts/Posts';
import SinglePost from '../posts/SinglePost';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/login' component={Login} />

        <Route exact path='/invite/group/:id' component={PendingRegistration} />

        <PrivateRoute exact path='/profiles' component={Profiles} />
        <PrivateRoute exact path='/messages' component={Messages} />
        <PrivateRoute exact path='/messages/:id' component={Messages} />

        <PrivateRoute exact path='/groups' component={Groups} />
        <PrivateRoute exact path='/discovergroup' component={DiscoverGroup} />
        <PrivateRoute exact path='/group/:id' component={SingleGroup} />
        <PrivateRoute exact path='/group/members/:id' component={SingleGroup} />
        <PrivateRoute exact path='/profile/:id' component={Profile} />

        <PrivateRoute exact path='/dashboard' component={Posts} />
        <PrivateRoute exact path='/dashboard/:id' component={Posts} />
        <PrivateRoute
          exact
          path='/create-profile/:id'
          component={CreateProfile}
        />
        <PrivateRoute exact path='/account' component={AccountSettings} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={SinglePost} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
