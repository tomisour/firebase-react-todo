import { Button, FormControl, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { auth } from "./firebase";

const Login: React.FC = (props: any) => {
  const [isLogin, setisLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && props.history.push("/");
    });
  }, [props.history]);
  return (
    <div>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <br />
      <FormControl>
        <TextField
          InputLabelProps={{ shrink: true }}
          name="email"
          label="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <br />
      <FormControl>
        <TextField
          InputLabelProps={{ shrink: true }}
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>
    </div>
  );
};

export default Login;
