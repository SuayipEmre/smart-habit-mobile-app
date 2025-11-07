import * as Notifications from "expo-notifications";

export const registerForPushNotificationsAsync = async() => {
  // 1. Kullanıcıdan izin iste
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Push notification izni gerekli!");
    return null;
  }

  console.log('Push notification izni verildi.');
  
  // 2. Expo push token al
  const token = (await Notifications.getExpoPushTokenAsync()).data;

  console.log('Expo Push Token:', token);
  
  return token;
}
