import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const Messages = ({name, username, lastMessage, avi}) => {
 
  return (
    <View style={styles.container}>
      <View style={styles.aviWrapper}>
        <Image style={styles.avi} source={{uri: avi}} />
      </View>
      <View style={styles.messsageWrapper}>
        <Text style={styles.name}>{username}</Text>
        <Text style={styles.lastMessage}>{lastMessage}</Text>
      </View>
    </View>
    
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
  },
  avi: {
    width: 60,
    height: 60,
  },
});
