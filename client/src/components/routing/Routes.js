import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';

import MyProfile from '../profile/MyProfile';
import CreateProfile from '../profile/CreateProfile';
import AccountSettings from '../profile/AccountSettings';
import Profiles from '../profiles/Profiles';
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
        <PrivateRoute exact path='/profiles' component={Profiles} />
        {/*         <PrivateRoute exact path='/profile/:id' component={Profile} />
         */}{' '}
        <PrivateRoute exact path='/dashboard' component={Posts} />
        <PrivateRoute exact path='/view-profile' component={MyProfile} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/account' component={AccountSettings} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={SinglePost} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
