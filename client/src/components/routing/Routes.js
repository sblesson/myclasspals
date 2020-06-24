import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CreateProfile from '../profile/CreateProfile';
import Account from '../profile/account/Account';
/* import Profiles from '../profiles/Profiles';
 */
import Profile from '../profile/Profile';
import Messages from '../messages/Messages';

import Groups from '../groups/Groups';
import DiscoverGroup from '../groups/DiscoverGroup';
import SingleGroup from '../groups/SingleGroup';
import AboutGroup from '../groups/AboutGroup';
import Alert from '../../layout/Alert';
import SinglePost from '../posts/SinglePost';
import Page401 from '../../layout/Page401';
import Page404 from '../../layout/Page404';
import Page403 from '../../layout/Page403';
import Page500 from '../../layout/Page500';

import OurStory from '../../layout/OurStory';
import OurMission from '../../layout/OurMission';
import FAQ from '../../layout/FAQ';
import PrivacyPolicy from '../../layout/PrivacyPolicy';
import ContactUs from '../../layout/ContactUs';
import AboutUs from '../../layout/AboutUs';
import TermsAndConditions from '../../layout/TermsAndConditions';
import Guidelines from '../../layout/Guidelines';
import Help from '../../layout/Help';
import Landing from '../../layout/auth/Landing';
import { Link } from 'react-router-dom';

import PrivateRoute from '../routing/PrivateRoute';

const Routes = () => {
  return (
    <section>
      <Alert />
      <Switch>
        <Route exact path='/login' component={Landing} />
        <Route exact path='/invite/group/:id' component={Landing} />
        <Route exact path='/' component={Landing} />
        <Route exact path='/register' component={Landing} />
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
         */}
        <PrivateRoute exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/messages' component={Messages} />
        <PrivateRoute exact path='/messages/:id' component={Messages} />
        <PrivateRoute exact path='/groups' component={Groups} />
        <PrivateRoute exact path='/discovergroup' component={DiscoverGroup} />
        <PrivateRoute
          path='/group/:id'
          component={props => (
            <SingleGroup {...props} key={window.location.pathname} />
          )}
        />
        {/* <PrivateRoute exact path='/group/:id' component={SingleGroup} /> */}
        <PrivateRoute exact path='/group/:id/members' component={SingleGroup} />
        <PrivateRoute exact path='/group/:id/about' component={SingleGroup} />
        <PrivateRoute exact path='/group/:id/about' component={AboutGroup} />
        <PrivateRoute exact path='/dashboard' component={SingleGroup} />
        <PrivateRoute
          path='/dashboard/:id'
          component={props => (
            <SingleGroup {...props} key={window.location.pathname} />
          )}
        />
        <PrivateRoute
          exact
          path='/create-profile/:id'
          component={CreateProfile}
        />
        <PrivateRoute exact path='/account' component={Account} />
        <PrivateRoute exact path='/posts/:id/:groupId' component={SinglePost} />
        {/*         <Route component={Page404} />
         */}{' '}
        <Route exact path='/401' component={Page403} />
        <Route exact path='/403' component={Page403} />
        <Route exact path='/404' component={Page404} />
        <Route exact path='/500' component={Page500} />
      </Switch>
    </section>
  );
};

export default Routes;
