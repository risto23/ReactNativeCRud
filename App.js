/* eslint-disable no-dupe-class-members */
import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {YellowBox} from 'react-native';

import PahlawanActivity from './components/PahlawanActivity';
import Home from './components/Home';

import IdentitasActivity from './components/IdentitasActivity';
import HasilActivity from './components/HasilActivity';
import DataDiri from './components/DataDiri';
import ViewUser from './components/ViewUser';
import DetailUser from './components/DetailUser';
import InputGambar from './components/InputGambar';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#e1e5eb',
    marginBottom: 5,
  },
  gambar: {
    width: 400,
    height: 400,
  },
});

class SplashScreen extends React.Component {
  render() {
    const viewStyles = [styles.container, {backgroundColor: '#0f8d08'}];
    const textStyles = {
      color: 'white',
      fontSize: 40,
      fontWeight: 'bold',
    };

    return (
      <View style={viewStyles}>
        <Image
          style={styles.gambar}
          source={require('./img/whatsapp_PNG20.png')}
        />
      </View>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {isLoading: true};
  }
  componentDidMount() {
    YellowBox.ignoreWarnings(['Animated: `useNativeDriver`']);
}

  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve('result');
      }, 3000),
    );
  };

  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.setState({isLoading: false});
    }
  }
  render() {
    if (this.state.isLoading) {
      return <SplashScreen />;
    }
    return <AppContainer />;
  }
}

const AppStackNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  }, //halaman home
  Pahlawan: {
    screen: PahlawanActivity,
    navigationOptions: {
      header: null,
    },
  }, //halaman activity
  Data: {
    screen: IdentitasActivity,
    navigationOptions: {
      header: null,
    },
  }, // halaman identitas
  Hasil: {
    screen: HasilActivity,
    navigationOptions: {
      header: null,
    },
  }, //halaman hasil
  DataDiri: {
    screen: DataDiri,
    navigationOptions: {
      header: null,
    },
  },
  ViewUser: {
    screen: ViewUser,
    navigationOptions: {
      header: null,
    },
  },
  DetailUser: {
    screen: DetailUser,
    navigationOptions: {
      header: null,
    },
  },
  InputGambar: {
    screen: InputGambar,
    navigationOptions: {
      header: null,
    },
  }
});

const AppContainer = createAppContainer(AppStackNavigator);
