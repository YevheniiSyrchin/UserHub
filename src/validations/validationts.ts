import * as yup from 'yup';

export const validationSchema = yup.object({
  title: yup.string().required('This field is required'),
  body: yup.string().required('This field is required'),
  comment: yup.string(),
});
