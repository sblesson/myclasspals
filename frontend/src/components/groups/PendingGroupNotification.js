import React, { useEffect } from 'react';

import { Button, notification } from 'antd';

const key = 'updatable';

const PendingGroupNotification = ({ pendingGroups }) => {
  const openNotification = () => {
    console.log('pendingGroups');

    console.log(pendingGroups);
    notification.open({
      key,
      message: 'Notification Title',
      description: 'description.',
    });
    setTimeout(() => {
      notification.open({
        key,
        message: 'New Title',
        description: 'New description.',
      });
    }, 1000);
  };
  useEffect(() => {
    if (pendingGroups && pendingGroups.length > 0)
      openNotification(pendingGroups);
  }, [pendingGroups]);

  return (
    <Button type='primary' onClick={openNotification}>
      Open the notification box
    </Button>
  );
};

export default PendingGroupNotification;
