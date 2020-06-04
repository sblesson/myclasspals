import React from 'react';
import Register from './auth/Register';
import Login from './auth/Login';
import PendingRegistration from './auth/PendingRegistration';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const Landing = ({ isAuthenticated, location, match }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  var loginComponent;
  var currentLocation = location.pathname;
  if (currentLocation.includes('/login')) {
    loginComponent = <Login />;
  } else if (currentLocation.includes('/invite/group/')) {
    loginComponent = <PendingRegistration token={match.params.id} />;
  } else {
    loginComponent = <Register />;
  }

  return (
    <div className='row' style={{ marginTop: '20px' }}>
      <div className='col col-8'>
        {' '}
        <section>
          <div>
            <img
              src='https://d19rpgkrjeba2z.cloudfront.net/static/images/groups/default-cover4@2x.svg'
              alt='Custom banner image for this neighborhood group.'
              data-testid='groups-page-header-image'
            ></img>
          </div>
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
      <div className='col col-4' sty>
        {loginComponent}
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(withRouter(Landing));
