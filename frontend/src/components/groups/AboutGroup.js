import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import _ from 'lodash';

const AboutGroup = ({ index, group }) => {
  return (
    <Card
      key={index}
      style={{
        width: '100%',
        marginBottom: 16,
        textAlign: 'center',
      }}
      avatar={<i className='fas fa-users icon-group'></i>}
      title={'About'}
      description={group.currentGroup.description}
    >
      {group.currentGroup.createdDate ? (
        <div>{group.currentGroup.createdDate}</div>
      ) : (
        ''
      )}
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
