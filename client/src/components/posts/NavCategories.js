import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import NavCategoryItem from './NavCategoryItem';

import { getPostCategories } from '../../actions/post';

import './NavCategories.scss';

const NavCategories = ({
  screen = 'dashboard',
  getPostCategories,
  categories
}) => {
  console.log(categories);
  let depthStep = 10,
    depth = 0,
    expanded;

  useEffect(() => {
    getPostCategories(screen);
  }, [getPostCategories]);

  return (
    <div className='sidebar'>
      <List disablePadding dense className='side-bar-list'>
        {categories.map((leftNavItem, index) => (
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

NavCategories.propTypes = {
  getPostCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    categories: state.post.categories
  };
};

export default connect(mapStateToProps, { getPostCategories })(NavCategories);
