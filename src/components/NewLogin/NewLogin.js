import React, { useState, useRef } from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container"
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { green, purple, red } from "@material-ui/core/colors";
import * as firebase from 'firebase';

import {
  BrowserRouter as Router,
  Link as LinkTo,
  Redirect 
} from "react-router-dom";

const invalidPass = 'auth/invalid-pass';
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
    firebase.initializeApp(firebaseConfig)
}

export default function NewLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [errorMessage, setError] = useState("");
  const emailField = useRef();  

  
  const authUser = () => {
    if (repeat !== password) setError("Password/Repeat Password do not match!");
    else{
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => { 
        props.history.push("/signin")
      })
      .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        //console.log(emailField.current.value)
        // if (errorMessage !== invalidPass) {
        //   emailField.current.focus(); 
        //   emailField.current.select();
        // }
        setError(errorMessage);
        console.log(errorCode, errorMessage);
      });
    }
  }
  const handleEmail = (e) => { 
    setEmail(e.target.value);
  }
  const handlePassword = (e) => { 
    setPassword(e.target.value);
  }
  const handleRepeat = (e) => { 
    setRepeat(e.target.value);
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
          style={{ minHeight: "90vh" }}
        >
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <br />
            <br />
            <Grid item>
              <Typography variant="h4">Sign Up</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                ref={emailField}
                id="email"
                label="Email"
                onChange={handleEmail}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="pass"
                label="Password"
                onChange={handlePassword}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="r-pass"
                label="Repeat Password"
                onChange={handleRepeat}
                variant="outlined"
              />
            </Grid>
              <Typography variant="caption" color="red">{errorMessage}</Typography>
            <Grid item>
              <Button variant="contained" onClick={authUser}color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
          
          <LinkTo to="/signin">
            <Link variant="body2"spacing={2}>Already have an account, click here.</Link>
          </LinkTo>
        </Grid>
      </div>
  )
}
