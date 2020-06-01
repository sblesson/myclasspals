import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TopNavbar from './components/topnavbar/TopNavbar';
import LeftNav from './components/leftnav/LeftNav';

// Redux
import store from './store';

import Routes from './components/routing/Routes';

import FooterContent from './components/layout/Footer';
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';
import 'antd/dist/antd.css';
import './App.scss';

const App = () => {
  const { Header, Sider, Content, Footer } = Layout;
  const { SubMenu } = Menu;

  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Header
            style={{
              position: 'fixed',
              zIndex: 1,
              width: '100%'
            }}
          >
            <TopNavbar />
          </Header>

          <Layout style={{ marginTop: '40px' }}>
            <LeftNav />
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 'calc(100vh - 114px)',
                background: '#fff'
              }}
            >
              <Switch>
                <Route component={Routes} />
              </Switch>
            </Content>
          </Layout>
          <Footer style={{ bottom: '0', textAlign: 'center' }}>
            <FooterContent />
          </Footer>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
