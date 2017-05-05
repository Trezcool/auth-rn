import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

class Button extends Component {

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.props.onPress}
      >
        <Text style={styles.title}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#2980B9',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#2980B9',
    marginLeft: 5,
    marginRight: 5,
  }
});

export { Button };
