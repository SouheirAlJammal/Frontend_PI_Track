import React, { useState } from "react";
import style from "./Login.module.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from "../../Store";
import google from '../../assets/google.png'
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const { setUser ,user } = useUserStore();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_ENDPOINT}api/users/login`, {
        email: data.email,
        password: data.password,
      }, { withCredentials: true });
      const fetchUser = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}api/users/user`, { withCredentials: true });
          setUser(response.data.data)  
          navigate('/')
       
        } catch (err) {
          console.error("Error fetching user data:", err);
          setUser(null)
        }
      }
      await fetchUser()

    
    } catch (error) {
      console.error("Error during login:", error);

      if (error.response) {
        const errorData = error.response.data;
        setError("email", { type: "manual", message: errorData.errors.email || "" });
        setError("password", { type: "manual", message: errorData.errors.password || "" });
      } else if (error.request) {
        setError("email", { type: "manual", message: "No response from the server" });
        setError("password", { type: "manual", message: "No response from the server" });
      } else {
        setError("email", { type: "manual", message: "Error setting up the request" });
        setError("password", { type: "manual", message: "Error setting up the request" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Welcome Back</h1>
      <button className={style.google} ><img loading='lazy' src={google} width={30} alt='google' /> Login with Google</button>
      <p className={style.orText}>
        <span>---</span> OR <span>---</span>
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <div className={style.emailInput}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="username"
            {...register("email", { required: "Email is required" })}
            className={style.input}
          />
          <FaEnvelope className={style.icon} />
          <small className={style.textDanger}>{errors.email?.message}</small>
        </div>
        <div className={style.passwordInput}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            {...register("password", { required: "Password is required" })}
            className={style.input}
          />
          {(!showPassword) ? <FaEye
            onClick={() => setShowPassword(!showPassword)}
            className={style.eyeIcon}
          /> :
            <FaEyeSlash
              onClick={() => setShowPassword(!showPassword)}
              className={style.eyeIcon} />
          }
          <small className={style.textDanger}>{errors.password?.message}</small>
        </div>
        <p className={style.text}>
          Don't have an account?
          <Link to="/signup" className={style.signup}>
            Sign Up
          </Link>
        </p>
        <button
          type="submit"
          className={`${style.btn}`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form> 
    </div>
  );
};

export default Login;
