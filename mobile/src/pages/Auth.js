import React, { Component } from 'react';
import { AsyncStorage, Image, StyleSheet, View } from 'react-native';

export default class Auth extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    if (user) {
      if (user.admin) {
        this.props.navigation.navigate('Admin');
      }
      else {
        this.props.navigation.navigate('Main');
      }
    }
    else {
      this.props.navigation.navigate('Welcome');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.splash}
          source={require('../../assets/splash.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  splash: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
});

