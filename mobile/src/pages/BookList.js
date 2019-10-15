import React, { Component } from 'react';

import { AsyncStorage, Image, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class BookList extends Component {
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
              onChangeText={(value) => { this.setState({searchTerms: value})}}
              value={this.state.searchTerms}
            />
            <Icon
              style={styles.searchIcon}
              color={'#fff'}
              name={'search'}
              size={25}
            />
          </View>

          <Text style={styles.categoryName}>Ciência da Computação</Text>
          <FlatList
            contentContainerStyle={styles.list}
            data={this.state.books}
            keyExtractor={book => book.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Image style={styles.thumbnail} source={require('../assets/livro2.jpg')} />
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsText}>Ver Detalhes</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <Text style={styles.categoryName}>Ciência da Computação</Text>
          <FlatList
            contentContainerStyle={styles.list}
            data={this.state.books}
            keyExtractor={book => book.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Image style={styles.thumbnail} source={require('../assets/livro2.jpg')} />
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsText}>Ver Detalhes</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <Text style={styles.categoryName}>Ciência da Computação</Text>
          <FlatList
            contentContainerStyle={styles.list}
            data={this.state.books}
            keyExtractor={book => book.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Image style={styles.thumbnail} source={require('../assets/livro2.jpg')} />
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsText}>Ver Detalhes</Text>
                </TouchableOpacity>
              </View>
            )}
          />
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
    right: 20,
    top: 10
  },

  scrollView: {
    width: '100%'
  },

  search: {
    width: '100%',
    marginLeft: 20,
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
    width: '80%',
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
  },

  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20
  },

  list: {
    paddingLeft: 20,
    marginVertical: 10
  },

  listItem: {
    marginRight: 20,
    borderColor: '#483b78',
    borderWidth: 2,
    borderRadius: 4,
    width: 140,
    height: 232,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10
  },

  thumbnail: {
    width: 106,
    height: 150,
    resizeMode: 'stretch',
    borderRadius: 2
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 3
  },

  detailsButton: {
    height: 30,
    backgroundColor: '#483b78',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    width: 110,
    position: 'absolute',
    bottom: 10
  },

  detailsText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase'
  }
})