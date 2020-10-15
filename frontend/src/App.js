import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import TopNavbar from './components/topnavbar/TopNavbar';

// Redux
import store from './store';
import { persistor } from './store';
import Routes from './components/routing/Routes';
import { setInterceptors } from './utils/axios';
import { loadUser } from './actions/auth';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/css/bootstrap.css';

/* import 'semantic-ui-css/semantic.min.css'; */
import 'antd/dist/antd.css';
import './App.scss';
import { initGA } from './utils/gaTracking';

const App = () => {
  const { Content } = Layout;
  setInterceptors(store);

  useEffect(() => {
    store.dispatch(loadUser());
    initGA();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Layout>
            <TopNavbar />
            <Layout className='main-container'>
              <Content>
                <Switch>
                  <Route component={Routes} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
