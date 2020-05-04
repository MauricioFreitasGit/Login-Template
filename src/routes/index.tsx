import React, { useEffect, useState } from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import AsyncStorage from '@react-native-community/async-storage';

const Routes: React.FC = () => {

  const [user, setUser] = useState({})

  useEffect(() => {
    async function loadStorageData() {
      const usuario = await AsyncStorage.getItem('user');
      setUser(usuario)
    }

    loadStorageData();
  }, []);

  return user ? <AppRoutes /> : <AuthRoutes />
}

export default Routes;