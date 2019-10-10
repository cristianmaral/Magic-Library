import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Register extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Register Page</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});