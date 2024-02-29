import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import PushNotification from 'react-native-push-notification';

const Shedule = () => {
  // Function to schedule a notification for a task
  const scheduleNotification = (taskName, scheduleTime) => {
    PushNotification.localNotificationSchedule({
      message: `Time to ${taskName}!`,
      date: new Date(scheduleTime),
    });
  };

  // Array of tasks with their schedule times
  const tasks = [
    { name: 'Take Breakfast', scheduleTime: '2024-02-29T08:00:00' },
    { name: 'Take Lunch', scheduleTime: '2024-02-29T12:00:00' },
    { name: 'Take Dinner', scheduleTime: '2024-02-29T15:23:00' },
  ];

  // Schedule notifications for each task
  const scheduleNotificationsForTasks = () => {
    tasks.forEach(task => {
      scheduleNotification(task.name, task.scheduleTime);
    });
  };

  // Call the function to schedule notifications when component mounts
  useEffect(() => {
    scheduleNotificationsForTasks();
  }, []);

  return (
    <View>
      <Text>Tasks Scheduled!</Text>
    </View>
  );
};

export default Shedule;
