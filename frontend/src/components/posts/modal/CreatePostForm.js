import React from 'react';
import { Formik } from 'formik';
import DisplayCreatePostForm from './DisplayCreatePostForm';

const CreatePostForm = ({ group }) => {
  const initialValues = {
    groupId: group.currentGroup.id,
    subject: '',
    message: '',
    categoryId: 'Ask',
    postCategorySelectOptions: [
      'Ask',
      'Recommendation',
      'Q&A',
      'Homework',
      'Club',
    ],
  };
  const handleSubmit = (formProps) => {
    const { subject, message, categoryId } = formProps;
    alert(`subject: ${subject} \nSelected message: ${categoryId} \n`);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      render={DisplayCreatePostForm}
    />
  );
};

export default CreatePostForm;
