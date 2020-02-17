import React, { useState } from 'react';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import axios from 'axios';
import { debounce, throttle, isInteger } from 'lodash';

import Autosuggest from 'react-autosuggest';
import SelectSearch from 'react-select-search';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSchool } from '../../actions/profile';
import { getSchoolDetails } from '../../actions/profile';

const AddSchoolForm = ({ addSchool, getSchoolDetails }) => {
  const [text, setText] = useState('');
  const [modal, setModal] = useState(false);
  const [school, setSchool] = React.useState('');
  const [suggestions, setSuggestions] = React.useState([]);
  const [grades, setGrades] = React.useState([]);

  const toggle = () => setModal(!modal);

  const loadSuggestions = async ({ value }) => {
    if (!value) {
      setSuggestions([]);
      return;
    }

    try {
      const url = `https://api.schooldigger.com/v1.2/autocomplete/schools?q=${value}&appID=02e5e1fb&appKey=516f6dd0da01a186ffedea905bec1041`;
      const response = await axios.get(url);
      console.log(response.data);
      setSuggestions(
        response.data.schoolMatches.map(row => ({
          name: row.schoolName,
          value: row.schoolName,
          schoolName: row.schoolName,
          schoolCity: row.city,
          schoolState: row.state,
          lowGrade: row.lowGrade,
          highGrade: row.highGrade,
          schoolLevel: row.schoolLevel
        }))
      );
    } catch (e) {
      setSuggestions([]);
    }
  };

  const debouncedLoadSuggestions = debounce(loadSuggestions, 500);

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const renderSuggestion = suggestion => {
    return (
      <div>
        {suggestion.schoolName}
        <br />
        {suggestion.schoolCity}, {suggestion.schoolState}
      </div>
    );
  };

  const checkGradePreKOrKG = grade => {
    //check both are numbers, then create array
    if (grade === 'PK' || grade === 'KG') {
      return true;
    }

    return false;
  };

  const setSchoolGrades = (lowGrade, highGrade) => {
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
        setGrades([lowGrade]);
      } else if (lowGrade === 'PK' && highGrade === 'KG') {
        setGrades([lowGrade]);
        setGrades([highGrade]);
      } else {
        setGrades([highGrade]);
      }
    } else if (isLowGradePreKorKG) {
      if (lowGrade === 'PK') {
        setGrades([lowGrade]);
        lowGrade = 'KG';
        setGrades([lowGrade]);
        lowGrade = 1;
      }
    }

    if (isInteger(parseInt(highGrade)) && isInteger(parseInt(lowGrade))) {
      for (var i = lowGrade; i < highGrade; i++) {
        console.log(i);
        setGrades(i);
      }
    }

    console.log(grades);
  };

  const onSuggestionSelected = (event, { suggestion, method }) => {
    if (method === 'enter') {
      event.preventDefault();
    }
    setSchool(suggestion.schoolName);
    setSchoolGrades(suggestion.lowGrade, suggestion.highGrade);
  };

  const inputProps = {
    placeholder: 'Search school name',
    autoComplete: 'abcd',
    value: school,
    name: 'school',
    onChange: (_event, { newValue }) => {
      setSchool(newValue);
    }
  };

  const getSuggestionValue = suggestion => suggestion.schoolName;

  const shouldRenderSuggestions = suggestion => {
    if (suggestion.length > 2) {
      return true;
    } else return false;
  };

  return (
    <div>
      <div className='post-form' onClick={toggle}>
        <Button color='primary' onClick={toggle}>
          Add School
        </Button>
      </div>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}> Add School</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup row>
              <Col sm={10}>
                <Input
                  type='text'
                  name='text'
                  placeholder='Child Name (optional)'
                />
              </Col>
            </FormGroup>
            <FormGroup tag='fieldset' row>
              <legend className='col-form-label'>Choose category</legend>
              <Col sm={10}>
                <FormGroup>
                  <Autosuggest
                    suggestions={suggestions}
                    inputProps={inputProps}
                    onSuggestionsFetchRequested={debouncedLoadSuggestions}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    onSuggestionSelected={onSuggestionSelected}
                    shouldRenderSuggestions={shouldRenderSuggestions}
                  />
                  <SelectSearch
                    options={suggestions}
                    value=''
                    placeholder='Choose grade'
                  />
                  <SelectSearch
                    options={gradeOptions}
                    value=''
                    placeholder='Choose grade'
                  />
                  <SelectSearch
                    options={classroomOptions}
                    value=''
                    placeholder='Choose classroom'
                  />
                </FormGroup>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={toggle}>
            Add
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

AddSchoolForm.propTypes = {
  addSchool: PropTypes.func.isRequired,
  getSchoolDetails: PropTypes.func.isRequired
};

export default connect(null, { addSchool, getSchoolDetails })(AddSchoolForm);
