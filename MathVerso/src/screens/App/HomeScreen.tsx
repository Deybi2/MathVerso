import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useAuthStore } from '../../store/authStore';

const HomeScreen = () => {
  const { user, signOut } = useAuthStore();
  
  // Muestra el nombre del usuario si está disponible
  const userName = user?.name || user?.email || 'Usuario';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido, {userName}!</Text>
      <Text style={styles.subtitle}>Has iniciado sesión correctamente.</Text>
      
      <View style={styles.content}>
        <Text style={styles.contentTitle}>Próximos Pasos (Hoja de Ruta):</Text>
        <Text style={styles.contentItem}>1. Implementar la pantalla "Mapa".</Text>
        <Text style={styles.contentItem}>2. Cargar las categorías de la base de datos.</Text>
        <Text style={styles.contentItem}>3. Navegar a las lecciones y actividades.</Text>
      </View>

      <Button
        title="Cerrar Sesión"
        onPress={signOut}
        color="#e74c3c"
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
    backgroundColor: '#ecf0f1',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#34495e',
    marginBottom: 40,
  },
  content: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    width: '100%',
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contentItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default HomeScreen;