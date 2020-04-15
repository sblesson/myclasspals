import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment, addCommentToSinglePost } from '../../../actions/post';
import { List } from 'antd';
import './FilterPanel.scss';

const FilterPanel = ({ categories }) => {
  const [filterPanel, setFilterPanel] = useState(false);

  const toggleFilterPanel = () => setFilterPanel(!filterPanel);
  const [text, setText] = useState('');
  const data = ['People', 'Groups'];

  const dateFilters = [
    'Last hour',
    'Today',
    'This week',
    'This month',
    'This year'
  ];
  return (
    <div className='post-filters'>
      <div className='filter-actions' onClick={toggleFilterPanel}>
        <i className='fas fa-filter filter-icon'></i>
        <span className='filter-label'> FILTER</span>
      </div>
      {filterPanel && (
        <div className='filter-panel'>
          <div className='row'>
            <div className='col-xs-1 col-sm-1 col-md-4 col-lg-4'>
              <List
                size='small'
                header={<div>DATE</div>}
                bordered
                dataSource={dateFilters}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </div>
            {categories && categories.length > 0 && (
              <div className='col-xs-1 col-sm-1 col-md-4 col-lg-4'>
                <List
                  size='small'
                  header={<div>CATEGORY</div>}
                  bordered
                  dataSource={categories}
                  renderItem={item => <List.Item>{item.title}</List.Item>}
                />
              </div>
            )}

            <div className='col-xs-1 col-sm-1 col-md-4 col-lg-4'>
              <List
                size='small'
                header={<div>TYPE</div>}
                bordered
                dataSource={data}
                renderItem={item => <List.Item>{item}</List.Item>}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(null, { addComment, addCommentToSinglePost })(
  FilterPanel
);
