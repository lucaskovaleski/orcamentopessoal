// src/components/Login.tsx
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const Login: React.FC = () => {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
    } catch (error) {
      <p> erro ao logar  </p>
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={signInWithGoogle}>Login com Google</button>
    </div>
  );
};

export default Login;
