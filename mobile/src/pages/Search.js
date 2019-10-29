import React, { Component } from 'react';
import { AsyncStorage, Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from '../services/api';

const { width, height } = Dimensions.get('window');

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null,
      searchTerms: this.props.navigation.getParam('searchTerms', '')
    };
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Busca',
    headerRight: (
      <Icon
        style={{ color: '#483b78', right: 11 }}
        color={'#483b78'}
        name={'user-circle'}
        size={40}
        onPress={async () => {
          await AsyncStorage.clear();
          navigation.navigate('Welcome');
        }}
      />
    )
  });

  async componentDidMount() {
    const books = await api.get('/books', {
      params: { searchTerms: this.state.searchTerms }
    });
    this.setState({ books: books.data });
  };

  handleSearch = async () => {
    const { searchTerms } = this.state;
    if (searchTerms != '') {
      const books = await api.get('/books', {
        params: { searchTerms: this.state.searchTerms }
      });
      this.setState({ books: books.data });
    }
  };

  handleBookClick = (book) => {
    this.props.navigation.navigate('Book', { book })
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
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
              onPress={this.handleSearch}
            />
          </View>
          {this.state.books && this.state.books.length > 0 && (
            <FlatList
              contentContainerStyle={styles.list}
              data={this.state.books}
              keyExtractor={book => book._id}
              vertical
              numColumns={3}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.listItem} onPress={() => this.handleBookClick(item)}>
                  <Image style={styles.thumbnail} source={{ uri: item.image_url.replace('localhost', '192.168.0.109') }} />
                </TouchableOpacity>
              )}
            />
          )}
          {this.state.books && this.state.books.length == 0 && (
            <Text style={styles.searchMessageText}>Não foi possível encontrar nenhum resultado</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  scrollView: {
    width: '100%'
  },

  search: {
    width: '100%',
    marginLeft: 11,
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginVertical: 15
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
  },

  list: {
    paddingLeft: 11
  },

  listItem: {
    marginRight: 8,
    marginBottom: 8,
    width: width * 0.30,
    height: height * 0.23,
    alignItems: 'center'
  },

  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch'
  },

  searchMessageText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 11
  }
});

