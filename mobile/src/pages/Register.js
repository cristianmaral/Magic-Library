import React, { Component } from 'react';
import { CheckBox, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
      receiveNotifications: false,
      formErrors: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false
      }
    };
  }

  static navigationOptions = {
    title: 'Cadastro',
    headerTintColor: '#483b78'
  };

  handleInputChange = (inputName, value) => {
    const { formErrors } = this.state;
    switch (inputName) {
      case 'name':
        nameRegex = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)+$/;
        formErrors.name = nameRegex.test(value) ? false : true;
        break;
      case 'email':
        emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        formErrors.email = emailRegex.test(value.toLowerCase()) ? false : true;
        break;
      case 'password':
        formErrors.password = value.length >= 6 ? false : true;
        break;
      case 'confirmPassword':
        formErrors.confirmPassword = value == this.state.password ? false : true;
        break;
    }
    this.setState({ formErrors, [inputName]: value });
  }

  render() {
    return (
      <KeyboardAvoidingView enabled={true} behavior='padding' keyboardVerticalOffset={Header.HEIGHT + 28} style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <ScrollView style={styles.form}>
          <Text style={styles.label}>NOME COMPLETO *</Text>
          <TextInput
            autoCapitalize='words'
            autoCorrect={false}
            placeholder='Seu nome completo'
            placeholderTextColor='#999'
            style={[styles.input, !this.state.formErrors.name ? styles.validInput : styles.errorInput]}
            value={this.state.name}
            onChangeText={(value) => { this.handleInputChange('name', value) }}
          />
          {this.state.formErrors.name && this.state.name.length > 0 && (
            <Text style={styles.errorMessage}>Nome completo inválido</Text>
          )}

          <Text style={styles.label}>E-MAIL *</Text>
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
          {this.state.formErrors.email && this.state.email.length > 0 && (
            <Text style={styles.errorMessage}>E-mail inválido</Text>
          )}

          <View>
            <Text style={styles.label}>SENHA *</Text>
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
            {this.state.formErrors.password && this.state.password.length > 0 && (
              <Text style={styles.errorMessage}>Senha inválida (mínimo de 6 caracteres)</Text>
            )}
          </View>

          <View>
            <Text style={styles.label}>CONFIRMAR SENHA *</Text>
            <TextInput
              autoCapitalize='none'
              autoCorrect={false}
              placeholder='Confirme sua senha'
              placeholderTextColor='#999'
              secureTextEntry={this.state.hideConfirmPassword}
              style={[styles.input, !this.state.formErrors.confirmPassword ? styles.validInput : styles.errorInput]}
              value={this.state.confirmPassword}
              onChangeText={(value) => { this.handleInputChange('confirmPassword', value) }}
            />
            <Icon style={styles.visibilityToggleButton}
              color={'#999'}
              onPress={() => { this.setState({ hideConfirmPassword: !this.state.hideConfirmPassword }) }}
              name={this.state.hideConfirmPassword ? 'visibility' : 'visibility-off'}
              size={25}
            />
            {this.state.formErrors.confirmPassword && this.state.confirmPassword.length > 0 && (
              <Text style={styles.errorMessage}>As senhas não conferem</Text>
            )}
          </View>

          <View style={styles.notificationCheckBox}>
            <CheckBox
              value={this.state.receiveNotifications}
              onChange={() => { this.setState({ receiveNotifications: !this.state.receiveNotifications }) }}
            />
            <Text style={styles.checkBoxText}>Desejo receber notificações de lançamentos</Text>
          </View>

          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerText}>Cadastrar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  logo: {
    width: 200,
    height: 83,
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop: 30
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
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#444',
    height: 50,
    marginBottom: 15,
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

  registerButton: {
    height: 50,
    backgroundColor: '#483b78',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 20
  },

  registerText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase'
  },

  notificationCheckBox: {
    flexDirection: 'row',
    marginLeft: -7.1,
    marginBottom: 15
  },

  checkBoxText: {
    fontWeight: 'bold',
    color: '#444',
    marginTop: 5.5
  }
});