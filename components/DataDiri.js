/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Picker,
  Image,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import {
  Container,
  Header,
  Title,
  Content,
  ListItem,
  Textarea,
  Right,
  Left,
  Icon,
  Form,
  CheckBox,
  Body,
  Item,
  Input,
  Label,
  Radio,
} from 'native-base';
import Loading from 'react-native-whc-loading';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { version } from 'react';
const options = {
  title: 'konsepKoding',
  takePhotoButtonTitle: 'Take photo with your camera',
  chooseFromLibraryButtonTitle: 'Choose photo from library',
};
var radio_props = [
  
  {label: 'Pria', value: '0'},
  {label: 'Wanita', value: '1'}

];

export default class DataDiri extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPekerjaan: ['Pelajar', 'Wiraswasta', 'PNS'],
      datajk: [
        {label: 'Pria', value: 0},
        {label: 'Wanita', value: 1},
      ],
      
      // data_id: '',
      data_nama: '',
      data_jk: '',
      tgl_lahir: null,
      data_email: '',
      data_telp: '',
      data_pekerjaan: 'pelajar',
      
      id_gambar:'',
      avatarSource: null,
      pic: null,
      isLoading: true,
    };
  }

  //picker
  onValueChange(value: string) {
    this.setState({
      selected: value,
    });
  }

  static navigationOptions = {
    title: 'KTP',
    headerStyle: {
      backgroundColor: '#03A9F4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  resetData = () =>
{
  this.state = {
    data_nama: '',
      data_jk: '',
      tgl_lahir: null,
      data_email: '',
      data_telp: '',
      data_pekerjaan: 'pelajar',
      
  };
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
uploadPic = (id) => {
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
    let {container, row, label, btnContainer, btnText, picker,btnContainerReset} = styles;
    // const {nama, telp, email, pekerjaan, tgl_lahir} = this.state.formData;
    return (
      <ScrollView>
        
        <KeyboardAvoidingView style={container} enabled>
          <Content>
            <Form>
          <View style={row}>
            <Item floatingLabel>
              <Label style={label}>Nama</Label>
              <Input
                style={[label, {marginBottom: 10}]}
                onChangeText={(text) => {
                  this.setState({data_nama: text});
                
                }}
              />
            </Item>
          </View>
          <View style={row}>
            <Text style={[label, {marginBottom: 10}]}>Jenis Kelamin</Text>
            <RadioForm
              radio_props={radio_props}
              initial={parseInt(this.state.data_jk)}
              // formHorizontal={false}
              // labelHorizontal={true}
              labelStyle={{paddingRight: 20}}
              buttonColor={'#2196f3'}
              animation={true}
              onPress={(value) => {
                this.setState({data_jk: value});
              }}
            />
          </View>
          <View style={row}>
            <Text style={[label, {marginBottom: 10}]}>Tanggal Lahir</Text>
            <DatePicker
              style={{width: '100%'}}
              // eslint-disable-next-line no-undef
              date={this.state.tgl_lahir}
              mode="date"
              placeholder="select date"
              format="DD-MM-YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: 0,
                  top: 4,
                  marginLeft: 0,
                },

                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {
                this.setState({tgl_lahir: date});
              }}
            />
          </View>
          <View style={row}>
            <Item floatingLabel>
              <Label style={label}>Email</Label>
              <Input
               value={this.state.data_email}
                keyboardType="email-address"
                onChangeText={(text) => {
                  this.setState({data_email: text});
                }}
              />
            </Item>
          </View>
          <View style={row}>
            <Item floatingLabel>
              <Label style={label}>No Telpon</Label>
              <Input
               value={this.state.data_telp}
                style={{marginBottom: 10}}
                keyboardType="phone-pad"
                onChangeText={(text) => {
                  this.setState({data_telp: text});
                }}
              />
            </Item>
          </View>
          <View style={row}>
            <Text style={[label, {marginBottom: 10}]}>Pekerjaan</Text>
            <Picker
              mode="dropdown"
              iosHeader="Select your SIM"
              iosIcon={<Icon name="arrow-down" />}
              style={picker}
              selectedValue={this.state.data_pekerjaan}
              onValueChange={(item) => {
                this.setState({data_pekerjaan: item});
              }}>
              {this.state.dataPekerjaan.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item}
                  value={item.toLocaleLowerCase()}
                />
              ))}
            </Picker>
          </View>
          <View style={row}>
          <Image
          source={this.state.avatarSource}
          style={{width: '100%', height: 100, margin: 100}}
        />
        <TouchableOpacity
          style={{backgroundColor: 'orange', margin: 10, padding: 10}}
          onPress={this.myfun}>
          <Text style={{color: '#fff'}}>Pilih Image</Text>
        </TouchableOpacity>
          </View>
          <View style={row}>
              <View style={row}>
                {/* <Text>{JSON.stringify(this.state.formData)}</Text> */}
                <TouchableHighlight
                  onPress={this._saveData}
                  style={btnContainer}>
                  <Text style={btnText}>Simpan</Text>
                </TouchableHighlight>
              </View>
              </View>
              {/* <View style={row}>
              <TouchableHighlight
                  onPress={this.resetData}
                  style={btnContainerReset}>
                  <Text style={btnText}>Reset</Text>
                </TouchableHighlight>
              </View> */}
            </Form>
          </Content>
        </KeyboardAvoidingView>
        <Loading ref="loading" />
      </ScrollView>
    );
  }
  _saveData = async () => {
    this.refs.loading.show();
    try {
      await fetch('http://10.100.100.205/react-native-web/insert.php', {
        method: 'POST',
        headers: {
          // Accept: 'application/json',
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
            }),
      })
        .then((response) => response.json())
        .then((json) => {
          //return json.movies;
          setTimeout(() => {
            this.refs.loading.close();
            id_gambar = json['result'];
          }, 2000);
        });
    } catch (error) {
      this.refs.loading.close();
      console.error(error);
    }
    this.uploadPic(this.state.id_gambar);
    this.props.navigation.navigate('ViewUser');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
  },
  btnContainer: {
    backgroundColor: '#1A8',
    padding: 10,
    alignItems: 'center',
  },
  btnContainerReset: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 20,
    color: 'white',
  },
  picker: {
    width: undefined,
    height: 50,
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
