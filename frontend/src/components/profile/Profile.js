import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../common/spinner/Spinner';
import ProfileAbout from './ProfileAbout';
import { getProfileById } from '../../actions/profile';
import { LeftCircleOutlined } from '@ant-design/icons';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.userId);
  }, [getProfileById, match.params.userId]);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Fragment>
          <Link
            to={`/dashboard/${match.params.id}`}
            style={{
              fontSize: '1rem',
              marginLeft: '1rem',
              marginTop: '1rem',
              cursor: 'pointer',
              display: 'inline-block',
            }}
          >
            <LeftCircleOutlined />
          </Link>
          'No User Details Found'
        </Fragment>
      ) : (
        <Fragment>
          <Link
            to={`/dashboard/${match.params.id}`}
            style={{
              fontSize: '1rem',
              marginLeft: '1rem',
              marginTop: '1rem',
              cursor: 'pointer',
              display: 'inline-block',
            }}
          >
            <LeftCircleOutlined />
          </Link>
          <ProfileAbout profile={profile} />
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
