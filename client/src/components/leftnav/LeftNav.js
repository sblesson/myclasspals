import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import LeftNavItem from './LeftNavItem';
import NavCategoryItem from './NavCategoryItem';
import Spinner from '../layout/Spinner';

import { getLeftNav } from '../../actions/leftnav';

import './LeftNav.scss';

const LeftNav = ({
  screen = 'dashboard',
  id,
  getLeftNav,
  leftnav: { leftnav, loading },
  categories
}) => {
  console.log(categories);

  let depthStep = 10,
    depth = 0,
    expanded;

  useEffect(() => {
    getLeftNav(screen, id);
  }, [getLeftNav]);

  return loading ? (
    <Spinner />
  ) : (
    <div className='leftnav-sidebar'>
      <List disablePadding dense>
        {leftnav &&
          leftnav.length > 0 &&
          leftnav.map((leftNavItem, index) => (
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
        {screen == 'dashboard' &&
          categories &&
          categories.length > 0 &&
          categories.map((leftNavItem, index) => (
            <React.Fragment key={`${leftNavItem.title}${index}`}>
              {leftNavItem === 'divider' ? (
                <Divider style={{ margin: '6px 0' }} />
              ) : (
                <NavCategoryItem
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
    leftnav: state.leftnav,
    categories: state.post.categories
  };
};

export default connect(mapStateToProps, { getLeftNav })(LeftNav);
