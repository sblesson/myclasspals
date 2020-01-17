import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import LeftNavItem from './LeftNavItem';

import './LeftNav.scss';

const LeftNav = () => {
  let depthStep = 10,
    depth = 0,
    expanded;

    }
  ];
  return (
    <div className='sidebar'>
      <List disablePadding dense>
        {items.map((sidebarItem, index) => (
          <React.Fragment key={`${sidebarItem.name}${index}`}>
            {sidebarItem === 'divider' ? (
              <Divider style={{ margin: '6px 0' }} />
            ) : (
              <LeftNavItem
                depthStep={depthStep}
                depth={depth}
                expanded={expanded}
                item={sidebarItem}
              />
            )}
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default LeftNav;
