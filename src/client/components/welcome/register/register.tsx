import React, { useEffect, useState } from 'react';
import './style.css';
import { useForm } from 'react-hook-form';
import { RegisterDto } from '../../../../auth/dto/register.dto';
import Axios from 'axios';

interface errorMsg {
  message: string | null;
}

export const Register = () => {
  const { register, handleSubmit, watch, errors } = useForm();

  const [error, setError] = useState<errorMsg | null>();

  const onSubmit = async (userData: RegisterDto) => {
    try {
      const { data } = await Axios.post('../auth/register', userData);
      if (!data.error) {
        // refresh or something
        location.replace("/");
      } else {
        const { error } = data;
        if (error.message) {
          setError(error.message);
          console.log('Error in submitting form', error.message);
        }
      }
    } catch (err) {
      console.log('Error in submitting form', err);
    }
  };

  const [user, setUser] = useState<RegisterDto>({
    name: '',
    email: '',
    password: '',
  });

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {error !== null && <div className="message">{error}</div>}
          <div className="name">
            <label htmlFor="name">User Name</label>
            <input
              type="text"
              name="name"
              ref={register({ pattern: /^[A-Za-z0-9]+$/i, required: true })}
            />
          </div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              ref={register({ required: true })}
            />
          </div>
          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              ref={register({ min: 7, required: true })}
            />
          </div>
          <div className="submit">
            <button>Register Me</button>
          </div>
        </form>
      </div>
    </div>
  );
};
// export default SignUp;
