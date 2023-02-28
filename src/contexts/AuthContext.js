import { useContext, useState, useEffect } from "react";
import React from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  let nameOfBand;

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      setLoading(false);
      return unSubscribe;
    });
  }, []);

  useEffect(() => {
    // console.log(nameOfBand);
  }, [nameOfBand]);
  const signup = async (email, password) => {
    return await auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        db.collection("users").doc(cred.user.uid).set({ band: nameOfBand });
        return;
      });
  };
  // cred.user.updateProfile({
  //   displayName: "##band name##",
  // });

  const getUserData = (data) => {
    nameOfBand = data;
  };
  const login = (email, password) => {
    console.log("login");
    return auth.signInWithEmailAndPassword(email, password);
  };
  const logout = () => {
    console.log("logout");
    return auth.signOut();
  };
  const resetPassword = (email) => {
    console.log("reset password");
    return auth.sendPasswordResetEmail(email);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    getUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
