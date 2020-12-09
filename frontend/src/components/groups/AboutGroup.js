import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import _ from 'lodash';
import moment from 'moment';

const AboutGroup = ({ index, group }) => {
  return (
    <Card
      key={index}
      style={{
        width: '100%',
        marginBottom: 16,
      }}
      bordered={false}
      avatar={<i className='fas fa-users icon-group'></i>}
    >
      {group.currentGroup.description && (
        <div>{group.currentGroup.description}</div>
      )}
      {group.currentGroup.createdDate && (
        <div style={{ marginBottom: '1rem' }}>
          Created Date:&nbsp;{' '}
          {moment(group.currentGroup.createdDate).format('LLL')}
        </div>
      )}
      {group.currentGroup.groupRules && (
        <div>Guidelines:&nbsp; {group.currentGroup.groupRules}</div>
      )}
      {/* {!group.currentGroup.groupRules && ( */}
      <div>
        {'All myclasspals communities must follow general guidelines'}
        <ol>
          <li>
            {' '}
            <strong>Be kind</strong>
          </li>
          <li>
            <strong>No bullying</strong>
          </li>
          <li>
            <strong>Be respectful</strong>
          </li>
          <li>
            <strong>Encourage one another</strong>
          </li>
          <li>
            {' '}
            <strong> No spam or self promotion</strong>
          </li>
        </ol>
      </div>
      {/*   )} */}
    </Card>
  );
};

AboutGroup.propTypes = {
  group: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  group: state.group,
});

export default connect(mapStateToProps, {})(AboutGroup);
