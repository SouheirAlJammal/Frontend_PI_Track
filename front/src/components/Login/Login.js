import React, { useState } from "react";
import style from "./Login.module.css"; // Adjust the import path based on your project structure
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import {Link} from 'react-router-dom'
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data) => {
    try {
      setLoading(true);
      let response = await axios.post("/api/users/login", data);
      setLoginError("");
    } catch (error) {
      console.error("Error during login:", error);

      if (error.response) {
        const errorData = error.response.data;
        setLoginError(errorData.message || "Authentication failed");
      } else if (error.request) {
        setLoginError("No response from the server");
      } else {
        setLoginError("Error setting up the request");
      }
    } finally {
      setLoading(false);
    }
  };

  const loginOptions = {
    email: { required: "Email is required" },
    password: { required: "Password is required" },
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Welcome Back</h1>
      <button className={style.google}>Login with Google</button>
      <p>
        <span>---</span> OR <span>---</span>
      </p>
      <form onSubmit={handleSubmit(handleLogin)} className={style.form}>
        <div className={style.emailInput}>
          <input
            type="email"
            name="email"
            placeholder='Email'
            {...register("email", loginOptions.email)}
            className={style.input}
          />
          <small className={style.textDanger}>
            {errors?.email && errors.email.message}
          </small>
        </div>
        <div>
          <div className={style.passwordInput}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder='Password'
              {...register("password", loginOptions.password)}
              className={style.input}
            />
            {showPassword ? (
              <FaRegEyeSlash onClick={() => setShowPassword(false)} className={style.eyeIcon} />
            ) : (
              <FaRegEye onClick={() => setShowPassword(true)} className={style.eyeIcon} />
            )}
          </div>
          <small className={style.textDanger}>
            {errors?.password && errors.password.message}
          </small>
        </div>
        <p className={style.text}>Don't have an account?<Link to='/signup' className={style.signup}>Sign Up</Link></p>
        {loginError && <small className={style.textDanger}>{loginError}</small>}
        <button type="submit" className={`${style.btn} ${style.btnWarning} ${style.btnLg} ${style.btnBlock}`} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
