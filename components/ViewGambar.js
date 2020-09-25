/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
//import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { version } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image ,
  Alert,
   ActivityIndicator,
} from 'react-native';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPencil, faLock,faAirFreshener,faAnchor,faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import Loading from 'react-native-whc-loading';


export default class HasilActivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
    };
  }

  static navigationOptions = {
    title: 'ViewUser',
    headerStyle: {
      backgroundColor: '#03A9F4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  pindah=(id)=>{
    //this.kondisicheckbox();
    // this.ambiltimestamps();
    this.deleteData(id);
    this.refs.loading.show();

    navigasi=()=>{
      this.refs.loading.close();
      this.props.navigation.navigate('ViewUser')
      // , {
      //   timestamps_param: this.state.timestamps,
      //   nama_param: this.state.nilaitextinput1,
      //   tgllahir_param: this.state.date,
      //   agama_param: this.state.agama,
      //   nilaicheck_param: this.state.nilaicheck,
      //   nilaicheck2_param: this.state.nilaicheck2,
      //   nilaicheck3_param: this.state.nilaicheck3,
      //   nilaicheck4_param: this.state.nilaicheck4,
      //   jenis_kelamin_param: this.state.value,
      // });
    };

    //kasih delay dikit saat mau navigasi
    setTimeout(function(){
      navigasi();
    },2000);
  }
  deleteData =  (id) =>
  {
    this.refs.loading.show();
    // Alert.alert(id);
      fetch('http://10.100.100.205/react-native-web/delete.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          id:id,
        

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
  
  componentDidMount(){
      return fetch('http://10.100.100.205/react-native-web/view_gambar.php')
        .then((response) => response.json())
        .then((responseJson) =>
        {
           
            this.setState({
                isLoading:false,
                dataSource: responseJson,
            },function(){})
        }).catch((error) => {
            console.error(error);
        })
  }

  Action_Click = (id,nama_gambar,url_gambar) => {
    this.props.navigation.navigate('EditGambar',
   {
     //Alert.alert(nama);
    id,
   nama_gambar,
   //Alert.alert(nama);
    url_gambar
   })
  }
  _renderItem = ({ item }) => (
  
            <View style={styles.tulisan_background}>
              <Image
          source={{
            uri:
              item.url_gambar,
          }}
          style={{ width: 100, height: 100, margin: 10}}
        />

                <TouchableOpacity 
                  style={styles.btn}>
                    <FontAwesomeIcon 
                    onPress={ this.Action_Click.bind(this,
                      item.id,
                      item.nama_gambar,
                      item.url_gambar,
                     ) }

                    style={styles.btnText} icon={faPen} /> 
                    {/* <Text  style={styles.btnText}>Del</Text> */}
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.btnHapus}>
                    <FontAwesomeIcon 
                    onPress={this.konfirmasiHapus.bind(this,item.id)}

                    style={styles.btnTextHapus} icon={faTrash} /> 
                    {/* <Text  style={styles.btnText}>Del</Text> */}
                </TouchableOpacity>
                
            {/* <FontAwesomeIcon icon={faLock} size={40} color={"blue"} /> */}
            </View>
         
  )

  konfirmasiHapus = (id) => {
    Alert.alert(
      'Confirmation',
      'Apakah anda ingin menghapus data ini?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Ya', onPress: () => this.pindah(id)}
      ],
      { cancelable: false }
    );

    }
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 10,
          width: '100%',
          backgroundColor: '#919191',
          marginBottom: 10
        }}
      />
    );
  }
  render() {
    let {container,containerDataUser} = styles;

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      
      <View style={containerDataUser}>
         <FlatList
       
       data={ this.state.dataSource }
       
       ItemSeparatorComponent = {this.FlatListItemSeparator}

       renderItem={this._renderItem}

       keyExtractor={(item, index) => index.toString()}
       
      />
        <Loading ref="loading" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
  // containerDataUser:
  // {
  //     flex:1,
  //     paddingTop:20,
  //     marginLeft:5,
  //     marginRight:5,
  // },
  container: {
    //   flexDirection:"row",
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
    // backgroundColor: '#0fa0d1',
    backgroundColor: 'green',
    height: 30,
    // margin: 5,
    padding:5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnHapus: {
    // backgroundColor: '#0fa0d1',
    backgroundColor: 'red',
    height: 30,
    // margin: 5,
    padding:5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    padding:10,
  },
  btnTextHapus: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    padding:10,
  },
  btnText2: {
    color: 'blue',
    fontSize: 32,
    fontWeight: 'bold',
    padding:10,
  },
  rowViewContainer: {
    textAlign:'center',
    fontSize:20,
    paddingTop:10,
    paddingRight:10,
    paddingBottom:10,
  },
  containerDataUser:
  {
    flexDirection:'row',
    flex:1,
      paddingTop:20,
      marginLeft:5,
      marginRight:5,
  },
  FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

//   judul1: {
//     fontSize : 16,
//     flex:2
//   },
//   judul2: {
//     fontSize : 16,
//     flex:4
//   },
//   judul3: {
//     fontSize : 16,
//     flex:4
//   },
//   judul4: {
//     fontSize : 16,
//     flex:4
//   },

  tulisan1: {
    fontSize : 20,
    // color:'#c20202',
    flex:2
  },
  tulisan2: {
    fontSize : 16,
    // color:'#c20202',
    flex:4
  },
  tulisan3: {
    fontSize : 16,
    // color:'#c20202',
    flex:4
  },
  tulisan4: {
    fontSize : 16,
    // color:'#c20202',
    flex:6
  },

  tulisan_background: {
    flexDirection:'row',
    flex:1,
    padding: 10
    // alignItems: 'center',
    // justifyContent:'center',
    // backgroundColor: '#e8dc2c'
  }
});
