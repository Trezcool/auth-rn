import React, { Component } from 'react';
import { Alert, View, StyleSheet, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import firebase from 'firebase';

import { Button } from "./common";

export default class WelcomeScreen extends Component {

  _handleLogout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      Alert.alert('Error!', e.message);
    }
  };

  render() {
    const user = firebase.auth().currentUser;
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Animatable.Text
            animation="zoomInDown"
            style={styles.welcomeText}
          >
            <Text style={styles.bigText}>{'W'}</Text>
            {'elcome to '}
            <Text style={[styles.bigText, styles.appText]}>{'AuthCool'}</Text>
          </Animatable.Text>
          <Animatable.Text
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            style={styles.userText}
          >
            {user.email}
          </Animatable.Text>
        </View>

        <Button
          title="Log Out"
          animation="slideInUp"
          onPress={this._handleLogout}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  welcomeContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigText: {
    fontSize: 37,
    fontFamily: 'tangerine-bold',
  },
  welcomeText: {
    color: '#2980B9',
    fontFamily: 'open-sans-italic',
    fontSize: 18,
  },
  appText: {
    color: '#FAE5D3',
  },
  userText: {
    marginTop: 10,
    color: '#2980B9',
    fontSize: 30,
    fontFamily: 'open-sans-bold',
  }
});
