import React, { Component } from 'react';
import { Alert, AsyncStorage, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header } from 'react-navigation-stack';

import api from '../services/api';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      hidePassword: true,
      formErrors: {
        email: false,
        password: false
      }
    };
  }

  static navigationOptions = {
    title: 'Login',
    headerTintColor: '#483b78'
  };

  handleInputChange = (inputName, value) => {
    const { formErrors } = this.state;
    switch (inputName) {
      case 'email':
        emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        formErrors.email = emailRegex.test(value.toLowerCase()) ? false : true;
        break;
      case 'password':
        formErrors.password = value.length >= 6 ? false : true;
        break;
    }
    this.setState({ formErrors, [inputName]: value });
  }

  handleLogin = async () => {
    const { email, password, formErrors } = this.state;
    if (email == '')
      formErrors.email = true;
    if (password == '')
      formErrors.password = true
    this.setState({ email, password, formErrors });
    if (!formErrors.email && !formErrors.password) {
      try {
        const response = await api.post('/login', {
          email,
          password
        });
        const { _id, admin } = response.data;
        await AsyncStorage.setItem('user', JSON.stringify({ id: _id, admin }));
        if (admin) {
          this.props.navigation.navigate('Admin');
        }
        else {
          this.props.navigation.navigate('Main');
        }
      } catch (error) {
        Alert.alert(
          'Falha na autenticação',
          error.response.data.error,
          [
            { text: 'OK' }
          ]
        );
      }
    }
  };

  render() {
    return (
      <KeyboardAvoidingView enabled={true} behavior='padding' keyboardVerticalOffset={Header.HEIGHT + 20} style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <View style={styles.form}>
          <Text style={styles.label}>E-MAIL</Text>
          <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='email-address'
            placeholder='Seu e-mail'
            placeholderTextColor='#999'
            style={[styles.input, !this.state.formErrors.email ? styles.validInput : styles.errorInput]}
            value={this.state.email}
            onChangeText={(value) => { this.handleInputChange('email', value) }}
          />
          {this.state.formErrors.email && (
            <Text style={styles.errorMessage}>E-mail inválido</Text>
          )}

          <View>
            <Text style={styles.label}>SENHA</Text>
            <TextInput
              autoCapitalize='none'
              autoCorrect={false}
              placeholder='Sua senha'
              placeholderTextColor='#999'
              secureTextEntry={this.state.hidePassword}
              style={[styles.input, !this.state.formErrors.password ? styles.validInput : styles.errorInput]}
              value={this.state.password}
              onChangeText={(value) => { this.handleInputChange('password', value) }}
            />
            <Icon style={styles.visibilityToggleButton}
              color={'#999'}
              onPress={() => { this.setState({ hidePassword: !this.state.hidePassword }) }}
              name={this.state.hidePassword ? 'visibility' : 'visibility-off'}
              size={25}
            />
            {this.state.formErrors.password && (
              <Text style={styles.errorMessage}>Senha inválida (mínimo de 6 caracteres)</Text>
            )}
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={this.handleLogin}>
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
    paddingHorizontal: 11
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#444',
    height: 50,
    marginBottom: 20,
    borderRadius: 4
  },

  validInput: {
    borderColor: '#999'
  },

  errorInput: {
    borderColor: '#FF0000'
  },

  errorMessage: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 10
  },

  visibilityToggleButton:
  {
    position: 'absolute',
    right: 0,
    top: 40,
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