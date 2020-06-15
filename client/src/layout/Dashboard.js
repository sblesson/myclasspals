import React from 'react';
import SingleGroup from '../components/groups/SingleGroup';

const Dashboard = ({ history }) => {
  return (
    <div className='post-container'>
      {/*       <PostFilters categories={categories} />
       */}
      <SingleGroup history={history} />
    </div>
  );
};

export default Dashboard;
