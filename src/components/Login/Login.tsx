import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Loader from "../Loader/Loader";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error: any) {
      console.error("Error al iniciar sesión:", (error as Error).message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error: any) {
      console.error("Error al crear usuario:", (error as Error).message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      {loading && <Loader />}

      <Link to="/">
        <h2 className="font-bold text-4xl uppercase">Bookstore</h2>
      </Link>

      <div className="login__container">
        <h1>Inicio de sesión</h1>

        <form action="">
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Contraseña</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Iniciar sesión
          </button>
        </form>

        <button onClick={register} className="login__registerButton">
          Crear cuenta
        </button>
      </div>
    </div>
  );
}

export default Login;
