import _ from 'lodash';
import React, { userState } from 'react';
import { Search, Grid, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
const source = _.times(5, () => ({
  title: 'yahoo',
  description: 'cool',
  price: '$20'
}));


const AutoCompleteSearch = ({ isLoading, results, value })=> {
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
  setSearchFormData({ ...formData, value: result.title });


  const handleSearchChange = (e, { value }) => {
    setSearchFormData({ ...formData, isLoading: true, value: value });


    setTimeout(() => {
      if (searchFormData.value.length < 1) return setSearchFormData(initialState);

      const re = new RegExp(_.escapeRegExp(searchFormData.value), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch)
      });
    }, 300);
  };

  render() {
    const { isLoading, value, results } = searchFormData;

    return (
      <Grid>
        <Grid.Column width={6}>
          <Search
            fluid
            loading={isLoading}
            onResultSelect={handleResultSelect}
            onSearchChange={_.debounce(handleSearchChange, 500, {
              leading: true
            })}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Segment>
            <Header>State</Header>
            <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(this.state, null, 2)}
            </pre>
            <Header>Options</Header>
            <pre style={{ overflowX: 'auto' }}>
              {JSON.stringify(source, null, 2)}
            </pre>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  
}

/* const mapStateToProps = function(state) {
  return {
    isLoading: state.autosearch.isLoading,
    results: state.autosearch.results,
    value: state.autosearch.value
  }
} */

//export default connect(mapStateToProps, { })(AutoCompleteSearch);

export default AutoCompleteSearch;
