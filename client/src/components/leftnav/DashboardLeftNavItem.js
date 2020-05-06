import React, { useEffect } from 'react';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';

//import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';
import { Link } from 'react-router-dom';

const DashboardLeftNavItem = ({
  depthStep = 10,
  depth = 0,
  expanded,
  item,
  index,
  selectedItem,
  group,
  ...rest,
}) => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [selectedNavItem, setSelectedNavItem] = React.useState(null);

  const { title, icon, url, items, Icon, onClick: onClickProp } = item;

  useEffect(() => { 
    if(group && group.currentGroup && group.currentGroup.groupName){
      setSelectedNavItem(group.currentGroup.groupName);
    }
  }, [group.currentGroup]);


  const toggleCollapse = () => {
    setCollapsed(prevValue => !prevValue);
  };

  const handleLeftNavItemClick = (item, e) => {

    if (Array.isArray(items)) {
      toggleCollapse();
    }
    if (onClickProp) {
      onClickProp(e, item);
    }

    if(selectedNavItem !== item.title){
      setSelectedNavItem(item.title);
    }
  };

  let expandIcon;

  if (Array.isArray(items) && items.length) {
    expandIcon = !collapsed ? (
      <ExpandLessIcon
        className={
          'leftnav-sidebar-item-expand-arrow' +
          ' leftnav-sidebar-item-expand-arrow-expanded'
        }
      />
    ) : (
      <ExpandMoreIcon className='leftnav-sidebar-item-expand-arrow' />
    );
  }

  return (
    <div>
      <MenuItem
        className='leftnav-sidebar-item'
        onClick={event => handleLeftNavItemClick(item, event)}
        button
        dense
        {...rest}
        selected={selectedNavItem === item.title}
      >
        <div
          style={{ paddingLeft: depth * depthStep }}
          className='leftnav-sidebar-item-content'
        >
          {/*           {Icon && <Icon className='sidebar-item-icon' fontSize='small' />}
           */}{' '}
          <div className='leftnav-sidebar-item-text'>
            <i className={`${icon} leftnav-sidebar-item-icon`}></i>
            <Link to={`${url}`}>{title}</Link>
          </div>
        </div>
        {expandIcon}
      </MenuItem>
      <Collapse in={!collapsed} timeout='auto' unmountOnExit>
        {Array.isArray(items) ? (
          <List disablePadding dense>
            {items.map((subItem, index) => (
              <React.Fragment key={`${subItem.title}${index}`}>
                {subItem === 'divider' ? (
                  <Divider style={{ margin: '6px 0' }} />
                ) : (
                  <DashboardLeftNavItem
                    depth={depth + 1}
                    depthStep={depthStep}
                    item={subItem}
                  />
                )}
              </React.Fragment>
            ))}
          </List>
        ) : null}
      </Collapse>
    </div>
  );
};
export default DashboardLeftNavItem;
