import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage
} from "react-native";

import DeviceInfo from "react-native-device-info";

import Snackbar from "react-native-snackbar";
import RegistationRequest from "../../../modelapicall/registationrequest";

import images from "../../../common/images";

import {
  Header,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Container,
  Item
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
export default class Registation extends Component {
  static navigationOptions = {
    title: "Registation"
  };

  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password: "",
      mobileNumber: "",
      result: {},
      userId: "",
      displayArray: []
    };
  }

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  async onFetchLoginRecords() {
    const deviceId = DeviceInfo.getDeviceId();
    const deviceName = DeviceInfo.getDeviceName();
    const OsVersion = DeviceInfo.getSystemVersion();

    var data = {
      Name: this.state.fullName,
      Password: this.state.password,
      Email: this.state.email,
      MobileNo: this.state.mobileNumber,
      DeviceId: deviceId,
      DeviceName: deviceName,
      OSVersion: OsVersion,
      LoginDeviceTypeId: "4"
    };

    RegistationRequest.postRegistation(data).then(responseJson => {
      if (responseJson.StatusCode == 200) {
        this.setState({ userId: responseJson.Result.UserId });
        this.setState({ sessionId: responseJson.Result.SessionId });

        Snackbar.show({
          title: "OTP successfully sent to registered Mobile",
          duration: Snackbar.LENGTH_SHORT
        });
        this.props.navigation.navigate("OtpValidation", {
          result: this.state.userId,
          sessionId: this.state.sessionId
        });
      } else if (responseJson.StatusCode == 500) {
        Snackbar.show({
          title: "Mobile / Email already exists.",
          duration: Snackbar.LENGTH_SHORT
        });
      }
    });
  }

  componentDidMount() {}

  onClickListener = viewId => {
    Keyboard.dismiss();
    if (
      this.state.fullName == "" &&
      this.state.password == "" &&
      this.state.email == "" &&
      this.state.mobileNumber == ""
    ) {
      Snackbar.show({
        title: "Plese enter Mandatory fields",
        duration: Snackbar.LENGTH_SHORT
      });
    } else if (
      this.state.fullName == "" ||
      this.state.password == "" ||
      this.state.email == "" ||
      this.state.mobileNumber == ""
    ) {
      Snackbar.show({
        title: "Plese enter Mandatory fields",
        duration: Snackbar.LENGTH_SHORT
      });
    } else {
      if (this.state.mobileNumber.length < 10) {
        Snackbar.show({
          title: "Plese enter Valid Mobile Number",
          duration: Snackbar.LENGTH_SHORT
        });
      } else if (!this.validateEmail(this.state.email)) {
        Snackbar.show({
          title: "Plese enter Valid Email id",
          duration: Snackbar.LENGTH_SHORT
        });
      } else {
        this.onFetchLoginRecords();
      }
    }
  };

  render() {
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <KeyboardAvoidingView
            style={styles.container}
            keyboardVerticalOffset={-600}
            behavior="padding"
            enabled
          >
            <ImageBackground
              resizeMode={"cover"} // or stretch
              style={{ flex: 1 }} // must be passed from the parent, the number may vary depending upon your screen size
              source={images.listBgc}
            >
              <Header style={styles.headerStyle}>
                <Left>
                  {
                    <Icon
                      name="ios-arrow-back"
                      onPress={() => this.props.navigation.goBack(null)}
                    />
                  }
                </Left>
                <Title>Registation</Title>
                <Right />
              </Header>
              <ScrollView>
                <View style={styles.loginContainer}>
                  <View style={styles.inputContainer}>
                    <Image
                      style={styles.inputIcon}
                      source={{
                        uri:
                          "https://png.icons8.com/male-user/ultraviolet/50/3498db"
                      }}
                    />
                    <TextInput
                      style={styles.inputs}
                      placeholder="Full name*"
                      keyboardType="email-address"
                      onChangeText={fullName => this.setState({ fullName })}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Image
                      style={styles.inputIcon}
                      source={{
                        uri:
                          "https://png.icons8.com/message/ultraviolet/50/3498db"
                      }}
                    />
                    <TextInput
                      style={styles.inputs}
                      placeholder="Email*"
                      keyboardType="email-address"
                      onChangeText={email => this.setState({ email })}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Image
                      style={styles.inputIcon}
                      source={{
                        uri:
                          "https://png.icons8.com/key-2/ultraviolet/50/3498db"
                      }}
                    />
                    <TextInput
                      style={styles.inputs}
                      placeholder="Password*"
                      secureTextEntry={true}
                      onChangeText={password => this.setState({ password })}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Image
                      style={styles.inputIcon}
                      source={{
                        uri:
                          "https://png.icons8.com/mobile/ultraviolet/50/3498db"
                      }}
                    />
                    <TextInput
                      style={styles.inputs}
                      placeholder="Mobile Number*"
                      maxLength={10}
                      keyboardType="number-pad"
                      onChangeText={mobileNumber =>
                        this.setState({ mobileNumber })
                      }
                    />
                  </View>
                  <TouchableHighlight
                    style={[styles.buttonContainer, styles.signupButton]}
                    onPress={() => this.onClickListener("Create your account")}
                  >
                    <Text style={styles.signUpText}>Create your account</Text>
                  </TouchableHighlight>
                </View>
              </ScrollView>
            </ImageBackground>
          </KeyboardAvoidingView>
        </View>
      </DismissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: "#ffffff"
  },
  headerText: {
    color: "#ffa674",
    fontSize: 25,
    marginTop: 10
  },
  headerStyle: {
    backgroundColor: "#ffff"
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
    backgroundColor: "transparent"
  },
  inputContainer: {
    borderBottomColor: "#eceef1",
    backgroundColor: "#eceef1",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#eceef1",
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: "center"
  },
  bgImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  signupButton: {
    backgroundColor: "#cd0000"
  },
  signUpText: {
    color: "white"
  },
  button: {
    paddingVertical: 15
  }
});
