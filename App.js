import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { BlurView } from "expo";
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
      <Image
        source={require('./src/assets/img/background.jpg')}
        style={styles.container}
      >
        <BlurView
          tint="light"
          intensity={55}
          style={StyleSheet.absoluteFill}
        >
          <Header title="AuthCool" />
          <LoginForm />
          <View style={styles.copyright}>
            <Text style={styles.copyrightText}>© 2017 Trezcool, Inc.</Text>
          </View>
        </BlurView>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    resizeMode: 'cover', // or 'stretch'
  },
  copyright: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  copyrightText: {
    color: '#adb9c2',
  }
});
