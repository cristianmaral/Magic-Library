import React, { Component } from 'react';
import { CheckBox, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header } from 'react-navigation-stack';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      hidePassword: true,
      hideConfirmPassword: true,
      receiveNotifications: false
    };
  }

  static navigationOptions = {
    title: 'Cadastro',
    headerTintColor: '#483b78'
  };

  render() {
    return (
      <KeyboardAvoidingView enabled={true} behavior='padding' keyboardVerticalOffset={Header.HEIGHT + 20} style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <View style={styles.form}>
          <Text style={styles.label}>NOME COMPLETO*</Text>
          <TextInput
            autoCapitalize='words'
            autoCorrect={false}
            placeholder='Seu nome completo'
            placeholderTextColor='#999'
            style={styles.input}
            value={this.state.name}
            onChangeText={(name) => {this.setState({name: name})}}
          />

          <Text style={styles.label}>E-MAIL *</Text>
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

          <Text style={styles.label}>SENHA *</Text>
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
          <Icon style={[styles.visibilityToggleButton, styles.passwordToggleButton]}
            color={'#999'}
            onPress={() => {this.setState({hidePassword: !this.state.hidePassword})}}
            name={this.state.hidePassword ? 'visibility' : 'visibility-off'}
            size={25}
          />

          <Text style={styles.label}>CONFIRMAR SENHA *</Text>
          <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='Confirme sua senha'
            placeholderTextColor='#999'
            secureTextEntry={this.state.hideConfirmPassword}
            style={styles.input}
            value={this.state.confirmPassword}
            onChangeText={(confirmPassword) => {this.setState({confirmPassword: confirmPassword})}}
          />
          <Icon style={[styles.visibilityToggleButton, styles.confirmPasswordToggleButton]}
            color={'#999'}
            onPress={() => {this.setState({hideConfirmPassword: !this.state.hideConfirmPassword})}}
            name={this.state.hideConfirmPassword ? 'visibility' : 'visibility-off'}
            size={25}
          />

          <View style={styles.notificationCheckBox}>
            <CheckBox
              value={this.state.receiveNotifications}
              onChange={() => { this.setState({ receiveNotifications: !this.state.receiveNotifications }) }}
            />
            <Text style={styles.checkBoxText}>Desejo receber notificações de lançamentos</Text>
          </View>

          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.loginText}>Cadastrar</Text>
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
    marginBottom: 10
  },

  form: {
    width: '100%',
    paddingHorizontal: 25,
    marginTop: 25,
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
    marginBottom: 15,
    borderRadius: 4
  },

  visibilityToggleButton:
  {
    position: 'absolute',
    right: 0,
    marginRight: 24,
    paddingHorizontal: 10,
    zIndex: 1
  },

  passwordToggleButton: {
    top: 224
  },

  confirmPasswordToggleButton: {
    top: 317
  },

  registerButton: {
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
  },

  notificationCheckBox: {
    flexDirection: 'row',
    marginLeft: -8,
    marginBottom: 15
  },

  checkBoxText: {
    fontWeight: 'bold',
    color: '#444',
    marginTop: 5.5
  }
});