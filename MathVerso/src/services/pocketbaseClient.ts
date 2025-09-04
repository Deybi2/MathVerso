import 'react-native-url-polyfill/auto';
import PocketBase from 'pocketbase';
import * as SecureStore from 'expo-secure-store';

const pocketbaseUrl = process.env.POCKETBASE_URL ?? '';
export const pb = new PocketBase(pocketbaseUrl);

// 🔹 Cargar sesión guardada al iniciar
(async () => {
  const stored = await SecureStore.getItemAsync('pb_auth');
  if (stored) {
    try {
      pb.authStore.save(JSON.parse(stored)); // restore session
    } catch (err) {
      console.error("Error restoring auth store:", err);
    }
  }
})();

// 🔹 Escuchar cambios en la sesión
pb.authStore.onChange(() => {
  if (pb.authStore.isValid) {
    SecureStore.setItemAsync('pb_auth', JSON.stringify(pb.authStore.model));
  } else {
    SecureStore.deleteItemAsync('pb_auth');
  }
});
