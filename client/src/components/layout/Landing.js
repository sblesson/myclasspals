import React, { Fragment } from 'react';
import Register from '../auth/Register';
import Login from '../auth/Login';

import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from './Footer';
import { withRouter } from 'react-router-dom';

const Landing = ({ isAuthenticated, location }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <section className='container'>
        <div class='row'>
          <div class='col'>
            {' '}
            <section>
              <div className='dark-overlay'>
                <div className='landing-inner'>
                  <h1 className='x-large'>Social network for parent&#39;s</h1>
                  <h1 className='large'>
                    Connect with other parents in your child&#39;s classroom
                  </h1>
                  <p className='lead'>
                    Create a profile, search school and share posts with other
                    parents in your childs classroom
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div class='col col-4'>
            {location.pathname === '/login' ? <Login /> : <Register />}
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(withRouter(Landing));
