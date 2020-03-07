import React,{Component} from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase';

export default class Loading extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
       title: null
    };
  }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
          this.props.navigation.navigate(user ? 'Home' : 'SignUp')
        })
    }
    
  render() {
    return (
      <View style={styles.container}>
          <ActivityIndicator color='#DE1020' size="large" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})