import React, { Component } from "react";
import { Platform, View, Text, Dimensions, Image } from "react-native";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default class SplashScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if(Platform.OS === 'android'){
        setTimeout(() => {
            this.props.navigation.navigate('LoginScreen');
          }, 3000);
       
    }else if(Platform.OS === 'ios'){
       this.props.navigation.navigate('LoginScreen');
    }
  }

  render() {
    return (
      <View>
         <Image
          style={{ width: WIDTH, height: HEIGHT }}
          source={require("../assets/res-long-port-hdpi/default.png")}
        />
      </View>
    );
  }
}
