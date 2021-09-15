import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { Loading, varCtx } from "./Shared";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotSchema } from "./validation";
import { useState } from "react/cjs/react.development";
import * as api from "../api/Api";

export default function Forgotpassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotSchema) });

  const { loading, setLoading } = useContext(varCtx);
  const [message, setMessage] = useState([]);

  const forgotSubmit = async (formdata) => {
    setLoading(true);
    const { data } = await api.forgot(formdata);
    setMessage(data);
    setLoading(false);
  };
  return (
    <div>
      <div className="login">
        <main>
          <div className="loginWrapper card">
            <h1>Instagram</h1>
            <p className="text-secondary text-center">
              Enter your email address, we'll send you a link to get back into
              your account.
            </p>
            <form autoComplete="off" onSubmit={handleSubmit(forgotSubmit)}>
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
                {message && <div className="loginError">{message.message}</div>}
                <button type="submit">
                  {loading ? <Loading /> : "Submit"}
                </button>
              </div>
            </form>
            <Link to="/signup">
              <span>Create an Account</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
