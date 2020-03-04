import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { createProfile, getCurrentProfile } from '../../actions/profile';

import { Form, Button } from 'semantic-ui-react';

import Downshift from 'downshift';
import { isInteger } from 'lodash';
import { Div } from 'glamorous';
import { getSchoolData } from '../../actions/school';
import {
  Menu,
  ControllerButton,
  Input,
  Item,
  ArrowIcon,
  XIcon
} from './DownshiftComponents';
import './AddChildForm.scss';
import './styles.css';

const AddChildForm = ({
  profileData,
  showwAddChildButton,
  getSchoolData,
  schools
}) => {
  const [community, setCommunityArray] = useState([
    {
      displayname: '',
      grade: '',
      classroom: '',
      schoolid: ''
    }
  ]);

  profileData.community = community;

  const handleAddMoreChild = event => {
    event.preventDefault();
    const updateArray = [...community];
    updateArray.push({
      displayname: '',
      grade: '',
      classroom: '',
      schoolid: ''
    });
    setCommunityArray(updateArray);
  };
  const inputOnChange = event => {
    console.log(event.target.value);
    if (!event.target.value) {
      return;
    }
    fetchSchools(event.target.value);
  };

  const gradeInputOnChange = event => {
    console.log(event.target.value);
    if (!event.target.value) {
      return;
    }
  };

  const classRoomInputOnChange = (event, index) => {
    console.log(event.currentTarget.value);
    console.log(index);

    if (!event && !event.currentTarget.value) {
      return;
    }
    console.log(index);
    community[index].classroom = event.currentTarget.value;
    //TODO
    //fetchClassRoom(event.target.value);
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

  let gradeOptions = [];

  let classRoomNames = [];

  const checkGradePreKOrKG = grade => {
    //check both are numbers, then create array
    grade = grade.toUpperCase();
    if (
      grade === 'PK' ||
      grade === 'TK' ||
      grade === 'PRE-K' ||
      grade === 'PREK' ||
      grade === 'KG'
    ) {
      return true;
    }

    return false;
  };

  const setGrade = grade => {
    gradeOptions.push({ key: grade, text: grade, value: grade });
  };

  const setGradeOptions = (lowGrade, highGrade) => {
    console.log(gradeOptions);
    gradeOptions = [];
    let isLowGradePreKorKG = false,
      isHighGradePreKorKG = false;

    if (!isInteger(parseInt(lowGrade))) {
      isLowGradePreKorKG = checkGradePreKOrKG(lowGrade);
    }

    if (!isInteger(parseInt(highGrade))) {
      isHighGradePreKorKG = checkGradePreKOrKG(lowGrade);
    }

    if (isLowGradePreKorKG && isHighGradePreKorKG) {
      if (lowGrade === highGrade) {
        setGrade(lowGrade);
      } else if (lowGrade === 'PK' && highGrade === 'KG') {
        setGrade(lowGrade);
        setGrade('TK');
        setGrade(highGrade);
      } else {
        setGrade(highGrade);
      }
    } else if (isLowGradePreKorKG) {
      if (lowGrade === 'PK' || lowGrade == 'Pre-K' || lowGrade === 'PreK') {
        setGrade(lowGrade);
        lowGrade = 'TK';
        setGrade(lowGrade);
        lowGrade = 'KG';
        setGrade(lowGrade);
        lowGrade = 1;
      }
    }

    if (isInteger(parseInt(highGrade)) && isInteger(parseInt(lowGrade))) {
      for (var i = lowGrade; i <= highGrade; i++) {
        setGrade(i);
      }
    }

    console.log(gradeOptions);
  };

  const getGradeOptions = () => {
    return gradeOptions;
  };

  const schoolNameToString = (item, index) => {
    console.log(item);
    //community[index].school = item;
    if (item) setGradeOptions(item.lowGrade, item.highGrade);
    return item ? item.schoolName : '';
  };

  const gradeToString = item => {
    console.log(item);
    //community[index].grade = item;
    console.log(community);

    return item ? item.text : '';
  };

  const classRoomToString = item => {
    console.log(item);
    //community[index].classroom = item;
    console.log(community);

    return item ? item : '';
  };

  const schoolNameSelectHandler = (selectedItem, index) => {
    console.log(selectedItem);
    console.log(index);
    community[index].schoolid = selectedItem.schoolid;
  };

  const gradeSelectHandler = (selectedGrade, index) => {
    console.log(selectedGrade);
    console.log(index);
    community[index].grade = selectedGrade.value;
  };

  const classRoomSelectHandler = (selectedClassRoom, index) => {
    console.log(selectedClassRoom);
    console.log(index);
    community[index].grade = selectedClassRoom;
  };

  const yourInfo =
    community !== null &&
    community.length > 0 &&
    community.map((childData, index) => (
      <div key={index}>
        <Form>
          <Form.Field
            control={Input}
            placeholder='Display Name'
            name='displayname'
            defaultValue={childData.displayname}
            onChange={e => onChange(e, childData)}
            required
          />
          <Form.Field>
            <Downshift
              onChange={selectedItem =>
                schoolNameSelectHandler(selectedItem, index)
              }
              itemToString={schoolNameToString}
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
                <div className='auto-container'>
                  <Div position='relative' css={{ paddingRight: '1.75em' }}>
                    <Input
                      {...getInputProps({
                        placeholder:
                          'Type school or district or an address, city, zip...',
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
                  ) : null}
                </div>
              )}
            </Downshift>
          </Form.Field>
          <Form.Field>
            <Downshift
              onChange={selectedItem => gradeSelectHandler(selectedItem, index)}
              itemToString={gradeToString}
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
                <div className='auto-container'>
                  <Div position='relative' css={{ paddingRight: '1.75em' }}>
                    <Input
                      {...getInputProps({
                        placeholder: "Type your child's grade...",
                        onKeyUp: gradeInputOnChange
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
                        <ArrowIcon isOpen={isOpen} />
                      </ControllerButton>
                    )}
                  </Div>
                  {isOpen ? (
                    <Menu>
                      {gradeOptions.map((item, index) => (
                        <Item
                          key={item.key}
                          {...getItemProps({
                            item,
                            index,
                            isActive: highlightedIndex === index,
                            isSelected: selectedItem === item
                          })}
                        >
                          {item.text}
                        </Item>
                      ))}
                    </Menu>
                  ) : null}
                </div>
              )}
            </Downshift>
          </Form.Field>
          <Form.Field>
            {' '}
            <Downshift itemToString={classRoomToString}>
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
                <div className='auto-container'>
                  <Div position='relative' css={{ paddingRight: '1.75em' }}>
                    <Input
                      {...getInputProps({
                        placeholder: "Enter your child's class room name",
                        onKeyUp: event => classRoomInputOnChange(event, index)
                      })}
                    />
                    {selectedItem && classRoomNames.length ? (
                      <ControllerButton
                        css={{ paddingTop: 4, top: 5 }}
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
                  {isOpen && classRoomNames.length > 0 ? (
                    <Menu>
                      {classRoomNames.map((item, index) => (
                        <Item
                          key={item.key}
                          {...getItemProps({
                            item,
                            index,
                            isActive: highlightedIndex === index,
                            isSelected: selectedItem === item
                          })}
                        >
                          {item.text}
                        </Item>
                      ))}
                    </Menu>
                  ) : null}
                </div>
              )}
            </Downshift>
          </Form.Field>
        </Form>
      </div>
    ));
  const onChange = (e, childData) => {
    childData[e.target.name] = e.target.value;
  };

  return (
    <Fragment>
      {' '}
      <div class='profile-action-button'>
        <i class='fas fa-plus-circle'></i>
        <span class='add-more'>Add your child's class?</span>
      </div>
      {yourInfo}
    </Fragment>
  );
};

AddChildForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  profileData: PropTypes.object.isRequired,
  showwAddChildButton: PropTypes.bool
};
const mapStateToProps = state => ({
  profile: state.profile,
  isLoading: state.school.isLoading,
  schools: state.school.results,
  isSchoolLoading: state.school.isLoading
});
export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  getSchoolData
})(withRouter(AddChildForm));
