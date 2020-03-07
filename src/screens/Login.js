import React,{Component} from 'react'
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Fonts } from '../utilis/Fonts';
export default class Login extends Component {
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  static navigationOptions = () => {
    return {
      headerTitle: (<Text style={{ paddingRight: 20, color: '#fff', fontSize: 25, fontFamily: Fonts.ElMessiri, fontWeight: 'normal', flex: 1 }}>دخول</Text>),
      headerRight: null,
      headerLeft: null,
      headerTitleStyle: {
        alignSelf: 'right',
      },
      headerStyle: {
        backgroundColor: '#DE1020',
        
      }
    };
  }
  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    // TODO: Firebase stuff...

    console.log('handleLogin')
    firebase
     .auth()
     .signInWithEmailAndPassword(email, password)
     .then(() => this.props.navigation.navigate('Home'))
     .catch(error => this.setState({ errorMessage: error.message }))
  }
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/image/img.png')} style={styles.imageStyle} />
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="البريد الالكتروني"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="كلمة المرور"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
          <TouchableOpacity style={styles.loginStyle} onPress={this.handleLogin}>
            <Text style={styles.buttonText}>دخول</Text>
          </TouchableOpacity>
       
        <View>
        <Text style={styles.textStyle}> ليس لديك حساب ؟ <Text style={styles.textStyle} onPress={() => this.props.navigation.navigate('SignUp')} style={{color:'#DE1020', fontSize: 18}}> تسجيل </Text></Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor:'#9b9b9b',
    width: '80%',
    height: 50,
    marginBottom: 20,
    textAlign: 'right',
    paddingRight: 15,
    color: '#9b9b9b',
    fontSize: 22,
  },
  textStyle: {
    fontFamily: Fonts.BalooBhaijaan, 
    
    textAlign: 'right'
    
  },
  loginStyle: {
    width: '80%',
    backgroundColor: '#21BD37',
    borderRadius: 30,
    height: 50,
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    fontFamily: Fonts.BalooBhaijaan
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    marginBottom: 70,
    width: 200,
    height: 100

  },
})