/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
const options = {
  title: 'konsepKoding',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
};
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      pic: null,
    };
  }
  static navigationOptions = {
    title: 'InputGambar',
    headerStyle: {
      backgroundColor: '#03A9F4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  myfun = () => {
    //alert('clicked');

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = {uri: response.uri};

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
          pic: response.data,
        });
      }
    });
  };
  uploadPic = () => {
    // IP Adreess dan letak file up
    RNFetchBlob.fetch(
      'POST',
      'http://10.100.100.205/react-native-web/uploadGambar.php',
      {
        Authorization: 'Bearer access-token',
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      [
        // name: image adalah nama properti dari api kita
        {name: 'image', filename: 'absen_driver.jpg', data: this.state.pic},
      ],
    ).then((resp) => {
      console.log('Response Saya');
      console.log(resp.data);
      alert('your image uploaded successfully');
      this.setState({avatarSource: null});
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Konsep Koding Upload Gambar</Text>

        <Image
          source={this.state.avatarSource}
          style={{width: '100%', height: 100, margin: 100}}
        />

        <TouchableOpacity
          style={{backgroundColor: 'orange', margin: 10, padding: 10}}
          onPress={this.myfun}>
          <Text style={{color: '#fff'}}>Pilih Image</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.uploadPic}>
          <Text>Upload</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});