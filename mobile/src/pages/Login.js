import React, { Component } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header } from 'react-navigation-stack';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      hidePassword: true
    };
  }

  static navigationOptions = {
    title: 'Login',
    headerTintColor: '#483b78'
  };

  render() {
    return (
      <KeyboardAvoidingView enabled={true} behavior='padding' keyboardVerticalOffset={Header.HEIGHT + 20} style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo}/>
        <View style={styles.form}>
          <Text style={styles.label}>E-MAIL</Text>
          <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='email-address'
            placeholder='Seu e-mail'
            placeholderTextColor='#999'
            style={styles.input}
            value={this.state.email}
            onChangeText={(email) => {this.setState({email: email})}}
          />

          <Text style={styles.label}>SENHA</Text>
          <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='Sua senha'
            placeholderTextColor='#999'
            secureTextEntry={this.state.hidePassword}
            style={styles.input}
            value={this.state.password}
            onChangeText={(password) => {this.setState({password: password})}}
          />
          <Icon style={styles.visibilityToggleButton}
            color={'#999'}
            onPress={() => {this.setState({hidePassword: !this.state.hidePassword})}}
            name={this.state.hidePassword ? 'visibility' : 'visibility-off'}
            size={25}
          />
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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

  logo: {
    width: 200,
    height: 83,
    resizeMode: 'contain',
    marginBottom: 20
  },

  form: {
    width: '100%',
    paddingHorizontal: 25
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#999',
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#444',
    height: 50,
    marginBottom: 20,
    borderRadius: 4
  },

  visibilityToggleButton:
  {
    position: 'absolute',
    right: 0,
    top: 136,
    marginRight: 24,
    paddingHorizontal: 10,
    zIndex: 1
  },

  loginButton: {
    height: 50,
    backgroundColor: '#483b78',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },

  loginText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase'
  },

  forgotPasswordButton: {
    marginTop: 15
  },

  forgotPasswordText: {
    color: '#999',
    textAlign: 'center',
    textDecorationLine: 'underline'
  }
});