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
import Snackbar from "react-native-snackbar";
import otprequest from "../../../modelapicall/otprequest";
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
import SubscribePlan from "../../../modelapicall/subscribeplan";
import { ScrollView } from "react-native-gesture-handler";
var UserBaseId;

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
export default class OtpValidation extends Component {
  static navigationOptions = {
    title: "Otp Validation"
  };
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      member: [],
      getArray: [],
      dataSource: [],
      isLoading: true
    };
  }

  async onFetchLoginRecords(UserBaseId) {
    var data = {
      UserId: UserBaseId,
      OTP: this.state.otp,
      SessionId: userSessionId
    };

    otprequest.postOtp(data).then(responseJson => {
      if (responseJson.StatusCode == 200) {
        //alert("OTP validated successfully");
        this.submitPlans();
      } else if (responseJson.StatusCode == 500) {
        //alert("Login failed. Please try again");
        this.refs.textinput.clear;
        this.submitPlans();
      }
    });
  }
  onClickListener = (viewId, UserBaseId) => {
    Keyboard.dismiss();

    if (this.state.otp == "") {
      Snackbar.show({
        title: "Plese enter Mandatory fields",
        duration: Snackbar.LENGTH_SHORT
      });
    } else {
      if (this.state.otp.length < 4) {
        Snackbar.show({
          title: "Plese enter Valid OTP",
          duration: Snackbar.LENGTH_SHORT
        });
        this.refs.textinput.clear;
      } else {
        this.onFetchLoginRecords(UserBaseId);
      }
    }
  };

  submitPlans() {
    debugger;

    var cartArray = {
      UserId: UserBaseId,
      LstPlansSelected: this.state.member
    };

    SubscribePlan.submitData(cartArray).then(responseJson => {
      if (responseJson.StatusCode == 200) {
        this.onNavigate();
        isLoading: false;
      } else if (responseJson.StatusCode == 500) {
        //alert("Login failed. Please try again");
      }
    });
  }

  onNavigate() {
    this.props.navigation.navigate("drawerStack", { userId: UserBaseId });
  }
  componentDidMount() {
    debugger;

    UserBaseId = this.props.navigation.state.params.result;
    userSessionId = this.props.navigation.state.params.sessionId;
    this.storeUserId("UserID", UserBaseId.toString());

    this.retrieveItem("Products")
      .then(cartItems => {
        //this callback is executed when your Promise is resolved
        debugger;

        cartItems.map(feesItem => {
          this.state.member.push({
            PlanId: feesItem.PlanId,
            TotalDays: feesItem.selectPlanDays,
            Quantity: feesItem.itemCount
          });
        });
        console.log(member);
      })
      .catch(error => {
        //this callback is executed when your Promise is rejected
        console.log("Promise is rejected with error: " + error);
      });
  }

  async retrieveItem(key) {
    try {
      debugger;

      const retrievedItem = await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      debugger;

      return item;
    } catch (error) {
      console.log(error.message);
    }
    return;
  }

  async storeUserId(key, item) {
    debugger;

    try {
      var user_id = await AsyncStorage.setItem(key, item);
      debugger;

      return user_id;
    } catch (error) {
      // Error saving data
      console.log(error.message);
    }
  }

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
                <Text>OTP Screen</Text>
                <Right />
              </Header>
              <ScrollView>
                <View style={styles.loginContainer}>
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
                      placeholder="OTP*"
                      ref="textinput"
                      keyboardType="number-pad"
                      maxLength={4}
                      onChangeText={otp => this.setState({ otp })}
                    />
                  </View>
                  <TouchableHighlight
                    style={[styles.buttonContainer, styles.submitButton]}
                    onPress={() => this.onClickListener("Submit", UserBaseId)}
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
  submitButton: {
    backgroundColor: "#cd0000"
  },
  submitText: {
    color: "white"
  }
});
