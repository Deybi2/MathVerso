import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/index'; // Ajusta la ruta si tu index.tsx está en otra carpeta

type Props = StackScreenProps<AuthStackParamList, 'AuthLanding'>;

const AuthLanding: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a MathVerso!</Text>
      <Text style={styles.subtitle}>Aprende matemáticas de forma divertida.</Text>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Iniciar Sesión"
          onPress={() => navigation.navigate('Login')}
        />
        <Button
          title="Crear Cuenta"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: 'gray', marginBottom: 40 },
  buttonContainer: { width: '100%', gap: 15 },
});

export default AuthLanding;
