import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
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
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { UserAccount } from '../components/Types/types';

interface AuthContextProviderProps {
  children: JSX.Element;
}

interface AuthContextModel {
  signIn: (email: string, password: string) => Promise<UserCredential>;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  user: User;
  logout: () => void;
  userData: UserAccount;
  loggedMember: string | null;
}

const UserContext = React.createContext<AuthContextModel>({} as AuthContextModel);

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>({});
  const [loggedMember, setLoggedMember] = useState<string | null>(null);

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    localStorage.removeItem('loggedMember');
    setLoggedMember(null);

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
    setLoggedMember(localStorage.getItem('loggedMember'));

    window.addEventListener('storage', (event) => {
      if (event.key === 'loggedMember') {
        setLoggedMember(event.newValue);
      }
    });

    return () => {
      window.removeEventListener('storage', (event) => {
        if (event.key === 'loggedMember') {
          setLoggedMember(event.newValue);
        }
      });
    };
  }, []);

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
