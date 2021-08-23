import { Button } from "@material-ui/core";
import React from "react";
import "./login.css";
import{auth , provider} from './firebase'
import logo from "./logo.png";
function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider)
            .catch((err)=>alert(err.message)) 
    }
  return (
    <div className="login">
      <div className="login__logo">
        <img src={logo} alt="" />
        <h1>iMessage</h1>
      </div>
      <Button onClick={signIn}>sign in</Button>
    </div>
  );
}

export default Login;
