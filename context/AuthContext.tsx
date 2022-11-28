import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  Auth,
  UserCredential,
  User,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

interface AuthContextProviderProps {
  children: JSX.Element;
}

interface AuthContextModel {
  signIn: (email: string, password: string) => Promise<UserCredential>;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  user: User | null;
  logout: () => void;
}

const UserContext = React.createContext<AuthContextModel>({} as AuthContextModel);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [userData, setUserData] = useState({});

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //   // GETTING DATA FROM FB

  //   const getUserData = async () => {
  //     const docSnap = await getDoc(doc(db, "users", user.uid));

  //     if (docSnap.exists()) {
  //       setUserData(docSnap.data());
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   };

  //     const getMarketPlace = async () => {
  //       const docSnap = await getDoc(doc(db, "marketplace", MarketPlace.Key));

  //     if (docSnap.exists()) {
  //       setMarket(docSnap.data());
  //       return true;
  //     } else {
  //       return false;
  //     }
  //     };

  //   // Getting user data on app load

  //   useEffect(() => {
  //     if (user) {
  //       getUserData()
  //       getMarketPlace()
  //     }
  //   }, [user]);

  return (
    <UserContext.Provider
      value={{
        createUser,
        signIn,
        user,
        logout,
      }}
    >
      {!isLoading && children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
