import React, { useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  UserCredential,
  User,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { Members, UserAccount } from '../components/Types/types';

interface AuthContextProviderProps {
  children: JSX.Element;
}

interface AuthContextModel {
  signIn: (email: string, password: string) => Promise<UserCredential>;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  user: User;
  logout: () => void;
  userData: UserAccount;
  loggedMember: Members | null;
}

const UserContext = React.createContext<AuthContextModel>({} as AuthContextModel);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>({});
  const [loggedMember, setLoggedMember] = useState<Members | null>(null);

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    localStorage.removeItem('loggedMember');

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

  useEffect(() => {
    if (user) {
      const unsub = onSnapshot(doc(db, 'users', user.uid), (doc) => {
        setUserData(doc.data());
      });
      return () => {
        unsub();
      };
    }
  }, [user]);

  useEffect(() => {
    const storedMember = localStorage.getItem('loggedMember');
    setLoggedMember(storedMember ? JSON.parse(storedMember) : null);

    const storageEventListener = (event: any) => {
      if (event.key === 'loggedMember') {
        const storedMember = event.newValue;
        setLoggedMember(storedMember ? JSON.parse(storedMember) : null);
      }
    };
    window.addEventListener('storage', storageEventListener);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', storageEventListener);
    };
  }, [localStorage.getItem('loggedMember')]);

  return (
    <UserContext.Provider
      value={{
        createUser,
        signIn,
        user,
        logout,
        userData,
        loggedMember,
      }}
    >
      {!isLoading && children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
