import React, { Component } from 'react';
import { AsyncStorage, Image, SafeAreaView, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import BookList from '../components/BookList';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: ''
    };
  };

  static navigationOptions = {
    header: null
  };

  handleLogout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Welcome');
  };

  handleSearch = () => {
    const { searchTerms } = this.state;
    if (searchTerms != '') {
      this.props.navigation.navigate('Search', { searchTerms: this.state.searchTerms });
    }
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
            onPress={this.handleLogout}
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
              onPress={this.handleSearch}
            />
          </View>

          <BookList category='Administração' navigation={this.props.navigation} />
          <BookList category='Agronomia' navigation={this.props.navigation} />
          <BookList category='Ciência da Computação' navigation={this.props.navigation} />
          <BookList category='Ciências Biológicas' navigation={this.props.navigation} />
          <BookList category='Educação Física' navigation={this.props.navigation} />
          <BookList category='Física' navigation={this.props.navigation} />
          <BookList category='Gestão Ambiental' navigation={this.props.navigation} />
          <BookList category='Engenharia de Alimentos' navigation={this.props.navigation} />
          <BookList category='Química' navigation={this.props.navigation} />
          <BookList category='Matemática' navigation={this.props.navigation} />
        </ScrollView>
      </SafeAreaView>
    );
  };
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
    marginBottom: 15
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