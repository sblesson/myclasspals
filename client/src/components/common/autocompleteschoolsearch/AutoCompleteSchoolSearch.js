import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Downshift from 'downshift';
import { Div } from 'glamorous';
import { getSchoolData } from '../../../actions/school';

import {
  SubmitButton,
  Input,
  Checkbox,
  Radio,
  ResetButton,
  FormikDebug,
  Form,
  FormItem
} from 'formik-antd';
import {
  Menu,
  ControllerButton,
  //Input,
  Item,
  ArrowIcon,
  XIcon
} from '../DownshiftComponents';
import { Formik, ErrorMessage } from 'formik';

import './AutoCompleteSchoolSearch.scss';

const AutoCompleteSchoolSearch = ({ getSchoolData, school }) => {
  const [selectedSchool, setSelectedSchool] = useState('');

  const inputOnChange = event => {
    console.log(event.target.value);
    if (!event.target.value) {
      return;
    }
    fetchSchools(event.target.value);
  };

  const schoolNameSelectHandler = selectedItem => {
    console.log(selectedItem);
    setSelectedSchool(selectedItem);
  };

  const fetchSchools = searchTerm => {
    setTimeout(() => {
      getSchoolData(searchTerm);
    }, Math.random() * 1000);
  };

  const schoolNameToString = (item, index) => {
    console.log(item);
    return item ? item.schoolName : '';
  };

  return (
    <Downshift
      onChange={selectedItem => schoolNameSelectHandler(selectedItem)}
      itemToString={schoolNameToString}
    >
      {({
        getInputProps,
        getToggleButtonProps,
        getItemProps,
        isOpen,
        clearSelection,
        selectedItem,
        highlightedIndex
      }) => (
        <div>
          <Div position='relative' css={{ paddingRight: '1.75em' }}>
            {/*       <Input
              {...getInputProps({
                placeholder: 'Type email or name ...',
                onKeyUp: inputOnChange
              })}
            /> */}
            <input
              {...getInputProps({
                placeholder: 'Type school or district or city, zip...',
                onKeyUp: inputOnChange
              })}
            />

            {selectedItem ? (
              <ControllerButton
                css={{ paddingTop: 4, top: 5 }}
                onClick={clearSelection}
                aria-label='clear selection'
              >
                <XIcon />
              </ControllerButton>
            ) : (
              <ControllerButton {...getToggleButtonProps()}>
                <ArrowIcon isOpen={isOpen} className='icon-auto-open' />
              </ControllerButton>
            )}
          </Div>
          {isOpen ? (
            <Menu>
              {school && school.results.length > 0
                ? school.results.map((item, index) => (
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
                  ))
                : 'No school found'}
            </Menu>
          ) : null}
        </div>
      )}
    </Downshift>
  );
};
const mapStateToProps = state => ({
  school: state.school
});
export default connect(mapStateToProps, { getSchoolData })(
  AutoCompleteSchoolSearch
);
