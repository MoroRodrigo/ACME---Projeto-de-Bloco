// src/utils/useUserRole.js
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const useUserRole = () => {
  const [user, loading] = useAuthState(auth);
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setRole(docSnap.data().role);
        }
      }
    };

    fetchUserRole();
  }, [user]);

  return { user, role, loading };
};

export default useUserRole;
