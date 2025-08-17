// useTheme.ts
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../services/firebase.ts";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return user;
};

export { useAuth };
