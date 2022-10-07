import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import DATA from './Data';
import Messages from './Messages';
import firestore, {firebase} from '@react-native-firebase/firestore';

import {db} from './firebase-config';
import {
  collection,
  doc,
  query,
  limit,
  onSnapshot,
  orderBy,
  updateDoc,
} from 'firebase/firestore';
const ChatList = () => {
  const [chatList, setChatList] = useState('');

  //Get all chats in firebase collection
  const queryAllChats = async () => {
    //Create refrence for chat collection
    const chatRef = collection(db, 'users', 'Guest@buzz.com', 'chats');
    //Query (get all documents from a collection) 50 messages from chat collection.
    const chatQuery = query(chatRef, limit(50));

    const unsub = onSnapshot(chatQuery, querySnapshot => {
      //Create empty array to hold our chat objects..
      const chats = [];
      var placeholderLastMessage = '';

      //Enumerate through each doc.
      querySnapshot.forEach(doc => {
        //Find last message of each chat

        //Create refrence for collection of messages with current user
        const messagesRef = collection(
          db,
          'users',
          'Guest@buzz.com',
          'chats',
          doc.data()['user'],
          'messages',
        );
        //Query messages of current user, get most recent message
        const lastMessageQuery = query(
          messagesRef,
          limit(1),
          orderBy('timestamp', 'desc'),
        );

        onSnapshot(lastMessageQuery, querySnapshot => {
          querySnapshot.forEach(doc => {
            placeholderLastMessage = doc.data()['text'];
            //Find this chat then set lastMessage field as most recent message
          });
          console.log(doc.data()['user']);
          console.log(placeholderLastMessage);
          setLastMessageField(doc.data()['user'], placeholderLastMessage);
        });
        chats.push({
          ...doc.data(),
          id: doc.id,
          user: doc.data()['user'],
          lastMessage: doc.data()['lastMessage'],
          avi: doc.data()['avi'],
        });
      });

      setChatList(chats);
    });
  };

  const setLastMessageField = async (user, lastMessage) => {
    const userRef = doc(db, 'users', 'Guest@buzz.com', 'chats', user);
    await updateDoc(userRef, {lastMessage: lastMessage});
  };

  useEffect(() => {
    queryAllChats();
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
