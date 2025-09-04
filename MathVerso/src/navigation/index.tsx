// index.tsx
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';

import { useAuthStore } from '../store/authStore';
import AuthLanding from '../screens/Auth/AuthLanding';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import HomeScreen from '../screens/App/HomeScreen';

/* -----------------------------
   1️⃣ Tipos de navegación
--------------------------------*/
export type AuthStackParamList = {
  AuthLanding: undefined;
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Home: undefined;
};

/* -----------------------------
   2️⃣ Crear stacks tipados
--------------------------------*/
const AuthStackNav = createStackNavigator<AuthStackParamList>();
const AppStackNav = createStackNavigator<AppStackParamList>();

/* -----------------------------
   3️⃣ Stack de autenticación
--------------------------------*/
const AuthStack = () => (
  <AuthStackNav.Navigator screenOptions={{ headerShown: false }}>
    <AuthStackNav.Screen name="AuthLanding" component={AuthLanding} />
    <AuthStackNav.Screen name="Login" component={LoginScreen} />
    <AuthStackNav.Screen name="Register" component={RegisterScreen} />
  </AuthStackNav.Navigator>
);

/* -----------------------------
   4️⃣ Stack principal
--------------------------------*/
const AppStack = () => (
  <AppStackNav.Navigator screenOptions={{ headerShown: false }}>
    <AppStackNav.Screen name="Home" component={HomeScreen} />
  </AppStackNav.Navigator>
);

/* -----------------------------
   5️⃣ Navigator principal
--------------------------------*/
const AppNavigator = () => {
  const { user, isLoading, initializeSession } = useAuthStore();

  useEffect(() => {
    initializeSession();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
