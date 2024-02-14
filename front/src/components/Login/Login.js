import React, { useState } from "react";
import style from "./Login.module.css";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from "../../Store";

const Login = () => {
  const { setUser } = useUserStore();
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
      console.log(response)
      const fetchUser = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}api/users/user`, { withCredentials: true });
          setUser(response.data.data)
        } catch (err) {
          console.error("Error fetching user data:", err);
          setUser(null)
        }
      }
      await fetchUser()
      const { user } = useUserStore.getState();

      if (user && user.role === 'admin') {
        navigate("/dashboard", { replace: true });
      } else if (user && user.role === 'user') {
        navigate("/", { replace: true });
      }

    } catch (error) {
      console.error("Error during login:", error);

      if (error.response) {
        const errorData = error.response.data;
        setError("email", { type: "manual", message: errorData.message || "Authentication failed" });
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
      <h1 className={style.title}>Welcome Back</h1>
      <button className={style.google}>Login with Google</button>
      <p>
        <span>---</span> OR <span>---</span>
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
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
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className={style.input}
          />
          <FaRegEye
            onClick={() => setShowPassword(!showPassword)}
            className={style.eyeIcon}
          />
          <small className={style.textDanger}>{errors.password?.message}</small>
        </div>
        <p className={style.text}>
          Don't have an account?
          <Link to="/signup" className={style.signup}>
            Sign Up
          </Link>
        </p>
        <small className={style.textDanger}>{errors.email?.message}</small>
        <button
          type="submit"
          className={`${style.btn} ${style.btnWarning} ${style.btnLg} ${style.btnBlock}`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
