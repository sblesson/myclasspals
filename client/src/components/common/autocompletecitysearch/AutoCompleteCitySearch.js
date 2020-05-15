import React from 'react';
import { connect } from 'react-redux';
import { Select } from 'formik-antd';

import { getCityData } from '../../../actions/address';

const AutoCompleteCitySeach = ({ getCityData, address }) => {
  const Option = Select.Option;

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
      let selectedAddress = JSON.stringify(item);

      return (
        <Option key={index} value={selectedAddress}>
          {item.city}, {item.statecode} {item.postalcode}
        </Option>
      );
    });

  return (
    <Select
      name='citySelect'
      showSearch
      placeholder='Select your city'
      onSearch={handleCitySearch}
      onChange={onCitySelect}
    >
      {children}
    </Select>
  );
};
const mapStateToProps = state => ({
  address: state.address
});
export default connect(mapStateToProps, { getCityData })(AutoCompleteCitySeach);
