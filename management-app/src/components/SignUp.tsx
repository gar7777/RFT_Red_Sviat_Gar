import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(formSubmit)}>
        <label>
          Name
          <input
            type="text"
            {...register('name', {
              required: 'Please, enter your name',
              minLength: { value: 2, message: 'Your name must be more than 2 symbols' },
            })}
          />
          {errors.name && <p className="form__error">{errors.name.message as string}</p>}
        </label>
        <label>
          Login
          <input
            type="text"
            {...register('login', {
              required: 'Please, enter login',
              minLength: { value: 3, message: 'Your login must be more than 3 symbols' },
            })}
          />
          {errors.login && <p className="form__error">{errors.login.message as string}</p>}
        </label>
        <label>
          Password
          <input
            type="text"
            {...register('password', {
              required: 'Please, enter password',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  'Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
              },
            })}
          />
          {errors.password && <p className="form__error">{errors.password.message as string}</p>}
        </label>
        <p>
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
        <button>Sign Up</button>
      </form>
    </>
  );
}

export default SignUp;
