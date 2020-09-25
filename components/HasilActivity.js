//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
} from 'react-native';

export default class HasilActivity extends React.Component {
  static navigationOptions = {
    title: 'Hasil',
    headerStyle: {
      backgroundColor: '#03A9F4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.textStyle}>
          Nama = {this.props.navigation.state.params.NamaOBJ}
        </Text>

        <Text style={styles.textStyle}>
          Asal = {this.props.navigation.state.params.AsalOBJ}
        </Text>

        <Text style={styles.textStyle}>
          Alamat = {this.props.navigation.state.params.alamatOBJ}
        </Text>
        <Text style={styles.textStyle}>
          Waktu = {this.props.navigation.state.params.WaktuOBJ}
        </Text>
        <Text style={styles.textStyle}>
          Tanggal yang dipilih = {this.props.navigation.state.params.dateOBJ}
        </Text>
        <Text style={styles.textStyle}>
          Jenis Kelamin = {this.props.navigation.state.params.kelaminOBJ}
        </Text>
        <Text style={styles.textStyle}>
          Agama = {this.props.navigation.state.params.agamaOBJ}
        </Text>
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={() => this.props.navigation.navigate('Home')}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Home</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  namaPahlawan: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
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
  }
});
