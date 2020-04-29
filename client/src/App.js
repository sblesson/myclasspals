import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HeaderNav from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
import OurStory from './components/layout/OurStory';
import OurMission from './components/layout/OurMission';
import FAQ from './components/layout/FAQ';
import PrivacyPolicy from './components/layout/PrivacyPolicy';
import ContactUs from './components/layout/ContactUs';
import AboutUs from './components/layout/AboutUs';
import TermsAndConditions from './components/layout/TermsAndConditions';
import Guidelines from './components/layout/Guidelines';
import Help from './components/layout/Help';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';
import 'antd/dist/antd.css';

import './App.scss';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <HeaderNav />
          <Switch>
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

            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
