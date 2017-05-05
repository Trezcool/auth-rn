import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';

import { Header } from './src/components/common';
import LoginForm from "./src/components/LoginForm";

export default class App extends Component {

  componentWillMount() {
    const firebaseConf = {
      apiKey: "AIzaSyCWtyZnHOs6bEBiacrch9dr2Mu0HBTWXuQ",
      authDomain: "auth-rn-51f17.firebaseapp.com",
      databaseURL: "https://auth-rn-51f17.firebaseio.com",
      projectId: "auth-rn-51f17",
      storageBucket: "auth-rn-51f17.appspot.com",
      messagingSenderId: "475081222257"
    };
    firebase.initializeApp(firebaseConf);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Authentication" />
        <LoginForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F4',
  }
});
