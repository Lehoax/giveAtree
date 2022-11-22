import React from "react";
import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import './index.scss'

const AuthForm= () => {

  const [signIn, setSignIn] = useState(true);

  return (
    <>
    {signIn === true ?(
      <div>

        <button onClick={()=> setSignIn(false)} className="login-or-connexion">Inscription</button>
        <SignInForm/>
      </div>

    ): (
      <div>
        <button onClick={()=> setSignIn(true)} className="login-or-connexion" >Connexion</button>
        <SignUpForm />
      </div>
    )}
     
    </>
  );
};



export default AuthForm;