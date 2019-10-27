import React, { Component } from 'react';
import { AsyncStorage, Image, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import BookList from '../components/BookList';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [
        { id: '1', title: 'Projeto de Algoritmos', image: '../assets/livro2.jpg' },
        { id: '2', title: 'Computação', image: '../assets/livro2.jpg' },
        { id: '3', title: 'Computação', image: '../assets/livro2.jpg' },
        { id: '4', title: 'Computação', image: '../assets/livro2.jpg' },
        { id: '5', title: 'Computação', image: '../assets/livro2.jpg' },
        { id: '6', title: 'Computação', image: '../assets/livro2.jpg' }
      ],
      searchTerms: ''
    };
  };

  static navigationOptions = {
    header: null
  };

  logOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Welcome');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Icon
            style={styles.userIcon}
            color={'#483b78'}
            name={'user-circle'}
            size={40}
            onPress={this.logOut}
          />
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.search}>
            <TextInput
              style={styles.searchBar}
              placeholder='O que você está procurando?'
              placeholderTextColor='#999'
              onChangeText={(value) => { this.setState({ searchTerms: value }) }}
              value={this.state.searchTerms}
            />
            <Icon
              style={styles.searchIcon}
              color={'#fff'}
              name={'search'}
              size={25}
            />
          </View>

          <BookList category='Administração' />
          <BookList category='Agronomia' />
          <BookList category='Ciência da Computação' />
          <BookList category='Ciências Biológicas' />
          <BookList category='Educação Física' />
          <BookList category='Física' />
          <BookList category='Gestão Ambiental' />
          <BookList category='Engenharia de Alimentos' />
          <BookList category='Química' />
          <BookList category='Matemática' />
        </ScrollView>
      </SafeAreaView>
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
    right: 11,
    top: 10
  },

  scrollView: {
    width: '100%'
  },

  search: {
    width: '100%',
    marginLeft: 11,
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginBottom: 10
  },

  searchBar: {
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#444',
    height: 45,
    width: '84%',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderColor: '#483b78'
  },

  searchIcon: {
    backgroundColor: '#483b78',
    width: '10%',
    padding: 9,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  }
})