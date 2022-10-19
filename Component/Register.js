import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

//Firebase
import {authentication} from './firebase-config';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {db} from './firebase-config';
import {doc, setDoc, collection, getDoc, Timestamp} from 'firebase/firestore';

const Login = ({setMyUsername, myUsername}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  //Log in User
  const registerUser = async () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    // Add a new document in collection "users"
    await setDoc(doc(db, 'users', email), {
      user: email,
      firstName: firstName,
      lastName: lastName,
    });
    console.log(email);

    // Add Buzz to chatlog
    const chatRef = doc(db, 'users', email, 'chats', 'Buzz');
    await setDoc(chatRef, {
      user: 'Buzz',
      avi: 'https://robohash.org/test',
    });
    setMyUsername(email);
    // Add messages collection to Buzz
    const messagesRef = collection(
      db,
      'users',
      email,
      'chats',
      'Buzz',
      'messages',
      Timestamp,
    );
    await setDoc(messagesRef, {
      text: 'Hey! Welcome to Buzz!',
      Timestamp: Timestamp,
    });
    setPassword('');
    setEmail('');
  };

  //Login with guess account

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.loginTitle}>Register</Text>
          <Image style={styles.logo} source={require('../Assets/logo.png')} />
        </View>
        <View style={styles.inputNameContainer}>
          <TextInput
            style={[styles.textInputName, {marginRight: 20}]}
            placeholder="First Name"
            keyboardType="default"
            onChangeText={text => setFirstName(text)}
            value={firstName}
          />
          <TextInput
            style={styles.textInputName}
            placeholder="Last Name"
            keyboardType="default"
            onChangeText={text => setLastName(text)}
            value={lastName}
          />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          value={email}
        />

        <TextInput
          style={[styles.textInput, {marginBottom: 50}]}
          placeholder="Password"
          secureTextEntry="true"
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => registerUser()}>
          <Text style={styles.loginButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 240,
  },
  signUpWrapper: {
    marginLeft: 325,
  },
  signupText: {
    fontSize: 15,
  },
  titleWrapper: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  loginTitle: {
    fontSize: 35,
    fontWeight: '200',
    marginBottom: 10,
  },
  logo: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: 30,
    width: 55,
    marginLeft: 10,
    marginBottom: 5,
  },
  inputNameContainer: {
    flexDirection: 'row',
  },
  textInputName: {
    width: 140,
    height: 35,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    padding: 4,
  },
  textInput: {
    width: 300,
    height: 35,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    padding: 4,
  },
  loginButton: {
    width: 150,
    height: 35,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 0.5,
    backgroundColor: '#f0c929',
    justifyContent: 'center',
  },
  automaticLogin: {
    width: 150,
    height: 35,
    borderRadius: 5,
    borderWidth: 0.5,
    justifyContent: 'center',
  },
  loginButtonText: {
    fontWeight: '300',

    textAlignVertical: 'center',
    textAlign: 'center',
  },
  signupContainer: {},
});
