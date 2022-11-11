import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function SignIn() {
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
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(formSubmit)}>
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
                message: 'Maybe you have an error in your password',
              },
            })}
          />
          {errors.password && <p className="form__error">{errors.password.message as string}</p>}
        </label>
        <p>
          Do not have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <button>Sign In</button>
      </form>
    </>
  );
}

export default SignIn;
