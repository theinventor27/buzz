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
import {signInWithEmailAndPassword} from 'firebase/auth';

//Navigation
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  //Log in User
  const onPressLogin = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        navigation.navigate('ChatList', {});
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

    setPassword('');
    setEmail('');
  };

  //Navigate to sign up page
  const onPressSignUp = () => {
    navigation.navigate('Registration', {});
  };

  //Login with guess account
  const automaticLogin = () => {
    //create random user
    signInWithEmailAndPassword(authentication, 'guest@buzz.com', 'buzz123')
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        navigation.navigate('ChatList', {});
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.signUpWrapper}>
        <TouchableOpacity onPress={() => onPressSignUp()}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.loginTitle}>Buzz</Text>
          <Image style={styles.logo} source={require('../Assets/logo.png')} />
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
          onPress={() => onPressLogin()}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.automaticLogin, {marginTop: 12}]}
          onPress={() => automaticLogin()}>
          <Text style={styles.loginButtonText}>Automatic Login</Text>
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
    marginTop: 200,
    marginHorizontal: 20,
    paddingVertical: 40,
  },
  signUpWrapper: {
    marginLeft: 325,
  },
  signupText: {
    fontSize: 15,
  },
  titleWrapper: {
    flexDirection: 'row',
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
