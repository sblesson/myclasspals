import React from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';

import { getCityData } from '../../../actions/address';
import { searchGroupWithFilters } from '../../../actions/group';
const AutoCompleteCitySeach = ({
  getCityData,
  address,
  searchGroupWithFilters,
}) => {
  const Option = Select.Option;

  const handleCitySearch = (searchTerm) => {
    setTimeout(() => {
      getCityData(searchTerm);
    }, Math.random() * 1000);
  };

  const onCitySelect = (value, option) => {
    if (address && address.results && address.results.length > 0 && value) {
      //update selected address in the reducer
      address.selectedAddress = JSON.parse(value);
      searchGroupWithFilters({
        zipcode: address.selectedAddress.postalcode,
        city: address.selectedAddress.city,
      });
    }
  };

  const children =
    address &&
    address.results &&
    address.results.length > 0 &&
    address.results.map((item, index) => {
      let selectedAddress = JSON.stringify(item);

      return (
        <Option key={index} value={selectedAddress}>
          {item.city}, {item.statecode} <br />
          {item.postalcode}
        </Option>
      );
    });

  return (
    <Select
      style={{ width: '100%' }}
      showSearch={true}
      allowClear={true}
      placeholder='Search by city or zipcode'
      onSearch={handleCitySearch}
      onSelect={onCitySelect}
    >
      {children}
    </Select>
  );
};
const mapStateToProps = (state) => ({
  address: state.address,
});
export default connect(mapStateToProps, {
  getCityData,
  searchGroupWithFilters,
})(AutoCompleteCitySeach);
