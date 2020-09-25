/* eslint-disable no-lone-blocks */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
//import React from 'react';
import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  
} from 'react-native';
//import DatePicker from 'react-native-datepicker';
import { Container, Header,Title, Content, ListItem,Textarea,  
  Right, Left,Icon, Picker, Form,CheckBox,Body,Item, Input, Label,DatePicker,Radio  } from 'native-base'



const radioItem = [
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' }
];

export default class IdentitasActivity extends React.Component {
  //Menginisialisasi state.
  constructor(props) {
    super(props)

    this.state = {
      nama: '',

      asal: '',
      alamat:'',
      date: '2000-01-1',
      chosenDate: new Date(),
      selected: "Islam",
      one: false,
      two: false,
      three: false,
      
      hobby:[],

    };
    this.setDate = this.setDate.bind(this);
  }
  //checkbox
  

  //datepicker
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
//Checkbox
  onePressed() {
    if (this.state.one)
      this.setState({ one: false });
    else
      this.setState({ one: true});
  }
//Checkbox
  twoPressed() {
    if (this.state.two)
      this.setState({ two: false });
    else
      this.setState({ two: true });
  }
//Checkbox
  threePressed() {
    if (this.state.three)
      this.setState({ three: false });
    else
      this.setState({ three: true });
  }

//picker
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }
  //radio button
  onRadioButtonPressed(value: string, status: string){
    if(status == 'true'){
    this.setState({
      dipilih: true,
      color:"#5cb85c",
      itemSelected: value,
    });
  }
  }
 
  //Get current Timestamp
  componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      //Setting the value of the date time
      tanggal:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    });
  }

  //Method mengirimkan data ke activity lain
  Kirim_data = () => {
  //  this.tambahkanHobby();
    this.props.navigation.navigate('Hasil', {
      NamaOBJ: this.state.nama,
      AsalOBJ: this.state.asal,
      alamatOBJ: this.state.alamat,
      WaktuOBJ: this.state.tanggal,
      //dateOBJ: this.state.chosenDate,
      kelaminOBJ: this.state.radioValue,
      agamaOBJ : this.state.selected,
      hobbyOBJ: this.state.hobby
    });
    this.setState({TextInput_nama: '', TextInput_asal: ''});
  };

  static navigationOptions = {
    title: 'Data',
    headerStyle: {
      backgroundColor: '#03A9F4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };



  render() {
    let {ItemStyle,title,btn,btnText} =styles;
    return (
      <Container>
         <Header>
           <Title style={title}>Data Diri</Title>
           
           </Header>
      
      <Content>
        <Form>
            {/* Input */}
          <Item floatingLabel style={ItemStyle}>
            <Label>Nama</Label>
            <Input  onChangeText={(text) => {
            this.setState({nama: text});
          }}/>
          </Item>
          <Item floatingLabel style={ItemStyle}>
            <Label>Asal</Label>
            <Input  onChangeText={(text) => {
            this.setState({asal: text});
          }}/>
          </Item>
            {/* Textarea */}
          <Item>
          <Content padder>
          <Form>
            <Textarea rowSpan={5} bordered placeholder="Alamat" 
             onChangeText={(text) => {
              this.setState({alamat: text});
            }}/>
          </Form>
        </Content>
          </Item>
            {/* DatePicker */}
          <Item style={ItemStyle}>
          <DatePicker style={ItemStyle}
            defaultDate={new Date(2018, 4, 4)}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2018, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Tanggal Lahir"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setDate}
            disabled={false}
            />
          </Item>
        {/* RadioButton */}
          <Item>
          <Content>
            <Text>Select your choice</Text>
          {
            radioItem.map((data, key) => 
            {
                return (
                          <ListItem key={key}>
                             <Left>
                                <Text>{data.label}</Text>
                            </Left>
                            <Right>
                              <Radio
                              onPress={()=> this.setState({radioValue:data.value})}
                              color={"gray"}
                              selectedColor={"gray"}
                              selected={data.value === this.state.radioValue}
                              />
                            </Right>
                          </ListItem>
                        )
            })
            }
          </Content>
        </Item>
          {/* CheckBox */}
          <Item>
          <Content>
          <ListItem>
          <CheckBox checked={this.state.one}
            style={{ marginRight: 20 }}
            onPress={this.onePressed.bind(this)}/>
          <Text>Olahraga</Text>
          </ListItem>
          <ListItem>
          <CheckBox checked={this.state.two}
            style={{ marginRight: 20 }}
            onPress={this.twoPressed.bind(this)}/>
          <Text>Mendengarkan Musik</Text>
          </ListItem>
          <ListItem>
          <CheckBox checked={this.state.three}
            style={{ marginRight: 20 }}
            onPress={this.threePressed.bind(this)}/>
          <Text>Membaca</Text>
          </ListItem>
        </Content>
          </Item>
            {/* Picker */}
          <Item>
          <Picker
              mode="dropdown"
              iosHeader="Select your SIM"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Islam" value="Islam" />
              <Picker.Item label="Kristen" value="Kristen" />
              <Picker.Item label="Katolik" value="Katolik" />
              <Picker.Item label="Hindu" value="Hindu" />
              <Picker.Item label="Buddha" value="Buddha" />
            </Picker>
          </Item>
            {/* Button */}
          <TouchableOpacity
          onPress={this.Kirim_data}
          activeOpacity={0.7}
          style={btn}>
          <Text style={btnText}> Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={() => this.props.navigation.navigate('Home')}>
          <View style={btn}>
            <Text style={btnText}>Home</Text>
          </View>
        </TouchableOpacity>
        </Form>
      </Content>
    </Container>
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
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 50,
  },
  model :{
marginBottom:20
  },
  checkbox: {
    alignSelf: "center",
  },
  ItemStyle: {
    marginBottom:3
  },
  title:{
    margin:10,
  }
});
