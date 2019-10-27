import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native';

import api from '../services/api';

const { width, height } = Dimensions.get('window');

export default class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  };

  async componentWillMount() {
    const books = await api.get('/books', {
      params: { category: this.props.category }
    });
    this.setState({ books: books.data });
  }

  render() {
    return (
      <View>
        {this.state.books.length > 0 && (
          <View>
            <Text style={styles.categoryName}>{this.props.category}</Text>
            <FlatList
              contentContainerStyle={styles.list}
              data={this.state.books}
              keyExtractor={book => book._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.listItem}>
                  <Image style={styles.thumbnail} source={{ uri: item.image_url.replace('localhost', '192.168.0.109') }} />
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 11
  },

  list: {
    paddingLeft: 11,
    marginVertical: 11
  },

  listItem: {
    marginRight: 11,
    width: width * 0.29,
    height: height * 0.22,
    alignItems: 'center'
  },

  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch'
  }
});

