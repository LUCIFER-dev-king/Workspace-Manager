import React, { useState, useContext, useEffect } from "react";
import { signUpHelper } from "./helper/authHelper";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";

const SignUp = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

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
    if (res.data) {
      history.push("/signin");
    }
    console.log(res);
  };

  const [signUpFunc] = useMutation(signUpHelper);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center mt-20">
      <div className="text-center">
        <h1 className="font-bold text-4xl">Workspace Manager</h1>
      </div>

      <div
        style={{ boxShadow: "0 25px 25px rgba(0, 0, 0, 0.15)" }}
        className="w-96 mt-8 flex flex-col rounded p-10"
      >
        <h4 className="text-gray-500 text-center font-semibold">Let's begin</h4>

        <input
          type="name"
          id="name"
          placeholder="Name"
          className="rounded border-2 border-gray-200 focus:border-transparent focus:ring-2 focus:outline-none mt-4  p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          id="email"
          placeholder="Email"
          className="rounded mt-2  border-2 border-gray-200 focus:border-transparent focus:ring-2 focus:outline-none p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          className="mt-2  rounded border-2 border-gray-200 focus:border-transparent focus:ring-2 focus:outline-none p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          onClick={handleSignUpSubmit}
          className="w-100 rounded text-white bg-green-500 p-2 font-semibold mt-3"
        >
          Sign Up
        </button>
        <div className="felx mt-2 text-gray-500 text-center font-normal">
          Already have an account, <a href="/signin">Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
