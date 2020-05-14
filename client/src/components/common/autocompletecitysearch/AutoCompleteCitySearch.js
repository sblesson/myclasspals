import React from 'react';
import { connect } from 'react-redux';
import { AutoComplete } from 'antd';
import { getCityData } from '../../../actions/address';

const AutoCompleteCitySearch = ({ getCityData, address }) => {
  const Option = AutoComplete.Option;

  const handleCitySearch = searchTerm => {
    setTimeout(() => {
      getCityData(searchTerm);
    }, Math.random() * 1000);
  };

  const onCitySelect = (value, option) => {
    console.log(value);
    console.log(option);
    if (address && address.results && address.results.length > 0) {
      //update selected address in the reducer
      address.selectedAddress = address.results[option.key];
    }
  };

  const children =
    address &&
    address.results &&
    address.results.length > 0 &&
    address.results.map((item, index) => {
      let selectedAddress = item.city + ', ' + item.state;
      return (
        <Option key={index} value={selectedAddress}>
          <span style={{ fontWeigth: 'bolder' }}>
            {' '}
            {item.city}, {item.state}
          </span>
        </Option>
      );
    });

  return (
    <AutoComplete
      allowClear={true}
      backfill={true}
      style={{ width: '100%' }}
      onSelect={onCitySelect}
      onSearch={handleCitySearch}
      placeholder='Your City'
    >
      {children}
    </AutoComplete>
  );
};
const mapStateToProps = state => ({
  address: state.address
});
export default connect(mapStateToProps, { getCityData })(
  AutoCompleteCitySearch
);
