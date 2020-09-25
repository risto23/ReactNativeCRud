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
  TextInput,
  TouchableHighlight,
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

export default class DataDiri extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPekerjaan: ['Pelajar', 'Wiraswasta', 'PNS'],
      datajk: [
        {label: 'Pria', value: 0},
        {label: 'Wanita', value: 1},
      ],
      formData: {
        nama: '',
        jk: '',
        tgl_lahir: null,
        email: '',
        telp: '',
        pekerjaan: 'pelajar',
      },
      isLoading: true
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
  }
}
  

  render() {
    let {container, row, label, btnContainer, btnText, picker,btnContainerReset} = styles;
    const {nama, telp, email, pekerjaan, tgl_lahir} = this.state.formData;
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
                    onChangeText={(nama) =>
                      this.setState((prevState) => ({
                        formData: {
                          ...prevState.formData,
                          nama,
                        },
                      }))
                    }
                  />
                </Item>
              </View>
              <View style={row}>
                <Text style={[label, {marginBottom: 10}]}>Jenis Kelamin</Text>
                <RadioForm
                  radio_props={this.state.datajk}
                  initial={0}
                  formHorizontal={false}
                  labelHorizontal={true}
                  labelStyle={{paddingRight: 20}}
                  buttonColor={'#2196f3'}
                  animation={true}
                  onPress={(jk) =>
                    this.setState((prevState) => ({
                      formData: {
                        ...prevState.formData,
                        jk,
                      },
                    }))
                  }
                />
              </View>
              <View style={row}>
                <Text style={[label, {marginBottom: 10}]}>Tanggal Lahir</Text>
                <DatePicker
                  style={{width: '100%'}}
                  date={tgl_lahir}
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
                  onDateChange={(tgl_lahir) => {
                    this.setState((prevState) => ({
                      formData: {
                        ...prevState.formData,
                        tgl_lahir,
                      },
                    }));
                  }}
                />
              </View>
              <View style={row}>
                <Item floatingLabel>
                  <Label style={label}>Email</Label>
                  <Input
                    keyboardType="email-address"
                    onChangeText={(email) =>
                      this.setState((prevState) => ({
                        formData: {
                          ...prevState.formData,
                          email,
                        },
                      }))
                    }
                  />
                </Item>
              </View>
              <View style={row}>
                <Item floatingLabel>
                  <Label style={label}>No Telpon</Label>
                  <Input
                    style={{marginBottom: 10}}
                    keyboardType="phone-pad"
                    onChangeText={(telp) =>
                      this.setState((prevState) => ({
                        formData: {
                          ...prevState.formData,
                          telp,
                        },
                      }))
                    }
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
                  selectedValue={pekerjaan}
                  onValueChange={(pekerjaan) =>
                    this.setState((prevState) => ({
                      formData: {
                        ...prevState.formData,
                        pekerjaan,
                      },
                    }))
                  }>
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
                {/* <Text>{JSON.stringify(this.state.formData)}</Text> */}
                <TouchableHighlight
                  onPress={this._saveData}
                  style={btnContainer}>
                  <Text style={btnText}>Simpan</Text>
                </TouchableHighlight>
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
      await fetch('http://10.100.100.205/react-native-web/serviceCrud.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.formData),
      })
        .then((response) => response.json())
        .then((json) => {
          //return json.movies;
          setTimeout(() => {
            this.refs.loading.close();
            alert(JSON.stringify(json));
          }, 2000);
        });
    } catch (error) {
      this.refs.loading.close();
      console.error(error);
    }
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
});
