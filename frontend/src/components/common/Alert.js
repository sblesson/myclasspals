import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'antd';

const AlertComponent = ({ alerts }) => {
  const isMountedRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, [isMountedRef]);
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => {
      if (alert) {
        return (
          <Alert
            key={alert.id}
            message={alert.msg}
            banner
            type={alert.alertType}
            closable
          />
        );
      }
    })
  );
};

AlertComponent.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(AlertComponent);
