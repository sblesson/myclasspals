import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Formik, ErrorMessage } from 'formik';
import {
  SubmitButton,
  Input,
  Form,
  Radio,
  FormItem,
  FormikDebug,
  Select
} from 'formik-antd';

import { addGroup } from '../../../actions/group';

import AutoCompleteSchoolSearch from '../../common/autocompleteschoolsearch/AutoCompleteSchoolSearch';

import GradeSelect from '../../common/gradeselect/GradeSelect';
const CreateGroupForm = ({
  auth,
  group,
  school,
  addGroup,
  current,
  onStepChange,
  setModal
}) => {
  const [isLoadingCreateBtn, setIsLoadingCreateBtn] = useState(false);

  //const [formData, setFormData] = useState({ user });
  const validateRequired = value => {
    return value ? undefined : 'required';
  };
  const [componentSize, setComponentSize] = useState('small');
  const inputOnChange = event => {
    if (!event.target.value) {
      return;
    }
    //fetchSchools(event.target.value);
  };

  const [isSchoolVisible, setIsSchoolVisible] = useState(true);
  const { Option } = Select;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };

  const showHideSchoolSelect = event => {
    if (event.target.value === 'yes') {
      setIsSchoolVisible(true);
    } else {
      setIsSchoolVisible(false);
    }
  };
  const submitProfileForm = (values, actions) => {
    values.userGroupMembers = [
      {
        _id: auth.user._id,
        name: auth.user.name,
        role: 'admin'
      }
    ];
    if (values.schoolSelect) {
      let schoolData = values.schoolSelect.split(',');

      values.schoolName = schoolData[0];
      values.schoolCity = schoolData[1];
      values.schoolState = schoolData[2];
      values.schoolZipCode = schoolData[3];

      //delete schoolData property
      delete values.schoolSelect;
    }

    addGroup(JSON.stringify(values), cancelTokenSrc => {
      setIsLoadingCreateBtn(false);
      //if (cancelTokenSrc) cancelTokenSrc.cancel();
    });
    //actions.setSubmitting(false);
    actions.resetForm();
    onStepChange(current + 1);
  };

  const groupForm = (
    <Formik
      initialValues={{
        groupName: '',
        privacy: 'PUBLIC',
        isSchoolGroup: 'yes',
        grade: ''
      }}
      onSubmit={(values, actions) => {
        setIsLoadingCreateBtn(true);
        submitProfileForm(values, actions);
      }}
      validator={() => ({})}
      //validate={values => {}}
      render={() => (
        <div style={{ flex: 1, padding: 10 }}>
          <Form
            className='form-wrapper'
            {...formItemLayout}
            layout='vertical'
            initialValues={{
              size: componentSize
            }}
          >
            <FormItem
              name='groupName'
              label='Group Name'
              required={true}
              validate={validateRequired}
            >
              <Input name='groupName' placeholder='Group Name' />
            </FormItem>

            <FormItem
              name='groupDiscovery'
              label='Group Discoverability'
              //required={true}
              //validate={validateRequired}
            >
              <Radio.Group
                name='privacy'
                options={[
                  {
                    label: 'Public',
                    value: 'PUBLIC'
                  },
                  {
                    label: 'Private',
                    value: 'PRIVATE'
                  }
                ]}
              />
            </FormItem>
            <FormItem name='schoolGroupLabel' label='School Group'>
              <Radio.Group
                name='isSchoolGroup'
                onChange={showHideSchoolSelect}
                options={[
                  { label: 'Yes', value: 'yes' },
                  { label: 'No', value: 'no' }
                ]}
              />
            </FormItem>

            {isSchoolVisible ? (
              <div>
                <FormItem
                  name='schoolData'
                  required={false}
                  label='Select School'
                  //validate={validateRequired}
                >
                  <AutoCompleteSchoolSearch />
                </FormItem>
                <FormItem
                  name='gradeLabel'
                  label='Select Grade'
                  //required={true}
                  //validate={validateRequired}
                >
                  <GradeSelect />
                </FormItem>
              </div>
            ) : (
              ''
            )}
            <SubmitButton
              className='ant-btn btn-primary'
              loading={isLoadingCreateBtn}
            >
              {' '}
              Create
            </SubmitButton>
          </Form>
          {/*    <pre style={{ flex: 1 }}>
            <FormikDebug />
          </pre> */}
        </div>
      )}
    />
  );

  return <Fragment>{groupForm}</Fragment>;
};

CreateGroupForm.propTypes = {
  //profileData: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  group: state.group,
  auth: state.auth,
  school: state.school.results
});

export default connect(mapStateToProps, {
  addGroup
})(withRouter(CreateGroupForm));
