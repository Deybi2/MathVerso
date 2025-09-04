import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { registerSchema } from '../../lib/validation';
import { ZodError } from 'zod';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuthStore();

  const handleRegister = async () => {
    setLoading(true);
    try {
      // 1. Validar el formulario con Zod
      registerSchema.parse({ name, email, password });
      setErrors({});
      
      // 2. Llamar a la función de registro del store
      const { error } = await signUp(email, password, name);

      // 3. Manejar errores de registro
      if (error) {
        Alert.alert("Error de registro", error);
      }
    } catch (e) {
      if (e instanceof ZodError) {
        const formatted = e.format();
        const fieldErrors: Record<string, string> = {};
        if (formatted.name?._errors.length) fieldErrors.name = formatted.name._errors[0];
        if (formatted.email?._errors.length) fieldErrors.email = formatted.email._errors[0];
        if (formatted.password?._errors.length) fieldErrors.password = formatted.password._errors[0];
        setErrors(fieldErrors);
      } else {
        Alert.alert("Error", "Ocurrió un error inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>
      
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nombre"
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Contraseña"
        secureTextEntry
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <Button
        title={loading ? "Creando..." : "Registrarse"}
        onPress={handleRegister}
        disabled={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
});

export default RegisterScreen;
