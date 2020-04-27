import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Downshift from 'downshift';
import { Div } from 'glamorous';
import { searchUser } from '../../../actions/auth';
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

const AutoCompleteUserSearch = ({ searchUser, auth }) => {
  auth.senderEmail = null;
  const endUserNameSelectHandler = selectedItem => {
    if (selectedItem && selectedItem.email) {
      auth.senderEmail = selectedItem.email;
    } else {
      auth.senderEmail = null;
    }
  };

  const endUserNameToString = (item, index) => {
    console.log(item);
    return item.email;
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
      searchUser(searchTerm);
    }, Math.random() * 1000);
  };

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
              {auth.searchUserResult && auth.searchUserResult.length > 0
                ? auth.searchUserResult.map((item, index) => (
                    <Item
                      key={item._id}
                      {...getItemProps({
                        item,
                        index
                        //isActive: highlightedIndex === index,
                        //isSelected: selectedItem === item
                      })}
                    >
                      {item.email}
                    </Item>
                  ))
                : 'No user found'}
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
export default connect(mapStateToProps, { searchUser })(AutoCompleteUserSearch);
