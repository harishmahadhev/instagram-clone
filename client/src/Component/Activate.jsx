import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import * as api from "../api/Api";
export default function Activate() {
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const activate = async (token) => {
    try {
      const { data } = await api.activate({ token });
      setMessage(data.message);
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
      <p>Please Activate your account</p>
      <button className="activateButton" onClick={() => activate(token)}>
        Activate
      </button>

      {message && <div className="activateMessage">{message}..!!</div>}
    </div>
  );
}
