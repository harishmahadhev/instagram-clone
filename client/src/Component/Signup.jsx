import React, { useContext, useState } from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "./validation";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { Loading, varCtx } from "./Shared";
import * as api from "../api/Api";

export default function Signup() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const handleChange = () => {
    setShow((on) => !on);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });

  const signup = async (formdata) => {
    try {
      const { data } = await api.signup(formdata);
      setMessage(data.message);
    } catch (error) {
      const { data } = error.response;
      setMessage(data);
    }
  };

  const loginSubmit = async (data) => {
    setLoading(true);
    await signup(data);
    setLoading(false);
  };
  const { loading, setLoading } = useContext(varCtx);

  return (
    <div className="login">
      <main>
        <div className="loginWrapper card">
          <div className="loginTitle">
            <h1>Instagram</h1>
            <h2>Sign up to see photos and videos from your friends.</h2>
          </div>
          <form onSubmit={handleSubmit(loginSubmit)} autoComplete="off">
            <div className="loginInput">
              <input
                type="text"
                name="email"
                placeholder="Email address"
                {...register("email")}
              />
              {errors.email && (
                <div className="loginError">{errors.email.message}</div>
              )}
              <input
                type="text"
                name="name"
                placeholder="Username"
                {...register("name")}
              />
              {errors.name && (
                <div className="loginError">{errors.name.message}</div>
              )}
              <div className="loginInputPassword">
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  {...register("password")}
                />
                <div className="passwordButton" onClick={handleChange}>
                  <i
                    className={`fa fa-eye${show ? "-slash" : ""}`}
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
              {errors.password && (
                <div className="loginError">{errors.password.message}</div>
              )}
              {message && <div className="loginError">{message}</div>}
              <button type="submit">{loading ? <Loading /> : "Sign Up"}</button>
            </div>
          </form>
          <div className="text-center loginCondition">
            By signing up, you agree to our Terms, Data Policy and Cookie
            Policy.
          </div>
        </div>
        <div className="card helperText">
          <p>
            Have an account?
            <Link to="/login">
              <span>Log in</span>
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
