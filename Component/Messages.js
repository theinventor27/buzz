import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

//Firebase
import {db} from './firebase-config';

//Navigation
import {useNavigation} from '@react-navigation/native';

const Messages = ({name, user, lastMessage, avi, myUsername}) => {
  const navigation = useNavigation();

  const goToChat = () => {
    console.log('test', myUsername);

    navigation.navigate('Chat', {
      avi: avi,
      user: user,
      myUsername: myUsername,
    });
  };
  return (
    <TouchableOpacity
      style={styles.touchableOpacity}
      onPress={() => goToChat()}>
      <View style={styles.container}>
        <View style={styles.aviWrapper}>
          <Image style={styles.avi} source={{uri: avi}} />
        </View>
        <View style={styles.messsageWrapper}>
          <Text style={styles.name}>{user}</Text>
          <Text style={styles.lastMessage}>{lastMessage}</Text>
        </View>
      </View>
      <View style={styles.divider} />
    </TouchableOpacity>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  touchableOpacity: {
    paddingVertical: 12,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A9ABB1',
    marginLeft: 85,
  },
  messsageWrapper: {
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 13,
    fontWeight: '300',
  },
  avi: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 50,
  },
});
