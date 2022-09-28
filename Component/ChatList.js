import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import React from 'react';
import DATA from './Data';
import Messages from './Messages';

const ChatList = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.messagesTitle}>Messages:</Text>
      <View style={styles.messagesFlatListWrapper}>
        <FlatList
          data={DATA}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Messages
              username={item.username}
              lastMessage={item.lastMessage}
              lastMessageTime={item.lastMessageTime}
              avi={item.avi}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  messagesTitle: {
    fontSize: 22,
    marginLeft: 20,
    paddingBottom: 15,
  },
  messagesFlatListWrapper: {},
});
