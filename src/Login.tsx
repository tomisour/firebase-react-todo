import { Button, FormControl, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { auth } from "./firebase";

const Login: React.FC = (props: any) => {
  const [isLogin, setisLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user != null) {
        props.history.push("/");
      }
    });
    return () => unSub();
  }, [props.history]);
  return (
    <div className={styles.login__root}>
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
      <br />
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={async () => {
          if (isLogin) {
            try {
              await auth.signInWithEmailAndPassword(email, password);
              props.history.push("/");
            } catch (error) {
              alert(error.message);
            }
          } else {
            try {
              await auth.createUserWithEmailAndPassword(email, password);
              props.history.push("/");
            } catch (error) {
              alert(error.message);
            }
          }
        }}
      >
        {isLogin ? "Login" : "Register"}
      </Button>
      <br />
      <Typography align="center">
        <span
          onClick={() => {
            setisLogin(!isLogin);
          }}
        >
          {isLogin ? "Create new account?" : "Back to Login?"}
        </span>
      </Typography>
    </div>
  );
};

export default Login;
