import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { app, auth, db, storage } from './src/config/utils/firebaseConnection';
import Loading from './src/kernel/components/Loading';
import Login from './src/models/Login';
import Home from './src/models/Home';

const Stack = createStackNavigator();

export default function App() {
  const [login, setLogin] = useState(false);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogin(true);
      } else {
        setLogin(false);
      }
      setLoader(false);
    });
  },[]);
  if (loader) {
    return <Loading isVisible={true} size='large' color='#4abfa4' title='Espere un momento' />
  } else {
    if (login) {
      return <Home />
    } else {
      return <Login />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});