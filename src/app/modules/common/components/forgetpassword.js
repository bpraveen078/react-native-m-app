import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  ImageBackground,
  Image,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Snackbar from "react-native-snackbar";
import ForgetRequest from "../../../modelapicall/forgetrequest";
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
export default class ForgetPassword extends Component {
  static navigationOptions = {
    title: "Forget Password"
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      mobileNumber: ""
    };
  }
  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  async onFetchLoginRecords() {
    var data = {
      Email: this.state.email,
      MobileNo: this.state.mobileNumber
    };

    ForgetRequest.postForgetPassword(data).then(responseJson => {
      if (responseJson.StatusCode == 200) {
        Snackbar.show({
          title: "New password has sent to your registered email",
          duration: Snackbar.LENGTH_SHORT
        });
        this.props.navigation.navigate("Login");
      } else if (responseJson.StatusCode == 500) {
        Snackbar.show({
          title: "Invalid username and password",
          duration: Snackbar.LENGTH_SHORT
        });
      }
    });
  }
  onClickListener = viewId => {
    if (this.state.email == "" && this.state.mobileNumber == "") {
      Snackbar.show({
        title: "Plese enter Mandatory fields",
        duration: Snackbar.LENGTH_SHORT
      });
    } else if (this.state.email == "" || this.state.mobileNumber == "") {
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
                <Left>
                  {
                    <Icon
                      name="ios-arrow-back"
                      onPress={() => this.props.navigation.goBack(null)}
                    />
                  }
                </Left>
                <Title>Forgot Password</Title>
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
                          "https://png.icons8.com/mobile/ultraviolet/50/3498db"
                      }}
                    />
                    <TextInput
                      style={styles.inputs}
                      placeholder="Mobile Number*"
                      keyboardType="number-pad"
                      maxLength={10}
                      onChangeText={mobileNumber =>
                        this.setState({ mobileNumber })
                      }
                    />
                  </View>
                  <TouchableHighlight
                    style={[styles.buttonContainer, styles.submitButton]}
                    onPress={() => this.onClickListener("Submit")}
                  >
                    <Text style={styles.submitText}>Submit</Text>
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
  headerStyle: {
    backgroundColor: "#ffff"
  },
  headerText: {
    color: "#ffa674",
    fontSize: 25,
    marginTop: 10
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
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
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30
  },
  bgImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  submitButton: {
    backgroundColor: "#cd0000"
  },
  submitText: {
    color: "white"
  }
});
