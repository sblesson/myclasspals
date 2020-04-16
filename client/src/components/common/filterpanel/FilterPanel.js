import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchPost } from '../../../actions/post';
import moment from 'moment';

import { List } from 'antd';
import './FilterPanel.scss';

const FilterPanel = ({
  categories,
  group,
  searchPost,
  post: { posts, loading }
}) => {
  const groupId = group.currentGroup.id;
  const [filterPanel, showFilterPanel] = useState(false);
  const [dateFilterSelected, setDateFilterSelected] = useState(null);
  const [categoryFilterSelected, setCategoryFilterSelected] = useState(null);

  const toggleFilterPanel = () => showFilterPanel(!filterPanel);
  const [text, setText] = useState('');
  const data = ['People', 'Groups'];

  const dateFilters = [
    'Last hour',
    'Today',
    'This week',
    'This month',
    'This year'
  ];
  const getUTCDate = item => {
    console.log(groupId);
    let dateFilterLessThan = moment()
        .utc()
        .format('YYYY-MM-DD HH:mm:ss'),
      dateFilterGreaterThan = null;

    switch (item) {
      case 'Last hour':
        dateFilterGreaterThan = moment()
          .utc()
          .startOf('hour')
          .format('YYYY-MM-DD HH:mm:ss');
        console.log(dateFilterLessThan);
        console.log(dateFilterGreaterThan);
        return {
          groupId: groupId,
          dateFilterGreaterThan: dateFilterGreaterThan,
          dateFilterLessThan: dateFilterLessThan
        };
      case 'Today':
        dateFilterGreaterThan = moment()
          .utc()
          .startOf('day')
          .format('YYYY-MM-DD HH:mm:ss');

        console.log(dateFilterLessThan);
        console.log(dateFilterGreaterThan);

        return {
          groupId: groupId,
          dateFilterGreaterThan: dateFilterGreaterThan,
          dateFilterLessThan: dateFilterLessThan
        };
      case 'This week':
        dateFilterGreaterThan = moment()
          .utc()
          .startOf('week')
          .format('YYYY-MM-DD HH:mm:ss');

        console.log(dateFilterLessThan);
        console.log(dateFilterGreaterThan);
        return {
          groupId: groupId,
          dateFilterGreaterThan: dateFilterGreaterThan,
          dateFilterLessThan: dateFilterLessThan
        };
      case 'This month':
        dateFilterGreaterThan = moment()
          .utc()
          .startOf('month')
          .format('YYYY-MM-DD HH:mm:ss');

        console.log(dateFilterLessThan);
        console.log(dateFilterGreaterThan);
        return {
          groupId: groupId,
          dateFilterGreaterThan: dateFilterGreaterThan,
          dateFilterLessThan: dateFilterLessThan
        };
      case 'This year':
        dateFilterGreaterThan = moment()
          .utc()
          .startOf('year')
          .format('YYYY-MM-DD HH:mm:ss');

        console.log(dateFilterLessThan);
        console.log(dateFilterGreaterThan);

        return {
          groupId: groupId,
          dateFilterGreaterThan: dateFilterGreaterThan,
          dateFilterLessThan: dateFilterLessThan
        };
    }
  };
  const handleDateFilterClick = (item, event) => {
    setDateFilterSelected(item);
    let dateFilter = getUTCDate(item);
    searchPost(dateFilter);
  };
  const removeDateFilterHandler = (item, event) => {
    console.log(item);
    console.log('removeFilterHandler');
  };
  const handleCategoryFilterClick = (item, event) => {
    setCategoryFilterSelected(item);
  };
  const removeCategoryFilterHandler = (item, event) => {
    console.log(item);
    console.log('removeCategoryFilterHandler');
  };
  return (
    <div className='post-filters'>
      <div className='filter-actions' onClick={toggleFilterPanel}>
        <i className='fas fa-filter filter-icon'></i>
        <span className='filter-label'> FILTER</span>
      </div>
      {filterPanel && (
        <div className='filter-panel'>
          <div className='row'>
            <div className='col-xs-1 col-sm-1 col-md-6 col-lg-6'>
              <List
                size='small'
                header={<div>DATE</div>}
                bordered
                dataSource={dateFilters}
                renderItem={item => (
                  <List.Item
                    onClick={event => handleDateFilterClick(item, event)}
                    className={dateFilterSelected === item ? ' selected' : ''}
                  >
                    {item}
                    {dateFilterSelected === item && (
                      <svg
                        className='svg-icon'
                        viewBox='0 0 20 20'
                        onClick={event => removeDateFilterHandler(item, event)}
                      >
                        <path
                          fill='none'
                          d='M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z'
                        ></path>
                      </svg>
                    )}
                  </List.Item>
                )}
              />
            </div>
            {categories && categories.length > 0 && (
              <div className='col-xs-1 col-sm-1 col-md-6 col-lg-6'>
                <List
                  size='small'
                  header={<div>CATEGORY</div>}
                  bordered
                  dataSource={categories}
                  renderItem={item => (
                    <List.Item
                      onClick={event =>
                        handleCategoryFilterClick(item.title, event)
                      }
                      className={
                        categoryFilterSelected === item.title ? ' selected' : ''
                      }
                    >
                      {item.title}
                      {categoryFilterSelected === item.title && (
                        <svg
                          className='svg-icon'
                          viewBox='0 0 20 20'
                          onClick={event =>
                            removeDateFilterHandler(item, event)
                          }
                        >
                          <path
                            fill='none'
                            d='M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z'
                          ></path>
                        </svg>
                      )}
                    </List.Item>
                  )}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  post: state.post,
  group: state.group
});

export default connect(mapStateToProps, { searchPost })(FilterPanel);
