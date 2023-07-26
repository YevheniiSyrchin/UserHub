import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../validations/validationts';
import { defaultFormValues } from '../constants/constants';

export interface FormData {
  title: string;
  body: string;
  comment: string | undefined;
}

interface AddPostFormProps {
  onSubmit: (data: FormData) => void;
}

const AddPostForm: FC<AddPostFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: defaultFormValues as FormData,
    resolver: yupResolver(validationSchema),
  });

  const [options, setOptions] = useState<'none' | 'comment'>('none');

  const handleFormSubmit = (data: FormData) => {
    if (data.title === 'title') {
      setError('title', {
        type: 'manual',
        message: 'Try something more original!',
      });
    } else {
      const postData = {
        title: data.title,
        body: data.body,
        comment: options === 'none' ? undefined : data.comment,
      };
      onSubmit(postData);
    }
  };

  const handleOptionsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOptions(event.target.value as 'none' | 'comment');
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="addForm">
        <div className="formItem">
          <label htmlFor="title" className="font-Roboto-Slab">
            Title
          </label>

          <div className="inputContainer">
            <input type="text" id="title" {...register('title')} />
            {errors.title && (
              <span className="errorMessage">{errors.title.message}</span>
            )}
          </div>
        </div>

        <div className="formItem">
          <label htmlFor="body" className="font-Roboto-Slab">
            Body
          </label>
          <div className="inputContainer">
            <textarea id="body" {...register('body')} />
            {errors.body && (
              <span className="errorMessage">{errors.body.message}</span>
            )}
          </div>
        </div>

        <div className="formItem">
          <label htmlFor="options" className="font-Roboto-Slab">
            Options
          </label>
          <div className="inputContainer">
            <select id="options" value={options} onChange={handleOptionsChange}>
              <option value="none">None</option>
              <option value="comment">Comment</option>
            </select>
          </div>
        </div>

        {options === 'comment' && (
          <div className="formItem">
            <label htmlFor="comment" className="font-Roboto-Slab">
              Comment
            </label>
            <div className="inputContainer">
              <input type="text" id="comment" {...register('comment')} />
              {errors.comment && <span>{errors.comment.message}</span>}
            </div>
          </div>
        )}

        <button className="formItem formButton" type="submit">
          Add Post
        </button>
      </div>
    </form>
  );
};

export default AddPostForm;
