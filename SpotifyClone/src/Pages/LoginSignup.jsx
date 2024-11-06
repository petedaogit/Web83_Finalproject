import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginSignup() {
  const navigate = useNavigate();

  const [state, setState] = useState("Sign up");
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    role: "",
    secretCode: "",
  });

  const url = "http://localhost:4000";

  const login = async () => {
    try {
      const { userName, password } = formData;
      const response = await axios.post(`${url}/api/user/login`, {
        userName,
        password,
      });
      if (response.status === 200) {
        console.log("Login Successfully!", response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error("Login failed!", error.message);
    }
  };
  const signup = async () => {
    try {
      const { userName, password, role, secretCode } = formData;

      console.log("check key");
      const response = await axios.post(`${url}/api/user/signup`, {
        userName,
        password,
        role,
        secretCode,
      });
      console.log("check axios");
      if (response.status === 200) {
        console.log("Signup successfull!");
        setState("Login");
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error("Signup failed!", error.message);
    }
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#121212] text-white h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{state}</h1>
        <div className="flex flex-col space-y-4">
          {state === "Sign up" ? (
            <div className="flex flex-col space-y-4">
              {" "}
              <p>Role</p>
              <input
                name="role"
                value={formData.role}
                onChange={changeHandler}
                type="text"
                placeholder="the Role you want to register"
                className="bg-[#242424] text-white border-gray-700 p-2 rounded"
              />
              <p>Admin Key</p>
              <input
                name="secretCode"
                value={formData.secretCode}
                onChange={changeHandler}
                type="text"
                placeholder="If register as admin, please provide key"
                className="bg-[#242424] text-white border-gray-700 p-2 rounded"
              />
            </div>
          ) : (
            <></>
          )}
          <p>User Name</p>
          <input
            name="userName"
            value={formData.userName}
            onChange={changeHandler}
            type="text"
            placeholder="Your username"
            className="bg-[#242424] text-white border-gray-700 p-2 rounded"
          />
          <p>Password</p>
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Your password"
            className="bg-[#242424] text-white border-gray-700 p-2 rounded"
          />
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              state === "Login" ? login() : signup();
            }}
          >
            Continue
          </button>
        </div>
        <div className="text-center mt-4">
          {state === "Sign up" ? (
            <p>
              Already have an account?{" "}
              <span
                className="text-green-500 cursor-pointer"
                onClick={() => {
                  setState("Login");
                }}
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              Create an account{" "}
              <span
                className="text-green-500 cursor-pointer"
                onClick={() => setState("Sign up")}
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
