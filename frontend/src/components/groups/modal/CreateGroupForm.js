import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Tooltip } from 'antd';

import { Formik, ErrorMessage } from 'formik';
import {
  SubmitButton,
  Input,
  Form,
  Radio,
  FormItem,
  FormikDebug,
  Select,
  Switch,
} from 'formik-antd';

import { addGroup } from '../../../actions/group';

import AutoCompleteSchoolSearch from '../../common/autocompleteschoolsearch/AutoCompleteSchoolSearch';
import AutoCompleteCitySearch from '../../common/autocompletecitysearch/AutoCompleteCitySearch';

import GradeSelect from '../../common/gradeselect/GradeSelect';
const CreateGroupForm = ({ auth, group, addGroup, setModal, history }) => {
  const [isLoadingCreateBtn, setIsLoadingCreateBtn] = useState(false);

  //const [formData, setFormData] = useState({ user });
  const validateRequired = (value) => {
    return value ? undefined : 'required';
  };
  const [componentSize, setComponentSize] = useState('small');
  const inputOnChange = (event) => {
    if (!event.target.value) {
      return;
    }
    //fetchSchools(event.target.value);
  };

  const [isSchoolVisible, setIsSchoolVisible] = useState(true);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const showHideSchoolSelect = (value, event) => {
    setIsSchoolVisible(value);
  };
  const submitProfileForm = (values, actions) => {
    setIsLoadingCreateBtn(true);

    values.userGroupMembers = [
      {
        _id: auth.user._id,
        name: auth.user.name,
        role: 'admin',
      },
    ];
    if (values.schoolSelect) {
      let schoolData = values.schoolSelect.split(',');

      values.schoolName = schoolData[0];
      values.schoolCity = schoolData[1];
      values.schoolState = schoolData[2];
      values.schoolZipCode = schoolData[3];
      delete values.schoolSelect;
    }

    addGroup(JSON.stringify(values), (response) => {
      setModal(false);
      console.log(response);
      if (response && response.userGroup && response.userGroup.id) {
        history.push('/dashboard/' + response.userGroup.id);
      }
    });
    //actions.setSubmitting(false);
    actions.resetForm();
    setIsLoadingCreateBtn(false);
  };

  const groupForm = (
    <Formik
      initialValues={{
        groupName: '',
        privacy: 'PRIVATE',
        role: 'admin',
        isSchoolGroup: true,
      }}
      onSubmit={(values, actions) => {
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
              size: componentSize,
            }}
          >
            <FormItem
              name='groupName'
              label='Group Name'
              required={true}
              validate={validateRequired}
            >
              <Input name='groupName' placeholder='Group Name or Room Name' />
            </FormItem>
            <FormItem
              name='isSchoolGroup'
              label='Are you creating this group for school?'
            >
              <Switch
                name='isSchoolGroup'
                checkedChildren='Yes'
                unCheckedChildren='No'
                onClick={(value, event) => showHideSchoolSelect(value, event)}
              />
            </FormItem>
            {isSchoolVisible ? (
              <>
                {' '}
                <FormItem
                  name='schoolSelect'
                  label='Select School'
                  required={true}
                  validate={validateRequired}
                >
                  <AutoCompleteSchoolSearch />
                </FormItem>
                <FormItem
                  name='gradeSelect'
                  label='Select Grade'
                  required={true}
                  validate={validateRequired}
                >
                  <GradeSelect />
                </FormItem>{' '}
              </>
            ) : (
              <FormItem
                name='cityGroupSelect'
                //required={true}
                label='Select City'
                //validate={validateRequired}
              >
                <AutoCompleteCitySearch />
              </FormItem>
            )}

            <FormItem
              name='groupDiscovery'
              label='Group Privacy'
              //required={true}
              //validate={validateRequired}
            >
              <Select name='privacy' defaultValue='PRIVATE'>
                <Select.Option
                  value='PRIVATE'
                  title='Private – Needs approval for membership, only members can
                  view post.'
                >
                  Private – Needs approval for membership, post only members can
                  view.
                </Select.Option>
                <Select.Option
                  value='PUBLIC'
                  title='Public – Anyone can join, see posts etc.'
                >
                  Public – Anyone can join, see posts etc.
                </Select.Option>
              </Select>
            </FormItem>
            <FormItem
              name='aboutGroup'
              label='About Group'
              style={{ marginBottom: 16 }}
              required={false}
            >
              <Input.TextArea
                className='post-form-text-input post-form-textarea'
                name='aboutGroup'
                cols='50'
                rows='3'
                placeholder='Describe your group&#39;s purpose'
              />
            </FormItem>
            <FormItem name='groupRules' label='Group Rules' required={false}>
              <Input.TextArea
                className='post-form-text-input post-form-textarea'
                name='groupRules'
                cols='50'
                rows='3'
                placeholder='Start with the right tone by sharing your purpose and rules for your group. You can come back and edit this later, too. Note: all groups operate under myclasspals&#39;s global guidelines in addition to the guidelines you choose.'
              />{' '}
            </FormItem>
            <SubmitButton
              className='ant-btn btn-primary'
              loading={isLoadingCreateBtn}
            >
              {' '}
              Create
            </SubmitButton>
          </Form>
          <pre style={{ flex: 1 }}>
            <FormikDebug />
          </pre>
        </div>
      )}
    />
  );

  return <Fragment>{groupForm}</Fragment>;
};

CreateGroupForm.propTypes = {
  //profileData: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  group: state.group,
  auth: state.auth,
  school: state.school.results,
});

export default connect(mapStateToProps, {
  addGroup,
})(withRouter(CreateGroupForm));
