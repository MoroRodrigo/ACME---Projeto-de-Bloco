// src/components/CheckAdminStatus.jsx
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const CheckAdminStatus = ({ user, setIsAdmin }) => {
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        setIsAdmin(userDoc.exists() && userDoc.data().role === 'admin');
      }
    };

    checkAdminStatus();
  }, [user, setIsAdmin]);

  return null;
};

export default CheckAdminStatus;
