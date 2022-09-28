import React, { useState } from "react";
import { Input, InputLabel, Button } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
import "./Register.css";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing,
    minWidth: 240,
    maxWidth: 240,
  },

  root: {
    color: "red",
  },

  chip: {
    margin: theme.spacing / 4,
  },
}));

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  contact: "",
  fnameError: "",
  lnameError: "",
  emailError: "",
  passwordError: "",
  contactError: "",
};

export default function Register(props) {
  const classes = useStyles();

  const [user, setUSer] = useState(initialState);
  const [response, setResponse] = useState(0);

  const validate = () => {
    let fnameError = "";
    let lnameError = "";
    let emailError = "";
    let passwordError = "";
    let contactError = "";

    if (!user.email) {
      emailError = "required";
    }
    if (!user.firstname) {
      fnameError = "required";
    }
    if (!user.lastname) {
      lnameError = "required";
    }
    if (!user.password) {
      passwordError = "required";
    }
    if (!user.contact) {
      contactError = "required";
    }

    if (
      emailError ||
      fnameError ||
      lnameError ||
      passwordError ||
      contactError
    ) {
      setUSer({
        emailError,
        fnameError,
        lnameError,
        passwordError,
        contactError,
      });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    console.log("handlesubmit is invoked");
    const isValid = validate();
    if (isValid) {
      console.log(user);
      // setUSer(initialState)
    }
  };

  const InputHandlers = (e) => {
    setUSer({ ...user, [e.target.name]: e.target.value });
  };

  const registerButtonHandler = async () => {
    console.log("registration button clicked");
    handleSubmit();

    const { firstname, lastname, email, password, contact } = user;

    const rawResponse = await fetch("/api/v1/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json;charset=UTF-8",
      },

      body: JSON.stringify({
        email_address: email,
        first_name: firstname,
        last_name: lastname,
        mobile_number: contact,
        password: password,
      }),
    });

    const result = await rawResponse.json();
    if (result.ok) {
      setResponse(200);
    }
    console.table(user);
  };

  return (
    <div className="register-form">
      <FormControl required className={classes.formControl}>
        <InputLabel htmlFor="firstname">First Name</InputLabel>
        <Input
          id="firstname"
          name="firstname"
          value={user.firstname}
          onChange={InputHandlers}
        />
        <FormHelperText className={classes.root} required>
          {user.fnameError}
        </FormHelperText>
      </FormControl>
      <br />
      <br />

      <FormControl required className={classes.formControl}>
        <InputLabel htmlFor="lastname">Last Name</InputLabel>
        <Input
          id="lastname"
          name="lastname"
          value={user.lastname}
          onChange={InputHandlers}
        />
        <FormHelperText className={classes.root} required>
          {user.lnameError}
        </FormHelperText>
      </FormControl>
      <br />
      <br />

      <FormControl required className={classes.formControl}>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          name="email"
          value={user.email}
          onChange={InputHandlers}
        />
        <FormHelperText className={classes.root} required>
          {user.emailError}
        </FormHelperText>
      </FormControl>
      <br />
      <br />
      <FormControl required className={classes.formControl}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          name="password"
          value={user.password}
          onChange={InputHandlers}
        />
        <FormHelperText className={classes.root} required>
          {user.passwordError}
        </FormHelperText>
      </FormControl>
      <br />
      <br />
      <FormControl required className={classes.formControl}>
        <InputLabel htmlFor="contact">Contact no.</InputLabel>
        <Input
          id="contact"
          name="contact"
          value={user.contact}
          onChange={InputHandlers}
        />
        <FormHelperText className={classes.root} required>
          {user.contactError}
        </FormHelperText>
      </FormControl>
      <br />
      <br />

      {response === 200 ? (
        <span>Registration Sucessful.Please Login!</span>
      ) : null}
      <br />
      <br />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={registerButtonHandler}
      >
        Register
      </Button>
    </div>
  );
}
