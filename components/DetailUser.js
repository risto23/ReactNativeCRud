/* eslint-disable radix */
/* eslint-disable prettier/prettier */
//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {version} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableHighlight,
  KeyboardAvoidingView,
  ListView,
  ActivityIndicator,
  ScrollView,Alert,
} from 'react-native';
import Loading from 'react-native-whc-loading';
import { Container, Header,Title, Content, ListItem,Textarea,  Right, Left,Icon, Picker, Form,CheckBox,Body,Item, Input, Label,Radio  } from 'native-base'
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';

var radio_props = [
  
    {label: 'Pria', value: '0'},
    {label: 'Wanita', value: '1'}

];

export default class DetailUser extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      dataPekerjaan: ['Pelajar', 'Wiraswasta', 'PNS'],
     
      data_id: '',
      data_nama: '',
      data_jk: '',
      tgl_lahir: null,
      data_email: '',
      data_telp: '',
      data_pekerjaan: 'pelajar',
      isLoading: false,
    };
  }

  static navigationOptions = {
    title: 'DetailUser',
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
      data_id: this.props.navigation.state.params.id,
       data_nama: this.props.navigation.state.params.nama,
      data_email: this.props.navigation.state.params.email,
       data_telp: this.props.navigation.state.params.telp,
      data_pekerjaan: this.props.navigation.state.params.pekerjaan,
        data_jk: this.props.navigation.state.params.jk,
        tgl_lahir: this.props.navigation.state.params.tgl_lahir,

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

  deleteData = () =>
  {
    fetch('http://10.100.100.205/react-native-web/delete.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          id:this.state.data_id,
        

        }),
      }).then ((response) => response.json())
      .then((json) => 
      {
        setTimeout(() => {
          this.refs.loading.close();
          alert(JSON.stringify(json));
        }, 2000);
      }).catch((error) => {
        this.refs.loading.close();
        console.error(error);
      })
      this.props.navigation.navigate('ViewUser');
  }

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
    let {row, label, container, btnContainerUpdate,btnContainerDelete, btnText, picker} = styles;
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <ScrollView>
       
      <KeyboardAvoidingView style={container} enabled>
        <Content>
          <Form>
          <View style={row}>
              
                <Label style={label}>{this.state.data_id}</Label>
              
            </View>
            <View style={row}>
              
              <Label style={label}>{this.state.data_jk}</Label>
            
          </View>
            <View style={row}>
              <Item floatingLabel>
                <Label style={label}>Nama</Label>
                <Input
                value={this.state.data_nama}
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
           
              <TouchableHighlight
                onPress={this.updateData}
                style={btnContainerUpdate}>
                <Text style={btnText}>Update</Text>
              </TouchableHighlight>
              </View>
              <View style={row}>
              {/* <TouchableHighlight
              //(id,nama,tgl_lahir,email,telp,jk,pekerjaan)
                onPress={this.deleteData}
                style={btnContainerDelete}>
                <Text style={btnText}>Delete</Text>
              </TouchableHighlight> */}
            </View>
          </Form>
        </Content>
      </KeyboardAvoidingView>
      <Loading ref="loading" />
    </ScrollView>
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
  rowViewContainer: {
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  containerDataUser: {
    flex: 1,
    paddingTop: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  row: {
    marginBottom: 20,
  },
  btnContainerUpdate: {
    backgroundColor: '#1A8',
    padding: 10,
    alignItems: 'center',
  },
  btnContainerDelete: {
    backgroundColor: '#f20f3c',
    padding: 10,
    alignItems: 'center',
  },
});
