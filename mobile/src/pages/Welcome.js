import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Welcome extends Component {
  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Magic Library</Text>
        <Text style={styles.subtitle}>Adquira conhecimento</Text>
        <Image
          source={require('../../assets/icon.png')}
          resizeMode="contain"
          style={styles.image}
        />
        <TouchableOpacity style={[styles.button, styles.buttonLogin]} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Fazer Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonRegister]} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Realizar Cadastro</Text>
        </TouchableOpacity>
      </View >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: '#353061',
    fontSize: 30,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },

  subtitle: {
    color: '#353061',
    fontSize: 20,
    fontFamily: 'Roboto',
    marginTop: 2,
    marginBottom: 20,
    fontWeight: 'bold'
  },

  image: {
    width: width,
    height: height / 2
  },

  button: {
    height: 50,
    width: width * 0.81,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },

  buttonLogin: {
    backgroundColor: '#353061',
    marginTop: 20
  },

  buttonRegister: {
    backgroundColor: '#9B91B1',
    marginTop: 8
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  }

});