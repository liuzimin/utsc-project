import React, { Component, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { Fields, reduxForm } from "redux-form";

import {
  BrowserRouter as Router,
  Link as LinkTo,
  Redirect,
  // History
} from "react-router-dom";

import * as firebase from "firebase";
import Link from "@material-ui/core/Link";

var firebaseConfig = {
  apiKey: "AIzaSyDICnZMnrvISneUWxo-WfyjCbRj5CMuC2Y",
  authDomain: "utsc-projects.firebaseapp.com",
  databaseURL: "https://utsc-projects.firebaseio.com",
  projectId: "utsc-projects",
  storageBucket: "utsc-projects.appspot.com",
  messagingSenderId: "109791671007",
  appId: "1:109791671007:web:23cdd1c32c44ea59bd6f6a"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Confirm the link is a sign-in with email link.
if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
    var email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
    }
    // The client SDK will parse the code from the link for you.
    firebase.auth().signInWithEmailLink(email, window.location.href)
      .then(function(result) {
        window.localStorage.removeItem('emailForSignIn');
      })
      .catch(function(error) {
      });
  }
  

function CSignIn(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const changeEmail = e => {
    setEmail(e.target.value);
    setError("")
  };

  const changePass = e => {
    setPass(e.target.value);
    setError("")
  };

  const createUser = () => {
    firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        setError(errorMessage)
        // ...
    });
    if(error === ""){
        authChange();
    }
  };
  

  const authChange =()=>{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user.emailVerified)
            let userid = firebase.auth().currentUser.email;
            console.log(userid)
            props.history.push('/profile', userid)
        }
      });
  }

  return (
    <div>
      <Grid
        container
        fullWidth
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ paddingTop: "15%" }}
      >
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h4">Sign In</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              variant="outlined"
              onChange={changeEmail}
            />
            
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="pass"
              type = "password"
              label="Password"
              variant="outlined"
              onChange={changePass}
            />
          </Grid>
          <Grid item>
            <Button onClick={createUser} variant="contained" color="primary">
              Submit
            </Button>
          </Grid>

          {/* <Router> */}
            <LinkTo to="/login">
              <Link component="button" variant="body2">
                Create Account
              </Link>
            </LinkTo>
          {/* </Router> */}
          
        </Grid>
        <Typography variant="h6">{error}</Typography>
      </Grid>
    </div>
  );
}

export default CSignIn;
