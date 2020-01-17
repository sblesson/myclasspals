import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import LeftNavItem from './LeftNavItem';
import Spinner from '../layout/Spinner';

import { getLeftNav } from '../../actions/leftnav';

import './LeftNav.scss';

const LeftNav = ({ getLeftNav, leftnav: { leftnav, loading } }) => {
  console.log(getLeftNav);
  let depthStep = 10,
    depth = 0,
    expanded;

  useEffect(() => {
    getLeftNav('profile');
  }, [getLeftNav]);

  return loading ? (
    <Spinner />
  ) : (
    <div className='sidebar'>
      <List disablePadding dense>
        {leftnav.map((leftNavItem, index) => (
          <React.Fragment key={`${leftNavItem.name}${index}`}>
            {leftNavItem === 'divider' ? (
              <Divider style={{ margin: '6px 0' }} />
            ) : (
              <LeftNavItem
                depthStep={depthStep}
                depth={depth}
                expanded={expanded}
                item={leftNavItem}
              />
            )}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

LeftNav.propTypes = {
  getLeftNav: PropTypes.func.isRequired,
  leftnav: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    leftnav: state.leftnav
  };
};

export default connect(mapStateToProps, { getLeftNav })(LeftNav);
