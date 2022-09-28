import React, { useState } from "react";
import { Input, InputLabel, Button } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { useHistory } from "react-router";
import "./Login.css";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing,
    minWidth: 240,
    maxWidth: 240,
  },

  chip: {
    margin: theme.spacing / 4,
  },
}));

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //  const [isLoggedIn, setLoggedIn] = useState(false);
  const history = useHistory();


  const login = async () => {
    console.log(email, password);

    let item = { email, password };
    const params = window.btoa(`${email}:${password}`);

    console.log(params);

    let result = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json;charset=UTF-8",
        authorization: `Basic ${params}`,
      },

      body: JSON.stringify(item),
    });

    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result));
    // setLoggedIn(true);
    history.push("/");
  };
  return (
    <div className="login-form">
      <FormControl required className={classes.FormControl}>
        <InputLabel htmlFor="email">Username</InputLabel>
        <Input
          required
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <br />
      <br />

      <FormControl required className={classes.FormControl}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          required
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <br />
      <br />
      <Button type="submit" variant="contained" color="primary" onClick={login}>
        Login
      </Button>
    </div>
  );
}
