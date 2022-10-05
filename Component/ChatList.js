import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import DATA from './Data';
import Messages from './Messages';

import {db} from './firebase-config';
import {
  collection,
  addDoc,
  doc,
  query,
  limit,
  onSnapshot,
  serverTimestamp,
  orderBy,
  getDoc,
} from 'firebase/firestore';
const ChatList = () => {
  const [chatList, setChatList] = useState('');

  //Get all messages in firebase collection
  const querySnapshot = async () => {
    const chatRef = collection(db, 'users', 'Guest@buzz.com', 'chats');
    const lastMessageRef = collection(
      db,
      'users',
      'Guest@buzz.com',
      'chats',
      'Buzz',
      'messages',
    );

    const q = query(chatRef, limit(50));
    const lastMessage = query(lastMessageRef, orderBy('timestamp'), limit(1));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const chats = [];

      querySnapshot.forEach(doc => {
        chats.push({
          ...doc.data(),
          id: doc.id,
          user: doc.data()['user'],
          lastMessage: lastMessage['text'],
          avi: doc.data()['avi'],
        });
        console.log(chats);
      });

      setChatList(chats);
    });
  };
  useEffect(() => {
    querySnapshot();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.messagesTitle}>Messages:</Text>
      <View style={styles.messagesFlatListWrapper}>
        <FlatList
          style={{flexGrow: 1}}
          data={chatList}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Messages
              user={item.user}
              lastMessage={item.lastMessage}
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
  messagesFlatListWrapper: {
    flex: 1,
  },
});
