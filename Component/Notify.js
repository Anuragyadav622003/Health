import React from 'react';
import { View, Button } from 'react-native';
import notifee, { AndroidStyle } from '@notifee/react-native';

const Notify = () => {
  const displayNotification = async () => {
    try {
        console.log("hello")
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      await notifee.displayNotification({
        title: 'Hello',
        body: 'This is a notification from Notifee!',
        android: {
          channelId,
        },
        style: { type: AndroidStyle.BIGPICTURE, picture: 'https://www.bing.com/images/search?view=detailV2&ccid=1lM1EVCf&id=4B697F35FFB4DF1BE4FA7BABCD616F88D12850EA&thid=OIP.1lM1EVCfFtJvm6eZxJ6jaQHaE8&mediaurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F863963%2Fpexels-photo-863963.jpeg%3Fcs%3Dsrgb%26dl%3Dmacro-photography-of-red-petal-flower-863963.jpg1' }
      });
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Display Notification" onPress={displayNotification} />
    </View>
  );
};

export default Notify;
