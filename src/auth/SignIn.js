import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./authentication.css";
import {
  authenticate,
  encryptMasterPassword,
  signIn,
} from "./helper/authHelper";
const { signInHelper } = require("./helper/authHelper");

const SignIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    // e.preventDefault();
    const {
      data: { signIn },
    } = await signInFunc({
      variables: {
        signInSignInInput: {
          email: email,
          password: password,
        },
      },
    });
    if (signIn) {
      localStorage.setItem("jwt", JSON.stringify(signIn));

      history.push("/");
    }
  };
  const [signInFunc] = useMutation(signInHelper);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center mt-20">
      <div className="text-center">
        <h1 className="font-bold text-4xl">Workspace Manager</h1>
      </div>

      <div
        style={{ boxShadow: "0 25px 25px rgba(0, 0, 0, 0.15)" }}
        className="w-96 mt-8 flex flex-col rounded p-10"
      >
        <h4 className="text-gray-500 text-center font-semibold">
          Login with workspace
        </h4>

        <input
          type="email"
          id="email"
          placeholder="Email"
          className="mt-4 p-2 rounded border-2 border-gray-200 focus:border-transparent focus:ring-2 focus:outline-none"
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
          onClick={handleSignIn}
          className="w-100 rounded text-white bg-green-500 p-2 font-semibold mt-3"
        >
          Sign In
        </button>
        <div className="felx mt-2 text-gray-500 text-center font-normal">
          Don't have an account, <a href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
