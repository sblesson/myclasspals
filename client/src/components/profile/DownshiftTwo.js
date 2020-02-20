import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Downshift from 'downshift';
import PropTypes from 'prop-types';

import axios from 'axios';
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react';
import glamorous, { Div } from 'glamorous';
import debounce from 'lodash/debounce';
import { getSchoolData } from '../../actions/schools';
import {
  Menu,
  ControllerButton,
  Input,
  Item,
  ArrowIcon,
  XIcon
} from './DownshiftComponents';
import { connect } from 'react-redux';

import './styles.css';

const DownshiftTwo = ({ getSchoolData, schools }) => {
  /*   constructor(props) {
    super(props);
  

    //this.fetchSchools = this.fetchSchools.bind(this);
    //this.inputOnChange = this.inputOnChange.bind(this);
  } */

  const inputOnChange = event => {
    console.log(event.target.value);
    if (!event.target.value) {
      return;
    }
    fetchSchools(event.target.value);
  };
  const handleToggleButtonClick = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
      itemsToShow: schools
    }));
  };

  const fetchSchools = searchTerm => {
    setTimeout(() => {
      getSchoolData(searchTerm);
    }, Math.random() * 1000);
  };

  const itemToString = item => {
    console.log(item);
    //school = item;
    return item ? item.schoolName : '';
  };

  return (
    <Downshift itemToString={itemToString}>
      {({
        getInputProps,
        getToggleButtonProps,
        getItemProps,
        isOpen,
        toggleMenu,
        clearSelection,
        selectedItem,
        inputValue,
        getLabelProps,
        highlightedIndex
      }) => (
        <div>
          <Div position='relative' css={{ paddingRight: '1.75em' }}>
            <Label
              style={{ marginTop: '1rem', display: 'block' }}
              {...getLabelProps()}
            >
              Search your school
            </Label>{' '}
            <br />
            <Input
              {...getInputProps({
                placeholder:
                  'Type school or district or an address, city, zip...',
                onKeyUp: inputOnChange
              })}
            />
            {selectedItem ? (
              <ControllerButton
                css={{ paddingTop: 4 }}
                onClick={clearSelection}
                aria-label='clear selection'
              >
                <XIcon />
              </ControllerButton>
            ) : (
              <ControllerButton {...getToggleButtonProps()}>
                <ArrowIcon isOpen={isOpen} />
              </ControllerButton>
            )}
          </Div>
          {isOpen ? (
            <Menu>
              {schools.map((item, index) => (
                <Item
                  key={item.schoolid}
                  {...getItemProps({
                    item,
                    index,
                    isActive: highlightedIndex === index,
                    isSelected: selectedItem === item
                  })}
                >
                  {item.schoolName}
                </Item>
              ))}
            </Menu>
          ) : /*          <div className='downshift-dropdown'>
                {this.state.schools
                  .filter(
                    item =>
                      !inputValue ||
                      item.schoolName
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                  )
                  .slice(0, 10)
                  .map((item, index) => (
                    <div
                      className='dropdown-item'
                      {...getItemProps({ key: index, index, item })}
                      style={{
                        backgroundColor:
                          highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight: selectedItem === item ? 'bold' : 'normal'
                      }}
                    >
                      {item.schoolName}
                    </div>
                  ))}
              </div> */
          null}
        </div>
      )}
    </Downshift>
  );
};
DownshiftTwo.propTypes = {
  //school: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  schools: state.schools.results,
  isLoading: state.schools.isLoading
});
export default connect(mapStateToProps, { getSchoolData })(DownshiftTwo);
