import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
  TouchableHighlight,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Snackbar from "react-native-snackbar";
import CodeInput from "react-native-confirmation-code-input";
import OtpRequest from "../../../modelapicall/otprequest";
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
export default class OTPScreen extends Component {
  static navigationOptions = {
    title: "OTP"
  };
  handlerOnFulfill = code => console.log(code);
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      otp: "",
      codelength: 4
    };
  }

  async onFetchLoginRecords(UserBaseId) {
    var data = {
      UserId: UserBaseId,
      OTP: 1234
    };

    OtpRequest.postOtp(data).then(responseJson => {
      if (responseJson.StatusCode == 200) {
        alert("OTP validated successfully");
      } else if (responseJson.StatusCode == 500) {
        alert("Login failed. Please try again");
        this.refs.codeInputRef2.clear();
      }
    });
  }
  onClickListener = (viewId, UserBaseId) => {
    if (codeLength < 4) {
      alert("Please enter valid OTP");
    } else {
      this.onFetchLoginRecords(UserBaseId);
    }
  };
  render() {
    var { params } = this.props.navigation.state;
    //this.setState({userId:params.result});
    alert(params.result);
    var UserBaseId = params.result;
    try {
      AsyncStorage.setItem("USERID", UserBaseId);
    } catch (error) {
      // Error saving data
    }
    return (
      <DismissKeyboard>
        <View style={styles.container}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            enabled
          >
            <Image style={styles.bgImage} source={images.listBgc} />
            {/* <CodeInput
      ref="codeInputRef1"
      secureTextEntry
      className={'border-b'}
      space={4}
      size={30}
      inputPosition='left'
      onFulfill={(code) => this._onFulfill(code)}/> */}
            <CodeInput
              ref="codeInputRef2"
              secureTextEntry
              compareWithCode="1234"
              activeColor="rgba(49, 180, 4, 1)"
              inactiveColor="rgba(49, 180, 4, 1.3)"
              codeLength={this.state.codelength}
              autoFocus={false}
              ignoreCase={true}
              keyboardType="numeric"
              inputPosition="center"
              size={40}
              onFulfill={this.handlerOnFulfill}
              containerStyle={{ marginTop: 30 }}
              codeInputStyle={{ borderWidth: 1.5 }}
            />
            <TouchableHighlight
              style={[styles.buttonContainer, styles.signupButton]}
              onPress={() => this.onClickListener("Submit", UserBaseId)}
            >
              <Text style={styles.signUpText}>Submit</Text>
            </TouchableHighlight>
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
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
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
  bgImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  signUpText: {
    color: "white"
  }
});
