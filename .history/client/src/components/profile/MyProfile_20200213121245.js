import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import School from './school/School';
import Reminder from './Reminder';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import LeftNav from '../leftnav/LeftNav';

const MyProfile = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
  history
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const redirectToCreateProfile = () => {
    history.push('/create-profile');
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='row'>
        <LeftNav screen='profile' />
        <div id='main'>
          <article>
            <p className='lead'>
              <i className='fas fa-user' /> Welcome {user && user.name}
            </p>
            {profile !== null ? (
              <Fragment>
                <School school={profile.school} />
                {/*    <Reminder reminder={profile.reminder} /> */}
              </Fragment>
            ) : 
              {redirectToCreateProfile}  
              /*    <Fragment>
                
                <p>You have not yet setup a profile, please add some info</p>
                <Link to='/create-profile' className='btn btn-primary my-1'>
                  Create Profile
                </Link>
              </Fragment> */
            }
          </article>
        </div>
      </div>
    </Fragment>
  );
};

MyProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  MyProfile
);
