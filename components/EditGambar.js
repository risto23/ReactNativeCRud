/* eslint-disable react-native/no-inline-styles */
/* eslint-disable radix */
/* eslint-disable prettier/prettier */
//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {version} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  
  ActivityIndicator,
  ScrollView,Alert,
} from 'react-native';
import Loading from 'react-native-whc-loading';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
const options = {
  title: 'konsepKoding',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
};



export default class DetailUser extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
     
      id: '',
      nama_gambar: '',
      url_gambar: '',
      url_gambar_temp: '',
     
      isLoading: false,
    };
  }

  static navigationOptions = {
    title: 'EditGambar',
    headerStyle: {
      backgroundColor: '#03A9F4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  componentDidMount() {
 // eslint-disable-next-line react/no-did-mount-set-state
 this.setState(
      {
      id: this.props.navigation.state.params.id,
       nama_gambar: this.props.navigation.state.params.nama_gambar,
      url_gambar_temp: this.props.navigation.state.params.url_gambar,
     

       },
//console.log(this.props.navigation.state.params.tgl_lahir)
    )
  }

  updateData = () =>
  { 
   // var data= 
    //console.log(data)
    this.refs.loading.show();
    try {
      fetch('http://10.100.100.205/react-native-web/update.php', {
       method: 'POST',
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
       },
       body: JSON.stringify({
       id:this.state.data_id,
         nama:this.state.data_nama,
         email:this.state.data_email,
         jk:this.state.data_jk,
        telp:this.state.data_telp,
         tgl_lahir:this.state.tgl_lahir,
         pekerjaan:this.state.data_pekerjaan,
         })
    
       }).then ((response) => //console.log("ini respon", response)
       response.json()
       )
       .then((responsejson) => 
       {
         setTimeout(() => {
           this.refs.loading.close();
           alert(responsejson);
         }, 2000);
       }).catch((error) => {
         this.refs.loading.close();
         console.error("String error ", error);
       })
       this.props.navigation.navigate('ViewUser');
    } catch (error) {
     this.refs.loading.close();
     console.error("String error2 ",error);
    }
    
  }

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
      'http://10.100.100.205/react-native-web/EditGambar.php',
      {
        Authorization: 'Bearer access-token',
        otherHeader: 'foo',
        'Content-Type': 'multipart/form-data',
      },
      [
        // name: image adalah nama properti dari api kita
        {name: 'image', filename: 'absen_driver.jpg', data: this.state.pic,url_gambar_temp: this.state.url_gambar_temp},
      ],
    ).then((resp) => {
      console.log('Response Saya');
      console.log(resp.data);
      alert(resp);
      this.setState({avatarSource: null});
    });
  };



  render() {
    // let {row, label, container, btnContainerUpdate,btnContainerDelete, btnText, picker} = styles;
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
        <View style={styles.container}>
        <Text style={styles.welcome}>Edit Gambar</Text>

        <Image
          source={this.state.avatarSource}
          style={{width: '100%', height: 300, margin: 10}}
        />

        <TouchableOpacity
          style={{backgroundColor: 'orange', margin: 10, padding: 10}}
          onPress={this.myfun}>
          <Text style={{color: '#fff'}}>Pilih Image</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.uploadPic}>
          <Text>Upload</Text>
        </TouchableOpacity>
        <Loading ref="loading" />
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
