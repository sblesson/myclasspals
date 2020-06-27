import React from 'react';
import Register from './Register';
import Login from './Login';
import PendingRegistration from './PendingRegistration';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const Landing = ({ location, match, auth, history }) => {
  if (auth.isAuthenticated) {
    console.log(auth);
    let groupId, user;
    if (auth.user) {
      try {
        user = JSON.parse(auth.user);
      } catch (e) {
        // You can read e for more info
        // Let's assume the error is that we already have parsed the auth.user so just return that
        user = auth.user;
      }
      if (user) {
        if (user.userGroup && user.userGroup.length > 0) {
          //first time groupId is not passed in url param.
          //So get groupId from user group first item
          groupId = user.userGroup[0].id;
          history.push(`/dashboard/${groupId}`);
        } else if (
          user.pendingInvitedUserGroups &&
          user.pendingInvitedUserGroups.length > 0
        ) {
          //New user who got invitation from another group, redirect to groups page
          groupId = user.pendingInvitedUserGroups[0].id;

          history.push(`/group/${groupId}`);
        } else if (
          user.requestedUserGroup &&
          user.requestedUserGroup.length > 0
        ) {
          groupId = user.requestedUserGroup[0].id;
          history.push(`/group/${groupId}`);
        } else {
          //New user login for first time, not part of any groups, redirect to create profile and help user discover group
          history.push(`/create-profile/1`);
        }
      }
    }

    /*     return <Redirect to='/dashboard' />;
     */
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
      <div className='col col-4'>{loginComponent}</div>
    </div>
  );
};

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Landing));
