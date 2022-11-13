import React from "react";
import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";


const AuthForm= () => {

  const [signIn, setSignIn] = useState(true);

  return (
    <>
    {signIn == true ?(
      <>
        <button onClick={()=> setSignIn(false)}>Inscription</button>
        <SignInForm/>
      </>

    ): (
      <>
        <button onClick={()=> setSignIn(true)}>Connexion</button>
        <SignUpForm />
      </>
    )}
     
    </>
  );
};



export default AuthForm;