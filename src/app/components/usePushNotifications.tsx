import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export default function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    async function registerForPushNotificationsAsync() {
      if (!Device.isDevice) {
        alert('As notificações push só funcionam em dispositivos físicos!');
        return;
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        alert('Permissão para notificações não concedida!');
        return;
      }

      try {
        const token = await Notifications.getExpoPushTokenAsync();
        console.log('Expo Push Token:', token.data);
        setExpoPushToken(token.data);
      } catch (error) {
        console.error('Erro ao obter o token:', error);
      }
    }

    registerForPushNotificationsAsync();
  }, []);

  return expoPushToken;
}