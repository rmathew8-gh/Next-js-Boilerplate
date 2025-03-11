'use client';

import { eventBus, Events } from '@/utils/EventBus';
import { useEffect, useState } from 'react';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export type NotificationData = {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
};

// Helper function to get notification styles based on type
const getNotificationStyles = (type: NotificationType): string => {
  switch (type) {
    case 'success':
      return 'bg-green-100 text-green-800 border-l-4 border-green-500';
    case 'error':
      return 'bg-red-100 text-red-800 border-l-4 border-red-500';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500';
    case 'info':
    default:
      return 'bg-blue-100 text-blue-800 border-l-4 border-blue-500';
  }
};

export const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  useEffect(() => {
    // Subscribe to notification events
    const unsubscribe = eventBus.subscribe<NotificationData>(
      Events.NOTIFICATION_SHOW,
      (notification) => {
        setNotifications(prev => [...prev, notification]);

        // Auto-remove notification after duration
        if (notification.duration) {
          setTimeout(() => {
            removeNotification(notification.id);
          }, notification.duration);
        }
      },
    );

    // Clean up subscription when component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`p-4 rounded-md shadow-md flex justify-between items-center ${getNotificationStyles(
            notification.type,
          )}`}
        >
          <p>{notification.message}</p>
          <button
            onClick={() => removeNotification(notification.id)}
            className="ml-4 text-sm opacity-70 hover:opacity-100"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

// Helper function to show notifications from anywhere in the app
export const showNotification = (
  message: string,
  type: NotificationType = 'info',
  duration = 5000,
): void => {
  const id = Math.random().toString(36).substring(2, 9);
  eventBus.publish<NotificationData>(Events.NOTIFICATION_SHOW, {
    id,
    message,
    type,
    duration,
  });
};

export default Notification;
