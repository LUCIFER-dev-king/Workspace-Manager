import React, { useState, useContext, useEffect } from "react";
import {
  encryptMasterPassword,
  signUp,
  signUpHelper,
} from "./helper/authHelper";
import { Link, useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
const { v4: uuidv4 } = require("uuid");

const SignUp = () => {
  const salt = uuidv4();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [encryptedPassword, setEncryptedPassword] = useState("");

  const handleSignUpSubmit = async (e) => {
    const res = await signUpFunc({
      variables: {
        signUpSignUpInput: {
          username: name,
          email: email,
          password: password,
        },
      },
    });
    console.log(res);
  };

  const [signUpFunc] = useMutation(signUpHelper);

  return (
    <div className='container fluid'>
      <div className='explore'>
        <Link to='/learn'>Explore</Link>
      </div>
      <div className='row'>
        <div className='col-md-4 offset-md-4 mt-5'>
          <section className='text-center'>
            <h1>Password Manager</h1>

            <h4 className='p-2'>Create your account</h4>

            <p>
              Already have an account,
              <Link to='signin'>
                <a>Sign Up</a>
              </Link>
            </p>
          </section>

          <section className='p-4'>
            <form action=''>
              <label className='p-1' htmlFor='name'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                className='form-control p-2'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className='p-1' htmlFor='email'>
                Email
              </label>
              <input
                type='email'
                name='email'
                id='email'
                className='form-control p-2'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className='p-1 mt-2' htmlFor='password'>
                Password
              </label>
              <input
                type='password'
                name='password'
                id='password'
                className='form-control p-2'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type='button'
                className='btn btn-secondary w-100 rounded mt-3'
                onClick={handleSignUpSubmit}
              >
                Sign Up
              </button>
            </form>
            <p className='mt-1 text-center'>
              <a href=''>Forgot password?</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
