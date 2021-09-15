import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Loading, varCtx } from "./Shared";
import { resetSchema } from "./validation";
import * as api from "../api/Api";
import { useParams } from "react-router";

export default function ResetPassword() {
  const [show, setShow] = useState(false);
  const handleChange = () => {
    setShow((on) => !on);
  };
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetSchema) });

  const { loading, setLoading } = useContext(varCtx);
  const [message, setMessage] = useState([]);

  const resetSubmit = async (formdata) => {
    try {
      formdata.token = token;
      setLoading(true);
      const { data } = await api.reset(formdata);
      setMessage(data.message);
      setLoading(false);
    } catch (error) {
      const { data } = error.response;
      setMessage(data.message);
    }
  };
  return (
    <div className="activate">
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
      <h1>Welcome to Instagram</h1>
      <div className="resetPassword">
        <input
          type="password"
          className="textfield"
          name="password"
          placeholder="Password"
        />
      </div>
      <form autoComplete="off" onSubmit={handleSubmit(resetSubmit)}>
        <div className="resetPassword">
          <input
            type={show ? "text" : "password"}
            name="password"
            placeholder="Confirm Password"
            {...register("password")}
          />
          <div className="passwordButton" onClick={handleChange}>
            <i
              className={`fa fa-eye${show ? "-slash" : ""}`}
              aria-hidden="true"
            ></i>
          </div>
        </div>
        <button className="activateButton">
          {loading ? <Loading type="bubbles" /> : "Reset"}
        </button>
        {errors.password && (
          <div className="loginError">{errors.password.message}</div>
        )}
        {message && <div className="loginError">{message}</div>}
      </form>
    </div>
  );
}
