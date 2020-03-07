import React, { Component } from 'react'
import { StyleSheet, Platform, Image, Text, View, Button, TouchableHighlight, TouchableOpacity} from 'react-native'
import firebase from 'react-native-firebase'
import SideMenu from 'react-native-side-menu'
import Icon  from '../assets/icons/icons'; 
import { Fonts } from '../utilis/Fonts'
import { SearchBar } from 'react-native-elements';
import SignUp from './SignUp'
import { DrawerActions } from 'react-navigation-drawer';


export default class Home extends Component {

  static navigationOptions = ({ navigation }) => {
   
    return {
      //title: 'Home'
     
      headerTitle: (<Image style={{ width: 30, height: 50, flex: 1, marginLeft: 30}} resizeMode="contain" source={require('../assets/image/Logo.png')} />),
      headerLeft: null,
      headerRight: (
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} >
          
          <Image style={{ width: 30, height: 30, marginRight: 20}}  source={require('../assets/image/drawer.png')}  />
        </TouchableOpacity>
      ),
      headerTitleStyle: {
        alignSelf: 'center'
      },

      headerStyle: {
        backgroundColor: '#DE1020',
        color: '#fff',
        height: 70, 
        alignItems: 'center'
            }
    };
  }
  state = { currentUser: null,  pressStatus: false }
  updateSearch = search => {
    this.setState({ search });
  };
  _onHideUnderlay() {
    this.setState({ pressStatus: false });
}
_onShowUnderlay() {
  this.setState({ pressStatus: true });
}

  componentDidMount() {
    const { currentUser } = firebase.auth()

    this.setState({ currentUser })
   // this.props.navigation.setParams({ openDrawer: this.openDrawer })
    this.props.navigation.setParams({ renderSideMenu: this.renderSideMenu })

  }
  // sign out method 
  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
    } catch (e) {
        console.log(e);
    }
}



  render() {
    const { currentUser } = this.state
    const { search } = this.state;

    return (
      <View style={{ flex: 1 }}>
        
        <View style={{borderColor: '#F45555'}}>
          <SearchBar

            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInputContainer}
            inputStyle={styles.searchInput}
            placeholder="أدخل كلمه البحث"
            onChangeText={this.updateSearch}
            value={search}
          />
        </View>
        <View>
          <Image source={require('../assets/image/background.png')} style={{ width: '100%' }} />
        </View>
      
        <View style={styles.shows}>

          <View style={styles.showSectionStyle}>
          <TouchableOpacity style={styles.buttonStyle} onPress={() => console.log('hi touch section shows')}>

              <Text style={styles.textSection}>العروض المميزة </Text>
              </TouchableOpacity>  

          </View>
          <View style={styles.sectionStyle}>
           
          <TouchableOpacity style={styles.buttonStyle} onPress={() => console.log('hi touch section department')}>

              <Text style={styles.textSection}>الأقسام </Text>
              </TouchableOpacity>

          </View>
        </View>
        <View style={styles.showsStyle}>
          <View style={styles.cofeeStyle}>
              <Text style={styles.textSection}> مقاهى </Text>
              <Icon.Ionicons name="ios-bed" size={30} color="#FFF"/>
          </View>


          <View style={styles.resturantStyle}>
         
              <Text style={styles.textSection}>مطاعم</Text>
              <Icon.FontAwesome5 name="couch" size={30} color="#FFF" />
          </View>
        </View>
        <View style={styles.showsStyle}>
          <View style={styles.homeStyle}>
 
              <Text style={styles.textSection}>تجهيزات المنازل </Text>
               <Icon.FontAwesome name="home" size={30} color="#FFF" />
          </View>


          <View style={styles.libraryStyle}>
       
              <Text style={styles.textSection}>مكتبات</Text>
              <Icon.MaterialCommunityIcons name="library-books" size={30} color="#FFF" />
          
          </View>
        </View>
        <View style={styles.showsStyle}>
          <View style={styles.mobiStyle}>
          
              <Text style={styles.textSection}>هواتف والكترونيات</Text>
              <Icon.MaterialIcons name="devices" size={30} color="#FFF" />
        
          </View>


          <View style={styles.devicesStyle}>
        
              <Text style={styles.textSection}>أجهزة منزلية </Text>
              <Icon.MaterialCommunityIcons name="fan" size={30} color="#FFF" />
          </View>
        </View>
        <View  style={styles.showsStyle}>
          <View style={styles.interStyle} >
           
              <Text style={styles.textSection}>سياحة و ترفيه </Text>
              <Icon.MaterialCommunityIcons name="lamp" size={30} color="#FFF" />
         
          </View>


          <View style={styles.placesStyle}>
     
              <Text style={styles.textSection}>أماكن عامة</Text>
              <Icon.FontAwesome name="bathtub" size={30} color="#FFF" />
         
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchInput: {
    fontSize: 18,
    textAlign: 'right',
    width: '100%',
  },
  searchContainer: {
    flexDirection: 'row-reverse',
    backgroundColor: '#CB2922',
    
    borderWidth: null
  },
  searchInputContainer: {
    flexDirection: 'row-reverse',
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 10
  },
  shows: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DE1020',
    height: 60,
    justifyContent: 'center'
  },
  sectionStyle: {
    width: '50%',
    height: '100%',
    backgroundColor: '#DE1020',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    borderBottomWidth: 2,
    borderBottomColor: '#060101',
    alignItems: 'center',
    backgroundColor: '#DE1020',
    justifyContent: 'center'
},
  showSectionStyle: {
    width: '50%',
    height: '100%',
    backgroundColor: '#DE1020',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionStylepress: {
    width: '50%',
    height: '100%',
    backgroundColor: '#DE1020',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#050100',
    borderBottomWidth: 1

  },
  textSection: {
    textAlign: 'right',
    fontSize: 15,
    color: 'white',
    marginRight: 10,
    fontFamily: Fonts.BalooBhaijaan
  },
 showsStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DE1020',
    height: 80,
    borderWidth: 2,
    borderColor: 'white',

  },
  cofeeStyle: {
    backgroundColor: '#8943F5',
    borderRightWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    width: '50%',
    height: '100%'

  },
  resturantStyle: {
    backgroundColor: '#F86689',
    borderLeftWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    width: '50%',
    height: '100%'

  },
  homeStyle: {
    backgroundColor: '#1EB0D1',
    borderRightWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    width: '50%',
    height: '100%'
  },
  libraryStyle: {
    backgroundColor: '#F658BD',
    borderLeftWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    width: '50%',
    height: '100%'
  },
  mobiStyle: {
    backgroundColor: '#76EC8F',
    borderRightWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    width: '50%',
    height: '100%'
  },
  devicesStyle: {
    backgroundColor: '#FCBD2E',
    borderLeftWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    width: '50%',
    height: '100%'
  },
  interStyle: {
    backgroundColor: '#63DFF5',
    borderRightWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    width: '50%',
    height: '100%'
  },
  placesStyle: {
    backgroundColor: '#FEEC3B',
    borderLeftWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'flex-end',
    paddingRight: 10,
    width: '50%',
    height: '100%'
  }
})