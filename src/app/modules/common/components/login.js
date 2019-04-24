import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/common.action";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage
} from "react-native";
import Snackbar from "react-native-snackbar";
import LoginRequest from "../../../modelapicall/loginrequest";
import colors from "../../../common/colors";
import DeviceInfo from "react-native-device-info";
import { ScrollView } from "react-native-gesture-handler";

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

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
class Login extends Component {
  static navigationOptions = {
    title: "Login"
  };
  constructor(props) {
    super(props);
    state = {
      email: "",
      password: "",
      isLoading: true
    };
  }
  componentDidMount() {
    console.log("clicked");
    Alert.alert("hi");
  }
  componentWillReceiveProps(props) {}
  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  async onFetchLoginRecords() {
    debugger;

    const deviceId = DeviceInfo.getDeviceId();
    const deviceName = DeviceInfo.getDeviceName();
    const OsVersion = DeviceInfo.getSystemVersion();

    var data = {
      UserName: this.state.email,
      Password: this.state.password,
      DeviceId: deviceId,
      DeviceName: deviceName,
      OSVersion: OsVersion,
      LoginDeviceTypeId: "4"
    };
    this.props.onLogin(data);
    // LoginRequest.postLogin(data).then(responseJson => {
    //   this.setState({ isLoading: false });
    //   debugger;
    //   if (responseJson.StatusCode == 200) {
    //     Snackbar.show({
    //       title: "Loign Successfully",
    //       duration: Snackbar.LENGTH_SHORT
    //     });
    //     debugger;
    //     AsyncStorage.setItem("UserID", responseJson.Result.UserId.toString());
    //     this.props.navigation.navigate("drawerStack", {
    //       userId: responseJson.Result.UserId
    //     });
    //   } else if (responseJson.StatusCode == 500) {
    //     Snackbar.show({
    //       title: "Login failed. Please try again",
    //       duration: Snackbar.LENGTH_SHORT
    //     });
    //   }
    // });
  }

  onClickListener = viewId => {
    Keyboard.dismiss();

    if (this.state.email == "" && this.state.password == "") {
      Snackbar.show({
        title: "Plese enter Mandatory fields",
        duration: Snackbar.LENGTH_SHORT
      });
    } else if (this.state.email == "" || this.state.password == "") {
      Snackbar.show({
        title: "Plese enter Mandatory fields",
        duration: Snackbar.LENGTH_SHORT
      });
    } else {
      if (!this.validateEmail(this.state.email)) {
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
    var { navigate } = this.props.navigation;
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <KeyboardAvoidingView
            style={styles.container}
            keyboardVerticalOffset={-530}
            behavior="padding"
            enabled
          >
            <ImageBackground
              resizeMode={"cover"} // or stretch
              style={{ flex: 1 }} // must be passed from the parent, the number may vary depending upon your screen size
              source={images.listBgc}
            >
              <Header style={styles.headerStyle}>
                <Left />
                <Title>Login</Title>
                <Right />
              </Header>
              <ScrollView>
                <View style={styles.loginContainer}>
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
                      placeholder="Email/UserName*"
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

                  <TouchableHighlight
                    style={[styles.buttonContainer, styles.loginButton]}
                    onPress={() => this.onClickListener("Login")}
                  >
                    <Text style={styles.loginText}>Login</Text>
                  </TouchableHighlight>
                  <TouchableOpacity style={styles.button}>
                    <Text
                      style={styles.buttonText}
                      onPress={() =>
                        this.props.navigation.navigate("ForgetPassword")
                      }
                      title="Forget Password"
                    >
                      Forgot Password
                    </Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => this.props.navigation.navigate("Registation")}
            title="Create an account"
          >
          Create an account
          </Text>
        </TouchableOpacity> */}
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
  headerStyle: {
    backgroundColor: "#ffff"
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    backgroundColor: "transparent"
  },
  headerText: {
    color: "#90969d",
    fontSize: 25,
    marginTop: 10
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
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  loginButton: {
    backgroundColor: colors.red
  },
  loginText: {
    color: "white"
  },
  bgImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%"
    //justifyContent: 'center',
  },
  buttonText: {
    textAlign: "center",
    color: "#47525e",
    fontWeight: "700"
  },
  button: {
    paddingVertical: 15
  }
});

const mapStatetoProps = state => {
  debugger;
  // const { loginData } = state;
  return {
    // loginData
  };
};
// const mapDispatchtoProps=dispatch=>bindActionCreators({
//   onLogin
// })
const mapDispatchtoProps = dispatch => ({
  onLogin: loginData =>
    dispatch({
      type: actions.LOGIN_REQUEST,
      loginData
    })
});
export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Login);
