import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../layout/auth/Login';
import Alert from '../layout/Alert';
import PendingRegistration from '../layout/auth/PendingRegistration';

import CreateProfile from '../profile/CreateProfile';
import AccountSettings from '../profile/AccountSettings';
/* import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile'; */

import Messages from '../messages/Messages.js';

import Groups from '../groups/Groups.js';
import DiscoverGroup from '../groups/DiscoverGroup.js';
import SingleGroup from '../groups/SingleGroup.js';

import Posts from '../posts/Posts';
import SinglePost from '../posts/SinglePost';
import NotFound from '../layout/NotFound';

import OurStory from '../layout/OurStory';
import OurMission from '../layout/OurMission';
import FAQ from '../layout/FAQ';
import PrivacyPolicy from '../layout/PrivacyPolicy';
import ContactUs from '../layout/ContactUs';
import AboutUs from '../layout/AboutUs';
import TermsAndConditions from '../layout/TermsAndConditions';
import Guidelines from '../layout/Guidelines';
import Help from '../layout/Help';
import Landing from '../layout/Landing';
import { Link } from 'react-router-dom';

import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <section /*  className='container' */>
      <Alert />
      <Switch>
        <Route exact path='/login' component={Landing} />

        <Route exact path='/invite/group/:id' component={PendingRegistration} />
        <Route exact path='/' component={Landing} />
        <Route exact path='/register' component={Landing} />
        <Route exact path='/invite/group/:id' component={Landing} />

        <Route exact path='/login' component={Landing} />
        <Route exact path='/our-story' component={OurStory} />
        <Route exact path='/our-mission' component={OurMission} />
        <Route exact path='/faq' component={FAQ} />
        <Route exact path='/about-us' component={AboutUs} />
        <Route exact path='/contact-us' component={ContactUs} />
        <Route exact path='/tandc' component={TermsAndConditions} />
        <Route exact path='/privacy-policy' component={PrivacyPolicy} />
        <Route exact path='/guidelines' component={Guidelines} />
        <Route exact path='/help' component={Help} />

        {/*        <PrivateRoute exact path='/profiles' component={Profiles} />
        <PrivateRoute exact path='/profile/:id' component={Profile} /> */}

        <PrivateRoute exact path='/messages' component={Messages} />
        <PrivateRoute exact path='/messages/:id' component={Messages} />

        <PrivateRoute exact path='/groups' component={Groups} />
        <PrivateRoute exact path='/discovergroup' component={DiscoverGroup} />
        <PrivateRoute exact path='/group/:id' component={SingleGroup} />
        <PrivateRoute exact path='/group/members/:id' component={SingleGroup} />

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
