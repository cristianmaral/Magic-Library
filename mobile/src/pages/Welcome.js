import React, { Component } from 'react';
import { AsyncStorage, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Welcome extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    header: null,
    title: 'Início'
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Magic Library</Text>
        <Text style={styles.subtitle}>Adquira conhecimento</Text>

        <Image
          source={require('../assets/magic_book.png')}
          resizeMode="contain"
          style={styles.image}
        />

        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.button, styles.buttonLogin]} onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Fazer Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonRegister]} onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={styles.buttonText}>Realizar Cadastro</Text>
          </TouchableOpacity>
        </View>
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
    color: '#483b78',
    fontSize: 30,
    fontFamily: 'Roboto',
    fontWeight: 'bold'
  },

  subtitle: {
    color: '#483b78',
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

  buttons: {
    width: '100%'
  },

  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginHorizontal: 25
  },

  buttonLogin: {
    backgroundColor: '#483b78',
    marginTop: 20
  },

  buttonRegister: {
    backgroundColor: '#7665b3',
    marginTop: 8
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }

});