import React, { useState } from "react";
import style from "./Signup.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, getValues, setError } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}api/users/signup`, {
        email: data.email,
        password: data.password,
        username: data.username,
      }, { withCredentials: true });

      console.log(response);

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error during sign-up:", error);

      if (error.response) {
        const errorData = error.response.data;
        setError("email", { type: "manual", message: errorData.message || "Registration failed" });
      } else if (error.request) {
        setError("email", { type: "manual", message: "No response from the server" });
      } else {
        setError("email", { type: "manual", message: "Error setting up the request" });
      } 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <div className={style.usernameInput}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            {...register("username", { required: "Username is required" })}
            className={style.input}
          />
          <small className={style.textDanger}>{errors.username?.message}</small>
        </div>
        <div className={style.emailInput}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className={style.input}
          />
          <small className={style.textDanger}>{errors.email?.message}</small>
        </div>
        <div className={style.passwordInput}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className={style.input}
          />
          <small className={style.textDanger}>{errors.password?.message}</small>
        </div>
        <div className={style.passwordInput}>
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm Password"
            {...register("passwordConfirmation", {
              required: "Password confirmation is required",
              validate: (value) => value === getValues("password") || "Passwords do not match",
            })}
            className={style.input}
          />
          <small className={style.textDanger}>{errors.passwordConfirmation?.message}</small>
        </div>
       
        <p className={style.text}>
          Already have an account?
          <Link to="/login" className={style.login}>
            Login
          </Link>
        </p>
        <button
          type="submit"
          className={`${style.btn} ${style.btnWarning} ${style.btnLg} ${style.btnBlock}`}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
