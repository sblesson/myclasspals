import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import Alert from '../../components/common/Alert';
import Spinner from '../../components/common/spinner/Spinner';
import Page401 from '../../landing/Page401';
import Page404 from '../../landing/Page404';
import Page403 from '../../landing/Page403';
import Page500 from '../../landing/Page500';

import OurStory from '../../landing/OurStory';
import OurMission from '../../landing/OurMission';
import FAQ from '../../landing/FAQ';
import PrivacyPolicy from '../../landing/PrivacyPolicy';
import ContactUs from '../../landing/ContactUs';

import Help from '../../landing/Help';
import Register from '../../landing/Register';
import Login from '../../landing/Login';
import PrivateRoute from '../routing/PrivateRoute';

const CreateProfile = React.lazy(() => import('../profile/CreateProfile'));
const Account = React.lazy(() => import('../profile/account/Account'));
const Profile = React.lazy(() => import('../profile/Profile'));
const Messages = React.lazy(() => import('../messages/Messages'));
const Groups = React.lazy(() => import('../groups/Groups'));
const DiscoverGroup = React.lazy(() => import('../groups/DiscoverGroup'));
const SingleGroup = React.lazy(() => import('../groups/SingleGroup'));
const AboutGroup = React.lazy(() => import('../groups/AboutGroup'));
const SinglePost = React.lazy(() => import('../posts/SinglePost'));
const TermsAndConditions = React.lazy(() =>
  import('../../landing/TermsAndConditions')
);
const AboutUs = React.lazy(() => import('../../landing/AboutUs'));
const Guidelines = React.lazy(() => import('../../landing/Guidelines'));

const PendingRegistration = React.lazy(() =>
  import('../../landing/PendingRegistration')
);

const Routes = () => {
  return (
    <section>
      <Alert />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/invite/group/:id' component={PendingRegistration} />
        <Route exact path='/' component={Register} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/our-story' component={OurStory} />
        <Route exact path='/our-mission' component={OurMission} />
        <Route exact path='/faq' component={FAQ} />
        <Route exact path='/about-us' component={AboutUs} />
        <Route exact path='/contact-us' component={ContactUs} />
        <Route exact path='/tandc' component={TermsAndConditions} />
        <Route exact path='/privacy-policy' component={PrivacyPolicy} />
        <Route exact path='/guidelines' component={Guidelines} />
        <Route exact path='/help' component={Help} />
        <Route exact path='/401' component={Page403} />
        <Route exact path='/403' component={Page403} />
        <Route exact path='/404' component={Page404} />
        <Route exact path='/500' component={Page500} />
        <Suspense
          fallback={
            <div className='center'>
              <Spinner></Spinner>
            </div>
          }
        >
          {/*        <PrivateRoute exact path='/profiles' component={Profiles} />
           */}
          <PrivateRoute exact path='/profile/:id/:userId' component={Profile} />
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
          <PrivateRoute
            exact
            path='/group/:id/members'
            component={SingleGroup}
          />
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
          <PrivateRoute
            exact
            path='/posts/:id/:groupId'
            component={SinglePost}
          />
        </Suspense>
      </Switch>
    </section>
  );
};

export default Routes;
