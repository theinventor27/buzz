import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const Login = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.loginTitle}>Buzz</Text>
      <TextInput style={styles.textInput}></TextInput>
      <TextInput style={styles.textInput}></TextInput>
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -200,
  },
  loginTitle: {
    fontSize: 25,
    marginBottom: 10,
  },
  textInput: {
    width: 250,
    height: 25,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  loginButton: {
    width: 100,
    height: 30,
    borderRadius: 50,
    backgroundColor: 'yellow',
    justifyContent: 'center',
  },
  loginButtonText: {
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
