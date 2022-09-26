import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const Chat = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View styles={styles.contentContainer} />
      <Text>Test</Text>
      <View />
      <View style={styles.footer}>
        <TextInput style={styles.messageInput} />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  contentContainer: {},
  footer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  messageInput: {
    height: 30,
    width: 290,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'black',
    alignContent: 'center',
  },
  sendButton: {
    backgroundColor: 'lightblue',
    width: 65,
    height: 30,
    marginLeft: 10,
    borderRadius: 50,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
  },
});
export default Chat;
