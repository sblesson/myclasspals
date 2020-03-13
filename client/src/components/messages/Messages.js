import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import MessageItem from './MessageItem';
import { getProfiles } from '../../actions/profile';
import { FormOutlined } from '@ant-design/icons';

import { Tab, Header, List, Segment } from 'semantic-ui-react';

import './Messages.scss';
const Messages = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  console.log(profiles);
  const getPanes = () => {
    let panes = [];
    if (profiles.length > 0) {
      panes = profiles.map(profile => ({
        menuItem: profile.user.name,
        render: () => (
          <Tab.Pane>
            {' '}
            <MessageItem key={profile._id} profile={profile} />
          </Tab.Pane>
        )
      }));
    }
    return panes;
  };
  let panes = getPanes();
  console.log(panes);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='message-head'>
            <div as='h4' className='message-head-title'>
              Inbox
            </div>
            <div as='h4' className='message-head-title message-head-link'>
              <FormOutlined className='message-head-icon' />
              Compose
            </div>
          </div>

          {panes.length > 0 ? (
            <Tab
              menu={{ fluid: true, vertical: true }}
              menuPosition='left'
              panes={panes}
            />
          ) : (
            <h4>No messages found...</h4>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Messages.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Messages);
