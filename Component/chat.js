import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

//Firebase
import {db} from './firebase-config';
import {
  collection,
  addDoc,
  query,
  doc,
  limit,
  onSnapshot,
  serverTimestamp,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
//navigation
import {useNavigation} from '@react-navigation/native';

const Chat = ({route}) => {
  const [chatMessages, setChatMessages] = useState('');
  const [sentMessage, setSentMessage] = useState('');

  const navigation = useNavigation();
  //Get all messages in firebase collection
  const querySnapshot = async () => {
    const chatRef = collection(
      db,
      'users',
      'Guest@buzz.com',
      'chats',
      route.params.user,
      'messages',
    );

    const q = query(chatRef, orderBy('timestamp'), limit(50));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const msg = [];

      querySnapshot.forEach(doc => {
        msg.push({
          ...doc.data(),
          id: doc.id,
          user: doc.data()['user'],
          text: doc.data()['text'],
        });
        console.log(msg);
      });

      setChatMessages(msg);
    });
  };

  //Send Message
  const sendMessage = async () => {
    const messageRef = collection(
      db,
      'users',
      'Guest@buzz.com',
      'chats',
      route.params.user,
      'messages',
    );
    await addDoc(messageRef, {
      text: sentMessage,
      sender: route.params.myUsername,
      timestamp: serverTimestamp(),
    });
    setSentMessage('');
  };

  const goBack = () => {
    navigation.navigate('ChatList', {});
  };
  const MessageItem = ({text, id, user}) => {
    <>
      <SafeAreaView>
        <Text>Message: {text}</Text>
      </SafeAreaView>
    </>;
  };

  useEffect(() => {
    querySnapshot();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'} Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.nameWrapper}>
        <Image style={styles.avi} source={{uri: route.params.avi}} />
        <Text style={styles.username}>{route.params.user}</Text>
      </View>
      <View styles={styles.contentContainer}>
        <FlatList
          style={{flexGrow: 1, paddingTop: 10}}
          data={chatMessages}
          ItemSeparatorComponent={
            <View style={styles.itemSeparatorComponent} />
          }
          renderItem={({item}) =>
            item.sender === route.params.myUsername ? (
              <View style={styles.myTextBackground}>
                <Text style={styles.myText}> {item.text}</Text>
              </View>
            ) : (
              <View style={styles.theirTextBackground}>
                <Text style={styles.theirText}> {item.text}</Text>
              </View>
            )
          }
        />
      </View>
      <View />
      <View style={styles.footer}>
        <TextInput
          style={styles.messageInput}
          onChangeText={text => setSentMessage(text)}
          value={sentMessage}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => sendMessage()}>
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
  nameWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.6,
    paddingBottom: 5,
  },
  backButton: {
    marginLeft: 10,
  },
  backButtonText: {
    fontWeight: '500',
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  avi: {
    height: 40,
    width: 40,
  },
  username: {
    fontSize: 15,
  },
  contentContainer: {
    flex: 1,
  },
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
    padding: 4,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'black',
    alignContent: 'center',
  },
  sendButton: {
    backgroundColor: '#f0c929',
    width: 65,
    height: 30,
    marginLeft: 10,
    borderRadius: 50,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
  },

  //text
  myTextBackground: {
    flexDirection: 'row',
    alignSelf: 'flex-end',

    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#f0c929',
  },
  myText: {
    flexWrap: 'wrap-reverse',
    minWidth: 25,
    maxWidth: 280,
    paddingHorizontal: 5,
    marginRight: 2,
    paddingVertical: 5,
  },
  theirTextBackground: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    borderRadius: 8,
    marginLeft: 8,
    backgroundColor: '#D3D3D3',
  },
  theirText: {
    flexWrap: 'wrap-reverse',
    minWidth: 25,
    maxWidth: 280,
    paddingHorizontal: 5,
    marginRight: 2,
    paddingVertical: 5,
  },
  itemSeparatorComponent: {
    padding: 10,
  },
});
export default Chat;
