import React from 'react';
import { connect } from 'react-redux';
import { Select } from 'formik-antd';
import _ from 'lodash';
import { getCityData } from '../../../actions/address';
import { searchGroupWithFilters } from '../../../actions/group';
const AutoCompleteCitySearchWithFormik = ({
  getCityData,
  address,
  searchGroupWithFilters,
}) => {
  const Option = Select.Option;

  const handleCitySearch = (searchTerm) => {
    if (searchTerm) {
      var debounced = _.debounce(() => {
        getCityData(searchTerm);
      }, 1000);
      debounced();
    }
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
      //item.city + ', ' + item.state + ', ' + item.postalcode;

      return (
        <Option key={index} value={selectedAddress}>
          {item.city}, {item.statecode} <br />
          {item.postalcode}
        </Option>
      );
    });

  return (
    <Select
      name='citySelect'
      style={{ width: '100%' }}
      showSearch={true}
      allowClear={true}
      placeholder='Type city or zipcode'
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
})(AutoCompleteCitySearchWithFormik);
