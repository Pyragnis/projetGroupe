import { Platform } from 'react-native';
import Notifee from '@notifee/react-native';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS';

export const addNotification = (notification) => ({
  type: ADD_NOTIFICATION,
  payload: notification,
});

export const clearNotifications = () => ({
  type: CLEAR_NOTIFICATIONS,
});

export const handleNotification = (notification) => async (dispatch) => {
  dispatch(addNotification(notification));

  // Si la notification est une notification locale, la marquer comme "lue"
  if (Platform.OS === 'ios' && notification.data) {
    await Notifee.setBadgeCount(0);
  }
};
