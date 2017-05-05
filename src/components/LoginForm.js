import React, { Component } from 'react';
import { Alert } from 'react-native'

import { Button, Card, CardSection, Input } from "./common/index";

export default class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  };

  _handleLogin = () => {
    const { email, password } = this.state;
    if (email && password) {
      Alert.alert(
        'Success',
        `
      Email: ${email}
      Password: ${password}
      `
      )
    }
  };

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@example.com"
            autoCapitalize="none"
            clearButtonMode="while-editing"
            keyboardType="email-address"
            onChangeText={email => this.setState({email})}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Password"
            placeholder="password"
            onChangeText={password => this.setState({password})}
            secureTextEntry={true}
            returnKeyType="go"
            clearButtonMode="while-editing"
            enablesReturnKeyAutomatically={true}
            onSubmitEditing={this._handleLogin}
          />
        </CardSection>

        <CardSection lastChild={true}>
          <Button
            title="Log in"
            onPress={this._handleLogin}
          />
        </CardSection>
      </Card>
    );
  }
}
