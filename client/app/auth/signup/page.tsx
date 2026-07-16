'use client';
import axios, { AxiosError } from 'axios';
import { SubmitEvent, useState } from 'react';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([{ message: '' }]);

  const onSubmit = async (event: SubmitEvent) => {
    setErrors([]);
    event.preventDefault();
    try {
      await axios.post('/api/users/signup', {
        email,
        password,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrors(error.response?.data.errors);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 m-4">
      <h1 className="text-5xl">Sign Up</h1>
      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          id="email"
          className="border border-gray-400"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          className="border border-gray-400"
        />
      </div>
      {errors.length > 0 && (
        <div className="bg-red-200">
          <h4>Ooops....</h4>
          <ul>
            {errors.map((err) => (
              <li className="text-red-800" key={err.message}>
                {err.message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button className="cursor-pointer w-fit bg-blue-600 text-background rounded-xs px-4 py-1">
        Sign Up
      </button>
      <div>{email}</div>
    </form>
  );
}
