import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage
} from "react-native";
import styles from "../../../styles/styles";
import images from "../../../common/images";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  getUserId(key) {
    AsyncStorage.getItem(key).then(value => {
      if (value !== null) {
        const { navigate } = this.props.navigation;
        navigate("SelectedPlansScreen", { userId: value });
      }
    });
  }

  render() {
    const userId = this.getUserId("UserID");

    return (
      <View style={styles.homeContainer}>
        <ImageBackground
          resizeMode={"cover"} // or stretch
          style={{ flex: 1 }} // must be passed from the parent, the number may vary depending upon your screen size
          source={images.listBgc}
        >
          <View
            style={{
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
              flex: 0.5
            }}
          >
            <Image
              style={{
                width: 200,
                height: 200,
                margin: 5,
                borderRadius: 200 / 2,
                shadowOpacity: 20,
                alignContent: "center"
              }}
              source={images.logoIcon}
            />
          </View>

          <View
            style={{
              backgroundColor: "transparent",
              flex: 0.5,
              flexDirection: "column",

              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("ListScreen", { userId: 0 })
              }
              underlayColor="#fff"
            >
              <Text style={styles.buttonText}>Subscribe here for Plans</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("ListScreen", { userId: 0 })
              }
              underlayColor="#fff"
            >
              <Text style={styles.buttonText}>Trial for two days</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate("Login")}
              underlayColor="#fff"
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
