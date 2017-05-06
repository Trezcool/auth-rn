import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { BlurView, Font } from "expo";
import firebase from 'firebase';

import { Footer, Header, Spinner } from './src/components/common';
import LoginForm from "./src/components/LoginForm";
import WelcomeScreen from "./src/components/WelcomeScreen";

export default class App extends Component {
  state = {
    fontsLoaded: false,
    loggedIn: null,
  };

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

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

  async componentDidMount() {
    await Font.loadAsync({
      'josefin-slab-bold': require('./src/assets/fonts/JosefinSlab-Bold.ttf'),
      'josefin-slab-thin': require('./src/assets/fonts/JosefinSlab-Thin.ttf'),
      'open-sans-bold': require('./src/assets/fonts/OpenSans-Bold.ttf'),
      'open-sans-italic': require('./src/assets/fonts/OpenSans-Italic.ttf'),
      'open-sans-regular': require('./src/assets/fonts/OpenSans-Regular.ttf'),
      'tangerine-bold': require('./src/assets/fonts/Tangerine_Bold.ttf'),
      'tangerine-regular': require('./src/assets/fonts/Tangerine_Regular.ttf'),
    });
    this.setState({fontsLoaded: true});
  }

  renderContent = () => {
    switch (this.state.loggedIn) {
      case true:
        return <WelcomeScreen />;
      case false:
        return <LoginForm />;
      default:
        return <Spinner color="#2980B9" />;
    }
  };

  renderView = () => {
    return this.state.fontsLoaded ? (
      <View style={{flex: 1}}>
        <Header title="AuthCool" />

        {this.renderContent()}

        <Footer
          title="© 2017 CoolTech, Inc."
          animation="slideInDown"
          iterationCount="infinite"
          direction="alternate-reverse"
        />
      </View>
    ) : <Spinner color="#2980B9" />;
  };

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
          {this.renderView()}
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
  }
});
