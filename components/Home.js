/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  Button,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    //  alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  namaPahlawan: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  asal: {
    fontSize: 18,
  },
  textInput: {
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    margin: 10,
    paddingLeft: 10,
    fontSize: 18,
  },
  btn: {
    backgroundColor: '#0fa0d1',
    height: 50,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default class Home extends React.Component 
{
  static navigationOptions = 
  {
    title: 'Menu',
    headerStyle: {
      backgroundColor: '#03A9F4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render()
  {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Pahlawan')}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Pahlawan</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={() => this.props.navigation.navigate('Data')}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Identitas</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={() => this.props.navigation.navigate('DataDiri')}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Data Diri dengan DB</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={() => this.props.navigation.navigate('ViewUser')}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Semua Data</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={() => this.props.navigation.navigate('InputGambar')}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Gambar</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={() => this.props.navigation.navigate('ViewGambar')}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Semua Gambar</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
