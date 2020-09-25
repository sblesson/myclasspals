import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchGroup } from '../../../actions/group';
import moment from 'moment';

import { List } from 'antd';
import './FilterPanel.scss';

const FilterPanel = ({ group, searchGroup }) => {
  const [filterPanel, showFilterPanel] = useState(false);
  const [dateFilterSelected, setDateFilterSelected] = useState(null);
  const [groupTypeFilterSelected, setGroupTypeFilterSelected] = useState(null);

  const toggleFilterPanel = () => showFilterPanel(!filterPanel);

  let [filterObjectSelected, setFilterObjectSelected] = useState(null);

  const dateFilters = [
    'Last hour',
    'Today',
    'This week',
    'This month',
    'This year',
  ];

  const groupTypeFilters = ['City', 'Zipcode', 'School Name'];
  const getUTCDate = (item) => {
    let dateFilterLessThan = moment().utc().format(),
      dateFilterGreaterThan = null;

    switch (item) {
      case 'Last hour':
        dateFilterGreaterThan = moment().utc().startOf('hour').format();

        return {
          dateFilterGreaterThan: dateFilterGreaterThan,
          dateFilterLessThan: dateFilterLessThan,
        };
      case 'Today':
        dateFilterGreaterThan = moment().utc().startOf('day').format();

        return {
          dateFilterGreaterThan: dateFilterGreaterThan,
          dateFilterLessThan: dateFilterLessThan,
        };
      case 'This week':
        dateFilterGreaterThan = moment().utc().startOf('week').format();
        return {
          dateFilterGreaterThan: dateFilterGreaterThan,
          dateFilterLessThan: dateFilterLessThan,
        };
      case 'This month':
        dateFilterGreaterThan = moment().utc().startOf('month').format();

        return {
          dateFilterGreaterThan: dateFilterGreaterThan,
          dateFilterLessThan: dateFilterLessThan,
        };
      case 'This year':
        dateFilterGreaterThan = moment().utc().startOf('year').format();

        return {
          dateFilterGreaterThan: dateFilterGreaterThan,
          dateFilterLessThan: dateFilterLessThan,
        };
    }
  };

  const handleDateFilterClick = (item, event) => {
    setDateFilterSelected(item);

    let dateFilter = getUTCDate(item);

    if (filterObjectSelected && filterObjectSelected.dateFilterLessThan) {
      //filter already exist
      filterObjectSelected.dateFilterLessThan = dateFilter.dateFilterLessThan;

      if (filterObjectSelected && filterObjectSelected.dateFilterGreaterThan) {
        //filter already exist
        filterObjectSelected.dateFilterGreaterThan =
          dateFilter.dateFilterGreaterThan;
      }
    } else {
      //first time filter
      filterObjectSelected = Object.assign(filterObjectSelected, dateFilter);
      setFilterObjectSelected(filterObjectSelected);
    }

    searchGroup(filterObjectSelected);
  };

  const removeDateFilterHandler = (item, event) => {
    event.stopPropagation();
    if (filterObjectSelected.dateFilterGreaterThan)
      delete filterObjectSelected.dateFilterGreaterThan;
    if (filterObjectSelected.dateFilterLessThan)
      delete filterObjectSelected.dateFilterLessThan;

    setDateFilterSelected(null);

    setFilterObjectSelected(filterObjectSelected);

    searchGroup(filterObjectSelected);
  };

  const handleGroupTypeFilterClick = (item, event) => {
    setGroupTypeFilterSelected(item);

    if (filterObjectSelected) {
      //filter already exist

      //check if categoryId exist, then update it else create new
      if (filterObjectSelected.catagoryId) {
        filterObjectSelected.catagoryId = item;
      } else {
        filterObjectSelected = Object.assign(filterObjectSelected, {
          catagoryId: item,
        });
      }
    } else {
      //first time filter add group and categoryId
      setFilterObjectSelected({});
    }

    searchGroup(filterObjectSelected);
  };

  const removeGroupTypeFilterHandler = (item, event) => {
    event.stopPropagation();

    if (filterObjectSelected.catagoryId) delete filterObjectSelected.catagoryId;

    setGroupTypeFilterSelected(null);

    setFilterObjectSelected(filterObjectSelected);

    searchGroup(filterObjectSelected);
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
                renderItem={(item) => (
                  <List.Item
                    onClick={(event) => handleDateFilterClick(item, event)}
                    className={dateFilterSelected === item ? ' selected' : ''}
                  >
                    {item}
                    {dateFilterSelected === item && (
                      <svg
                        className='svg-icon'
                        viewBox='0 0 20 20'
                        onClick={(event) =>
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
            {groupTypeFilters && groupTypeFilters.length > 0 && (
              <div className='col-xs-1 col-sm-1 col-md-6 col-lg-6'>
                <List
                  size='small'
                  header={<div>TYPE</div>}
                  bordered
                  dataSource={groupTypeFilters}
                  renderItem={(item) => (
                    <List.Item
                      onClick={(event) =>
                        handleGroupTypeFilterClick(item, event)
                      }
                      className={
                        groupTypeFilterSelected === item ? ' selected' : ''
                      }
                    >
                      {item}
                      {groupTypeFilterSelected === item && (
                        <svg
                          className='svg-icon'
                          viewBox='0 0 20 20'
                          onClick={(event) =>
                            removeGroupTypeFilterHandler(item, event)
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

const mapStateToProps = (state) => ({
  group: state.group,
});

export default connect(mapStateToProps, { searchGroup })(FilterPanel);
