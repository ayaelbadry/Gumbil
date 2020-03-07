import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
//import { SwitchNavigator } from 'react-navigation'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer'
import Loading from './src/screens/Loading'
import SignUp from './src/screens/SignUp'
import Login from './src/screens/Login'
import Home from './src/screens/Home'
import Icon  from './src/assets/icons/icons'; 

const AppStack = createStackNavigator(
  { 
    Home 
  }, 

  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#F5FCFF',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const loadingStack = createStackNavigator({ Loading })
const LoginStack = createStackNavigator({Login })
const AuthStack = createStackNavigator({
  SignUp,
  Login
},
{
  initialRouteName: 'SignUp',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#F5FCFF',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

})
const DrawerStack = createDrawerNavigator({
  Home: {
    screen: AppStack,
    navigationOptions: {
      drawerIcon: (<Icon.Ionicons name='ios-home' size={25} color='#DE1020'  />),
      

    }
  },
  Logout: {
    screen: LoginStack,
    navigationOptions: {
      drawerIcon: (<Icon.MaterialCommunityIcons name='logout' size={25} color='#DE1020'  />)
    }
  }

},
{
  initialRouteName: 'Home',
  inactiveTintColor: 'gray'
}) 
const AppNavigator = createSwitchNavigator({
  AuthLoading: loadingStack,
  App: AppStack,
  Auth: AuthStack,
  LogoutAuth: DrawerStack,
},
{
  initialRouteName: 'AuthLoading'
})
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component{
  render(){
    return(
      <AppContainer />
    )
  }
}