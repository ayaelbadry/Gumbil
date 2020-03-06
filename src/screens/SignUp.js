import React, { Component } from 'react'
import {   Platform ,StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Image, ScrollView, NativeModules } from 'react-native'
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { Fonts } from '../utilis/Fonts'
const { RNTwitterSignIn } = NativeModules;

const Constants = {
  //Dev Parse keys
  TWITTER_COMSUMER_KEY: "Wg6q0d9ppQh4NMLrdKlx6pKod",
  TWITTER_CONSUMER_SECRET: "6QZ8KS5hc9ZDvm8GsuZDj4o7V61MXR2Df03nfhjb6L1Pshkc7s"
}

export default class signUp extends Component {
  static navigationOptions = () => {
    return {
      headerTitle: (<Text style={{ color: '#fff', fontSize: 25, fontFamily: Fonts.ElMessiri, fontWeight: 'normal', flex: 1 }}>تسجيل</Text>),
      headerRight: (<Icon name="chevron-right" size={40} color="#FFF" />),
      headerLeft: null,
      headerTitleStyle: {
        alignSelf: 'right'
      },
      headerStyle: {
        backgroundColor: '#DE1020',
      }
    };
  }
  state = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    user_name: '',
    token: '',
    profile_pic: '',
    isLoggedIn: false ,
    errorMessage: null
  }
  constructor() {
    super();
    this.ref = firebase.firestore().collection('users');


  }

  handleSignUp = () => {
    // TODO: For Firebase athu

    console.log('handleSignUp')
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        if (user.user) {
          user.user.updateProfile({
            displayName: this.state.fullName
          }).then(() => {
            alert('Item saved successfully');
          })
        }
        const user2 = firebase.auth().currentUser;
        var postsRef = firebase.firestore().collection("users");
        var newPostRef = postsRef.push();
        newPostRef.set({
          fullName: user2.displayName,
          email: user2.email,
          password: user2.password
        });
        this.props.navigation.navigate('Home')
      })
      .catch(error => this.setState({ errorMessage: error.message }))

  }
  //login with twitter 
  twitterLogin = () => {
    // try {
    //    RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET);

    //   // also includes: name, userID & userName
    //   const { authToken, authTokenSecret } =  RNTwitterSignIn.logIn();
      
    //   const credential = firebase.auth.TwitterAuthProvider.credential(authToken, authTokenSecret);
    //   console.log('credentioal test', credential)
    //   const firebaseUserCredential =  firebase.auth().signInWithCredential(credential);
    //   console.log(firebaseUserCredential)
    //   if (firebaseUserCredential) {
    //     this.setState({
    //       isLoggedIn: true
    //     })
    //   }
    //  // console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));
    // } catch (e) {
    //   console.error(e);
    // }
    
      RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET)
      RNTwitterSignIn.logIn()
        .then(loginData => {
          console.log(loginData)
          const { authToken, authTokenSecret } = loginData
          if (authToken && authTokenSecret) {
            this.setState({
              isLoggedIn: true
            })
            const credential = firebase.auth.TwitterAuthProvider.credential(authToken, authTokenSecret);
            const firebaseUserCredential =  firebase.auth().signInWithCredential(credential);
            console.log(firebaseUserCredential)
          }
        })
        .catch(error => {
          console.log(error)
        }
      )
    }
  
 
  // login with facebook 
  onPressLogin() {
    // this.setState({ showSpinner: true })
    LoginManager.logInWithPermissions(['public_profile', 'user_birthday', 'email', 'user_photos'])
      .then((result) => {
      //  alert(result)
        this._handleCallBack(result)
      },
        function (error) {
          alert('Login fail with error: ' + error);
        }
      )
  }
  _handleCallBack(result) {
    let _this = this
    if (result.isCancelled) {
      alert('Login cancelled');
    } else {
      AccessToken.getCurrentAccessToken().then(
        (data) => {
         // alert(data.accessToken.toString());
          console.log(data)
          const token = data.accessToken
          console.log(token)
          fetch('https://graph.facebook.com/v4.0/me?fields=id,name&access_token=' + token)
            .then((response) => response.json())
            .then((json) => {

              const imageSize = 120
              const facebookID = json.id
              console.log(facebookID)
              const fbImage = `https://graph.facebook.com/${facebookID}/picture?height=${imageSize}`
              this.authenticate(data.accessToken)
                .then(function (result) {
                  const { uid } = result
                  _this.createUser(uid, json, token, fbImage)
                })


            })
            .catch(function (err) {
              console.log(err);
            });
        }
      )

    }
  }
  authenticate = (token) => {
    const provider = firebase.auth.FacebookAuthProvider
    const credential = provider.credential(token)
    let ret = firebase.auth().signInWithCredential(credential)
    return ret;
  }
  createUser = (uid, userData, token, dp) => {
    const defaults = {
      uid,
      token,
      dp
    }
    firebase.firestore().collection('users').child(uid).update({ ...userData, ...defaults })

  }
  render() {
    return (
      <ScrollView style={styles.containerScroll}>
        <View style={styles.container}>
          {/* <Text style={{color:'#e93766', fontSize: 40}}>Sign Up</Text> */}
          <Image source={require('../assets/image/img.png')} style={styles.imageStyle} />
          {this.state.errorMessage ? <Text style={{ color: 'red' }}> </Text> : null}
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="الاسم الكامل"
            onChangeText={fullName => this.setState({ fullName })}
            value={this.state.fullName}
          />
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="البريد الالكترونى"
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

          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="كلمة المرور"
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
            value={this.state.confirmPassword}
          />
          <TouchableOpacity style={styles.signupStyle} onPress={this.handleSignUp}>
            <Text style={styles.buttonText}>التسجيل</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.textStyle}>ــــــــــــــــــــ     أو     ــــــــــــــــــــ</Text>
          </View>

          <View style={{ flexDirection: 'row',height: 55, width: '80%',justifyContent: 'center',  marginTop: 10, borderRadius: 30 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 15 ,backgroundColor: '#3b5998', width: '50%', height: '100%',borderColor: '#3b5998', borderWidth: 1, borderBottomLeftRadius: 30, borderTopLeftRadius: 30 }}>
              <Icon name="facebook" color="#FFF" size={30} />
              <TouchableOpacity style={styles.buttonStyle} onPress={this.onPressLogin.bind(this)}>
              <Text style={{ fontSize: 20, color: "#fff" }}>Facebook</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center',  paddingLeft: 15 ,backgroundColor: '#3ABEF4', width: '50%', height: '100%', borderColor: '#3ABEF4',borderWidth: 1, borderBottomRightRadius: 30, borderTopRightRadius: 30 }}>
              <Icon name="twitter" color="#FFF" size={30} />
              <TouchableOpacity style={styles.buttonStyle} onPress={() => this.twitterLogin()}>
              <Text style={{ fontSize: 20, color: "#fff" }}>Twitter</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  textInput: {

    height: 50,
    fontSize: 15,
    width: '80%',
    fontFamily: Fonts.BalooBhaijaan,
    borderColor: '#9b9b9b',
    borderWidth: 1,
    marginTop: 8,
    marginVertical: 15,
    borderRadius: 30,
    textAlign: 'right',
    color: '#9b9b9b',
    paddingRight: 15
    //Set background color of Text Input.
    //backgroundColor : "#FFFFFF"
  },
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 38,
  },
  containerScroll: {
    flex: 1
  },
  imageStyle: {
    marginBottom: 22,
    width: 200,
    height: 100

  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
},

  signupStyle: {
    width: '80%',
    backgroundColor: '#21BD37',
    borderRadius: 30,
    height: 50,
    fontSize: 20,
    marginTop: 8,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: Fonts.ElMessiri
  },
  textStyle: {
    color: '#9b9b9b',
    textAlign: 'center',
    fontSize: 20
  }
})