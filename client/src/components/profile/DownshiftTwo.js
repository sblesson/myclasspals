import React, { useEffect, Fragment } from 'react';
import ReactDOM from 'react-dom';
import Downshift from 'downshift';
import { Dropdown } from 'semantic-ui-react';
import { debounce, throttle, isInteger } from 'lodash';

import PropTypes from 'prop-types';

import axios from 'axios';
import { Search, Grid, Header, Segment, Label } from 'semantic-ui-react';
import { Div } from 'glamorous';
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

const DownshiftTwo = ({ getSchoolData, schools, school, grade, classroom }) => {
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

  const classRoomInputOnChange = event => {
    console.log(event.target.value);
    if (!event.target.value) {
      return;
    }
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

  const schoolNameToString = item => {
    console.log(item);

    school = item;
    if (item) setGradeOptions(item.lowGrade, item.highGrade);
    return item ? item.schoolName : '';
  };

  const gradeToString = item => {
    console.log(item);
    grade = item.text;

    return item ? item.text : '';
  };

  const classRoomToString = item => {
    console.log(item);

    classroom = item;

    return item ? item : '';
  };

  return (
    <Fragment>
      <Downshift itemToString={schoolNameToString}>
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

      <Downshift itemToString={gradeToString}>
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
                  onKeyUp: classRoomInputOnChange
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
    </Fragment>
  );
};
DownshiftTwo.propTypes = {
  school: PropTypes.object.isRequired,
  grade: PropTypes.string.isRequired,
  classroom: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
  schools: state.schools.results,
  isLoading: state.schools.isLoading
});
export default connect(mapStateToProps, { getSchoolData })(DownshiftTwo);
