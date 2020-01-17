import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    skills
  }
}) => {
  return (
    <div className='profiles__list bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div className='profiles__details'>
        <h4 className='heading-4 heading-4--light'>{name}</h4>
        <p className='profiles__info'>
          {status} {company && <span> at {company}</span>}
        </p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          My Profile
        </Link>
      </div>
      <ul>
        {interests.slice(0, 4).map((interest, index) => (
          <li key={index} className='text-primary'>
            <i className='fas fa-check' /> {interest}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
