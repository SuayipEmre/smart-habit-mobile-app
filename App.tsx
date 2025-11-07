
import './global.css';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import RootNavigator from '@/navigation/RootNavigator';
import { store } from '@/store/app/store';

import * as Notifications from "expo-notifications";

// Uygulama açıkken bildirimin nasıl davranacağını ayarla
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

Notifications.addNotificationReceivedListener((notification) => {
  console.log("SmartHabit Notification:", notification);
});

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
