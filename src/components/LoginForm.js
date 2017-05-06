import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native'
import firebase from 'firebase';

import { Button, Card, CardSection, Input, Link, Spinner } from './common';

export default class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    isLogin: true,
    loading: false,
  };

  _resetState = () => {
    this.setState({
      email: '',
      password: '',
      error: '',
      isLogin: true,
      loading: false,
    });
  };

  _handleLogin = async () => {
    const { email, password, isLogin } = this.state;

    if (email && password) {
      this.setState({
        error: '',
        loading: true,
      });

      try {
        const auth = firebase.auth();
        let message;
        if (isLogin) {
          await auth.signInWithEmailAndPassword(email, password);
          message = 'Logged in successfully.';
        } else {
          await auth.createUserWithEmailAndPassword(email, password);
          message = 'Signed up successfully.\nPlease log in.';
        }
        this._resetState();
        Alert.alert('Success', message);
      } catch (e) {
        this.setState({
          error: 'Authentication failed.',
          loading: false,
        });
        Alert.alert('Error!', e.message);
      }
    }
  };

  renderButton = () => {
    const { isLogin, loading } = this.state;

    if (loading) {
      return (
        <CardSection lastChild={true}>
          <Spinner color="#2980B9"/>
        </CardSection>
      )
    }

    return (
      <View>
        <CardSection lastChild={true}>
          <Button
            title={isLogin && 'Log In' || 'Sign Up'}
            onPress={this._handleLogin.bind(this)}
          />
        </CardSection>
        <CardSection lastChild={true}>
          <Link
            title={isLogin && 'Or sign up' || 'Or log in'}
            onPress={() => this.setState({isLogin: !isLogin})}
          />
        </CardSection>
      </View>
    )
  };

  render() {
    const { email, password, error } = this.state;

    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@example.com"
            value={email}
            autoCapitalize="none"
            clearButtonMode="while-editing"
            keyboardType="email-address"
            onChangeText={email => this.setState({email})}
            returnKeyType="next"
            // blurOnSubmit={false}
            // onSubmitEditing={() => this.passwordInput.focus()}  // FIXME: `focus` no longer exist :(
          />
        </CardSection>
        <CardSection>
          <Input
            // ref={(input) => { this.passwordInput = input; }}
            label="Password"
            placeholder="password"
            value={password}
            onChangeText={password => this.setState({password})}
            secureTextEntry={true}
            returnKeyType="go"
            clearButtonMode="while-editing"
            enablesReturnKeyAutomatically={true}
            onSubmitEditing={this._handleLogin.bind(this)}
          />
        </CardSection>

        <Text style={styles.error}>
          {error}
        </Text>
        {this.renderButton()}
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    alignSelf: 'center',
    fontFamily: 'open-sans-regular',
  }
});
