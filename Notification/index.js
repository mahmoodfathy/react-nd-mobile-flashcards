// import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "Notifications";

export async function clearLocalNotification() {
  await AsyncStorage.removeItem(KEY);
  Notifications.cancelAllScheduledNotificationsAsync();
}

export async function setLocalNotification() {
  const data = await AsyncStorage.getItem(KEY);
  const result = JSON.parse(data);
  //   console.log(result);

  if (result === null) {
    // console.log("in null");
    const permissionsNotifications = await Permissions.askAsync(
      Permissions.NOTIFICATIONS
    );
    console.log(permissionsNotifications.status);
    if (permissionsNotifications.status === "granted") {
      Notifications.setNotificationChannelAsync("reminder", {
        name: "reminder",
        importance: Notifications.AndroidImportance.HIGH,
      });
      const currentChannels = await Notifications.getNotificationChannelAsync(
        "reminder"
      );
      //   console.log(currentChannels);
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Study with Flashcards",
          body: "📖 Don't forget to study today!",
        },
        trigger: { channelId: "reminder", seconds: 10, repeats: true }, //test every 10 seconds to see if it works
      });

      AsyncStorage.setItem(KEY, JSON.stringify(true));
    }
  }
}
