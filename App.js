import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
//import { SwitchNavigator } from 'react-navigation'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Loading from './src/screens/Loading'
import SignUp from './src/screens/SignUp'
import Login from './src/screens/Login'
import Home from './src/screens/Home'

const RootStack = createStackNavigator(
  {
    Loading,
    SignUp,
    Login,
    Home
  },
  {
    initialRouteName: 'Loading',
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
const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component{
  render(){
    return(
      <AppContainer />
    )
  }
}