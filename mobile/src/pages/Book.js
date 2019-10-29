import React, { Component } from 'react';
import { AsyncStorage, Dimensions, Image, Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: this.props.navigation.getParam('book', null)
    };
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Detalhes',
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

  handleDownload = () => {
    Linking.openURL(this.state.book.pdf_url.replace('localhost', '192.168.0.109'));
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Image style={styles.thumbnail} source={{ uri: this.state.book.image_url.replace('localhost', '192.168.0.109') }} />

          <Text style={styles.title}>{this.state.book.title}</Text>

          <View style={styles.attribute}>
            <Text style={[styles.label, styles.text]}>Autores: </Text>
            <Text style={styles.text}>{this.state.book.authors}</Text>
          </View>

          <View style={styles.attribute}>
            <Text style={[styles.label, styles.text]}>Categoria: </Text>
            <Text style={styles.text}>{this.state.book.category}</Text>
          </View>

          <View style={styles.attribute}>
            <Text style={[styles.label, styles.text]}>Edição: </Text>
            <Text style={styles.text}>{this.state.book.edition}</Text>
          </View>

          <View style={styles.attribute}>
            <Text style={[styles.label, styles.text]}>Volume: </Text>
            <Text style={styles.text}>{this.state.book.volume}</Text>
          </View>

          <TouchableOpacity style={styles.downloadButton} onPress={this.handleDownload}>
            <Text style={styles.downloadText}>Baixar PDF</Text>
          </TouchableOpacity>
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
    width: '100%',
    paddingHorizontal: 11,
    paddingTop: 20,
    paddingBottom: 15
  },

  thumbnail: {
    width: width * 0.6,
    height: height * 0.45,
    resizeMode: 'stretch',
    alignSelf: 'center'
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 15
  },

  attribute: {
    alignContent: 'center',
    flexDirection: 'row',
    width: '79%',
    marginBottom: 10
  },

  label: {
    fontWeight: 'bold'
  },

  text: {
    fontSize: 18,
    textAlign: 'auto'
  },

  downloadButton: {
    height: 50,
    backgroundColor: '#483b78',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 5
  },

  downloadText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase'
  }
});