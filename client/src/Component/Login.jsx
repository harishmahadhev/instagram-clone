import React, { useContext, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./validation";
import { Loading, refreshPage, varCtx } from "./Shared";
import * as api from "../api/Api";
import Cookies from "js-cookie";

export default function Login() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const handleChange = () => {
    setShow((on) => !on);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const login = async (formdata) => {
    try {
      const { data } = await api.login(formdata);
      Cookies.set("--t", data.token);
      refreshPage();
    } catch (error) {
      const { data } = error.response;
      setMessage(data);
    }
  };

  const loginSubmit = async (data) => {
    setLoading(true);
    await login(data);
    setLoading(false);
  };

  const { loading, setLoading } = useContext(varCtx);
  return (
    <div className="login">
      <main>
        <div className="loginWrapper card">
          <h1>Instagram</h1>
          <form autoComplete="off" onSubmit={handleSubmit(loginSubmit)}>
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
              {message && <div className="loginError">{message.message}</div>}
              <button type="submit">{loading ? <Loading /> : "Login"}</button>
            </div>
          </form>
          <Link to="/forgotpassword" className="loginHelperText">
            Forgotten your password?
          </Link>
        </div>
        <div className="card helperText">
          <p>
            Don't have an account?
            <Link to="/signup">
              <span>Sign up</span>
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
