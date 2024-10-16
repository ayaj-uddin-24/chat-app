import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Auth = () => {
  const [state, setState] = useState("Login");
  const [showPass, setShowPass] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(userData);
  };
  return (
    <div
      id="login"
      className="d-flex justify-content-center align-items-center flex-column vh-100 w-100 bg-dark text-white"
    >
      <h2 className="pb-5 fw-bold">Welcome to Cluder Chat App</h2>
      <form
        action="#"
        method="POST"
        className="shadow p-4 rounded-3 border"
        onSubmit={submitHandler}
      >
        <h1 className="text-center pb-3">{state}</h1>

        {state === "Login" ? (
          ""
        ) : (
          <div className="d-flex gap-3 mb-3">
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={changeHandler}
              id="username"
              placeholder="Username"
              className="form-control"
              required
            />
          </div>
        )}
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={changeHandler}
          id="email"
          placeholder="Your Email"
          className="form-control mb-3"
          required
        />
        <div className="position-relative">
          <input
            type={showPass ? "text" : "password"}
            name="password"
            value={userData.password}
            onChange={changeHandler}
            id="password"
            placeholder="Enter Password"
            className="form-control mb-3"
            required
          />
          <div
            className="position-absolute top-0 end-0 pt-1 pe-3 text-dark"
            id="icons"
          >
            <FaEyeSlash
              onClick={() => setShowPass(true)}
              className={`${showPass ? "d-none" : ""}`}
            />
            <FaEye
              onClick={() => setShowPass(false)}
              className={`${showPass ? "" : "d-none"}`}
            />
          </div>
        </div>
        <button type="submit" className="form-control btn btn-primary mb-3">
          Submit
        </button>
        <p className=" d-flex align-items-center gap-2">
          <input type="checkbox" name="terms" id="terms" />{" "}
          <span className="small">
            Continue with terms and policy of chat app
          </span>{" "}
        </p>
        {state === "Login" ? (
          <p className="small">
            Don't have an account ?{" "}
            <a
              className="text-decoration-none"
              onClick={() => setState("Register")}
            >
              Create Account
            </a>
          </p>
        ) : (
          <p className="small">
            Have an account?{" "}
            <a
              className="text-decoration-none"
              onClick={() => setState("Login")}
            >
              Login here
            </a>
          </p>
        )}
      </form>
    </div>
  );
};

export default Auth;
