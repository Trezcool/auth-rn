import React, { Component } from 'react';
import { Alert } from 'react-native'
import firebase from 'firebase';

import { Button, Card, CardSection, Input, Link } from "./common/index";

export default class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    isLogin: true,
  };

  _resetState = () => {
    this.setState({
      email: '',
      password: '',
      isLogin: true,
    });
  };

  _handleLogin = async () => {
    const { email, password, isLogin } = this.state;
    if (email && password) {
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
        Alert.alert('Error!', e.message);
      }
    }
  };

  render() {
    const { email, password, isLogin } = this.state;

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

        <CardSection lastChild={true}>
          <Button
            title={isLogin && 'Log in' || 'Sign up'}
            onPress={this._handleLogin.bind(this)}
          />
        </CardSection>
        <CardSection lastChild={true}>
          <Link
            title={isLogin && 'Or sign up' || 'Or log in'}
            onPress={() => this.setState({isLogin: !isLogin})}
          />
        </CardSection>
      </Card>
    );
  }
}
