import React from 'react';
import _ from 'lodash';

export const getGroupPrivacyLabel = privacy => {
  if (privacy) {
    let groupPrivacy = privacy.toLowerCase();
    groupPrivacy = _.startCase(groupPrivacy);

    if (privacy === 'PRIVATE') {
      return (
        <span>
          <i className='fa fa-lock' title='private group'></i>&nbsp;
          {groupPrivacy}
        </span>
      );
    } else {
      return (
        <span>
          <i className='fa fa-globe' title='public group'></i>
          &nbsp;{groupPrivacy}
        </span>
      );
    }
  }
};
