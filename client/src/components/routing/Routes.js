import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
<<<<<<< HEAD
import MyProfile from '../profile/MyProfile';
import CreateProfile from '../profile/CreateProfile';
import AccountSettings from '../profile/AccountSettings';
import Profiles from '../profiles/Profiles';
import Profile from '../old-profile/Profile';
=======
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddSchool from '../profile-forms/AddSchool';
import AddReminder from '../profile-forms/AddReminder';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
>>>>>>> 54881ad2f7c207c5f89b336585b0b07518654a00
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />

        <PrivateRoute exact path='/dashboard' component={Posts} />
<<<<<<< HEAD
        <PrivateRoute exact path='/view-profile' component={MyProfile} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/account' component={AccountSettings} />
=======
        <PrivateRoute exact path='/my-profile' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-school' component={AddSchool} />
        <PrivateRoute exact path='/add-reminder' component={AddReminder} />
>>>>>>> 54881ad2f7c207c5f89b336585b0b07518654a00
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
