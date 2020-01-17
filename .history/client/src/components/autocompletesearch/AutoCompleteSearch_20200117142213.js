import _ from 'lodash';
import React, { useState } from 'react';
import { Search, Grid, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
const source = _.times(5, () => ({
  title: 'yahoo',
  description: 'cool',
  price: '$20'
}));

const AutoCompleteSearch = ({ isLoading, results, value }) => {
  const initialState = {
    isLoading: false,
    results: [],
    value: ''
  };

  const [searchFormData, setSearchFormData] = useState({
    isLoading: false,
    results: [],
    value: ''
  });

  const handleResultSelect = (e, { result }) =>
    setSearchFormData({ ...searchFormData, value: result.title });

  const handleSearchChange = (e, { value }) => {
    setSearchFormData({ ...searchFormData, isLoading: true, value: value });

    setTimeout(() => {
      if ((searchFormData.value === '' && searchFormData.value.length < 1)
        setSearchFormData(initialState);

      const re = new RegExp(_.escapeRegExp(searchFormData.value), 'i');
      const isMatch = result => re.test(result.title);

      setSearchFormData({
        isLoading: false,
        results: _.filter(source, isMatch)
      });
    }, 300);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Search
          fluid
          loading={searchFormData.isLoading}
          onResultSelect={handleResultSelect}
          onSearchChange={_.debounce(handleSearchChange, 500, {
            leading: true
          })}
          results={searchFormData.results}
          value={searchFormData.value}
        />
      </Grid.Column>
    </Grid>
  );
};

/* const mapStateToProps = function(state) {
  return {
    isLoading: state.autosearch.isLoading,
    results: state.autosearch.results,
    value: state.autosearch.value
  }
} */

//export default connect(mapStateToProps, { })(AutoCompleteSearch);

export default AutoCompleteSearch;
