import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Downshift from 'downshift';
import { Div } from 'glamorous';
import { getUser } from '../../../actions/auth';
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

import './AutoCompleteUserSearch.scss';

const AutoCompleteUserSearch = ({ getUser, auth }) => {
  const endUserNameSelectHandler = selectedItem => {
    console.log(selectedItem);
    //setSelectedSchool(selectedItem);
  };

  const endUserNameToString = (item, index) => {
    console.log(item);
    return item;
  };

  const inputOnChange = event => {
    console.log(event.target.value);
    if (!event.target.value) {
      return;
    }
    fetchUser(event.target.value);
  };

  const fetchUser = searchTerm => {
    setTimeout(() => {
      getUser(searchTerm);
    }, Math.random() * 1000);
  };

  const users = ['abc', 'bbb', 'ccc'];

  return (
    <Downshift
      onChange={selectedItem => endUserNameSelectHandler(selectedItem)}
      itemToString={endUserNameToString}
    >
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
            {/*       <Input
              {...getInputProps({
                placeholder: 'Type email or name ...',
                onKeyUp: inputOnChange
              })}
            /> */}
            <input
              {...getInputProps({
                placeholder: 'Type email or name ...',
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
              {users.map((item, index) => (
                <Item
                  key={index}
                  {...getItemProps({
                    item,
                    index,
                    isActive: highlightedIndex === index,
                    isSelected: selectedItem === item
                  })}
                >
                  {item}
                </Item>
              ))}
            </Menu>
          ) : null}
                            </div>
      )}
    </Downshift>
  );
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { getUser })(AutoCompleteUserSearch);
