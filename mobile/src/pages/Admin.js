import React, { Component } from 'react';
import { AsyncStorage, Alert, Image, KeyboardAvoidingView, Picker, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-navigation-stack';
import * as DocumentPicker from 'expo-document-picker';

import api from '../services/api';

export default class pages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      authors: '',
      category: 'Administração',
      edition: '',
      volume: '',
      image: null,
      pdf: null
    };
  }

  static navigationOptions = {
    header: null
  };

  handleLogout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Welcome');
  };

  handleInputChange = (inputName, value) => {
    this.setState({ [inputName]: value });
  };

  handleSelectImage = async () => {
    let image = await DocumentPicker.getDocumentAsync({
      type: 'image/jpeg',
      copyToCacheDirectory: false
    });

    if (image.type == 'success') {
      this.handleInputChange('image', { uri: image.uri, type: 'image/jpeg', name: image.name });
    }
  };

  handleSelectPdf = async () => {
    let pdf = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      copyToCacheDirectory: false
    });

    if (pdf.type == 'success') {
      this.handleInputChange('pdf', { uri: pdf.uri, type: 'application/pdf', name: pdf.name });
    }
  };

  handleRegisterBook = async () => {
    try {
      const formData = new FormData();
      formData.append('title', this.state.title);
      formData.append('authors', this.state.authors);
      formData.append('category', this.state.category);
      formData.append('edition', this.state.edition);
      formData.append('volume', this.state.volume);
      formData.append('image', this.state.image);
      formData.append('pdf', this.state.pdf);
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'user_id': await AsyncStorage.getItem('user').user_id
        }
      };
      const response = await api.post('/books', formData, config);
      Alert.alert(
        'Cadastro realizado com sucesso',
        response.data.title,
        [
          { text: 'OK' }
        ]
      );
    } catch (error) {
      Alert.alert(
        'Falha no cadastro',
        error.response.data.error,
        [
          { text: 'OK' }
        ]
      );
    }
  };

  render() {
    return (
      <KeyboardAvoidingView enabled={true} behavior='padding' keyboardVerticalOffset={5} style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Icon
            style={styles.userIcon}
            color={'#483b78'}
            name={'user-circle'}
            size={40}
            onPress={this.handleLogout}
          />
        </View>
        <ScrollView style={styles.form}>
          <Text style={styles.label}>IMAGEM *</Text>
          <TouchableOpacity style={styles.imageButton} onPress={this.handleSelectImage}>
            {this.state.image && (
              <Image
                style={styles.image}
                source={{ uri: this.state.image.uri }}
              />
            )}
            {!this.state.image && (
              <Icon
                style={styles.cameraIcon}
                color={'#483b78'}
                name={'camera'}
                size={70}
              />
            )
            }
          </TouchableOpacity>

          <Text style={styles.label}>TÍTULO *</Text>
          <TextInput
            autoCapitalize='words'
            autoCorrect={false}
            placeholder='Título do livro'
            placeholderTextColor='#999'
            style={[styles.input, styles.validInput]}
            value={this.state.title}
            onChangeText={(value) => { this.handleInputChange('title', value) }}
          />

          <Text style={styles.label}>AUTORES *</Text>
          <TextInput
            autoCapitalize='words'
            autoCorrect={false}
            placeholder='Autores do livro (separados por vírgula)'
            placeholderTextColor='#999'
            style={[styles.input, styles.validInput]}
            value={this.state.authors}
            onChangeText={(value) => { this.handleInputChange('authors', value) }}
          />

          <Text style={styles.label}>CATEGORIA *</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={this.state.category}
              style={{ color: '#444' }}
              onValueChange={(value, valueIndex) => { this.handleInputChange('category', value) }}
            >
              <Picker.Item label="Administração" value="Administração" />
              <Picker.Item label="Agronomia" value="Agronomia" />
              <Picker.Item label="Ciência da Computação" value="Ciência da Computação" />
              <Picker.Item label="Ciências Biológicas" value="Ciências Biológicas" />
              <Picker.Item label="Educação Física" value="Educação Física" />
              <Picker.Item label="Engenharia de Alimentos" value="Engenharia de Alimentos" />
              <Picker.Item label="Física" value="Física" />
              <Picker.Item label="Gestão Ambiental" value="Gestão Ambiental" />
              <Picker.Item label="Matemática" value="Matemática" />
              <Picker.Item label="Química" value="Química" />
            </Picker>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>EDIÇÃO *</Text>
              <TextInput
                placeholder='Edição do livro'
                keyboardType='numeric'
                placeholderTextColor='#999'
                style={[styles.input, styles.validInput]}
                value={this.state.edition}
                onChangeText={(value) => { this.handleInputChange('edition', value) }}
              />
            </View>
            <View style={styles.inputColumn}>
              <Text style={styles.label}>VOLUME *</Text>
              <TextInput
                placeholder='Volume do livro'
                keyboardType='numeric'
                placeholderTextColor='#999'
                style={[styles.input, styles.validInput]}
                value={this.state.volume}
                onChangeText={(value) => { this.handleInputChange('volume', value) }}
              />
            </View>
          </View>

          <Text style={styles.label}>PDF *</Text>
          <View style={[styles.input, styles.validInput, styles.inputRow]}>
            <View style={styles.pdfButtonInput}>
              <TouchableOpacity style={styles.pdfButton} onPress={this.handleSelectPdf}>
                <Text style={styles.pdfButtonText}>Escolher PDF</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.pdfTextInput}>
              <Text style={styles.pdfText}>{this.state.pdf ? 'PDF inserido com sucesso' : 'Nenhum arquivo selecionado'}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.registerBookButton} onPress={this.handleRegisterBook}>
            <Text style={styles.registerBookText}>Cadastrar Livro</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40
  },

  header: {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    marginBottom: 15
  },

  logo: {
    width: 150,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center'
  },

  userIcon: {
    color: '#483b78',
    position: 'absolute',
    right: 20,
    top: 10
  },

  form: {
    width: '100%',
    paddingHorizontal: 20
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  imageButton: {
    width: 106,
    height: 150,
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch'
  },

  cameraIcon: {
    alignSelf: 'center'
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

  picker: {
    borderWidth: 1,
    height: 50,
    marginBottom: 15,
    borderRadius: 4,
    borderColor: '#999'
  },

  inputRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  inputColumn: {
    width: '48%'
  },

  errorMessage: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 10
  },

  pdfInput: {
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%'
  },

  pdfButtonInput: {
    width: '40%',
    justifyContent: 'center',
    alignContent: 'center'
  },

  pdfButton: {
    width: '100%',
    height: 30,
    backgroundColor: '#483b78',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },

  pdfButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },

  pdfTextInput: {
    width: '57%',
    justifyContent: 'center',
    alignContent: 'center'
  },

  pdfText: {
    fontSize: 15
  },

  registerBookButton: {
    height: 50,
    backgroundColor: '#483b78',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 20
  },

  registerBookText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase'
  },
});