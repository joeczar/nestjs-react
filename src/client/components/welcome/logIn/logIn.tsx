import React, { useEffect, useState } from 'react';
import '../signUp/style.css';
import { useForm } from 'react-hook-form';
import { LogInDto } from '../../../../auth/dto/logIn.dto';
import Axios from 'axios';

interface errorMsg {
  message: string | null;
}

export const LogIn = () => {
  const { register, handleSubmit, watch, errors } = useForm();

  const [error, setError] = useState<errorMsg | null>();

  const onSubmit = async (logInData: LogInDto) => {
    try {
      const { data } = await Axios.post('/auth/log-in', logInData);
      if (!data.error) {
        // refresh or something
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

  const [user, setUser] = useState<LogInDto>({
    email: '',
    password: '',
  });

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h2>Log in</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {error !== null && <div className="message">{error}</div>}
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
            <button>Log in</button>
          </div>
        </form>
      </div>
    </div>
  );
};
// export default SignUp;
