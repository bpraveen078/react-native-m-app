import React from "react";
import {
  Image,
  List,
  Platform,
  Text,
  View,
  FlatList,
  Dimensions,
  TextInput,
  ActivityIndicator,
  ImageBackground,
  Alert,
  TouchableOpacity,
  CheckBox,
  AsyncStorage
} from "react-native";
import SubscribedDetails from "../../../modelapicall/subscribeddetails";
import images from "../../../common/images";
import styles from "../../../styles/styles";
import { BackHandler } from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import { Header, Left, Right, Body, Title, Container, Item } from "native-base";

export default class SelectedPlansScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "Subscribed Plans"
  };
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: true,
      userId: 0
    };
  }

  shouldComponentUpdate() {
    return true;
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    var data = {
      PlanId: 0,
      Name: 0,
      Cost: 0,
      CategoryId: 0,
      RestaurantId: 0,
      PlanMasterId: 0,
      PageNumber: 0,
      PageSize: 0,
      SubscribedUserId: 0
    };
    const { navigate } = this.props.navigation;
    var UserID = this.getUserId("UserID");
  }
  getUserId(key) {
    AsyncStorage.getItem(key).then(value => {
      if (value !== null) {
        this.state.userId = parseInt(value);
        SubscribedDetails.getItemDetails(value).then(responseJson => {
          this.setState({
            dataSource: responseJson.Result,
            isLoading: false
          });
        });
      }
    });
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("DaywiseItemScreen", {
            planId: item.PlanId,
            SubscribedUserId: item.SubscribedUserId,
            fromDate: moment(item.FromDate).format("YYYY-MM-DD"),
            toDate: moment(item.ToDate).format("YYYY-MM-DD")
          });
        }}
      >
        <View style={styles.flatListItem}>
          <Image
            style={{
              width: "30%",
              height: 100,
              margin: 5,
              borderRadius: 10,
              shadowOpacity: 20
            }}
            source={{ uri: "http://87.106.210.241:9202" + item.ImagePath }}
          />

          <View
            style={{
              backgroundColor: "#F2F2F2",
              width: "65%",
              height: 100,
              flexDirection: "column",
              padding: 10,
              borderRadius: 5
              // flex:1
            }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 70, flexDirection: "column" }}>
                <Text style={{ fontWeight: "bold" }}>{item.Name}</Text>
                <Text>{"planId : " + item.PlanId}</Text>
                <Text>{"Subscribed Days : " + item.TotalDays}</Text>
                <Text>
                  {moment(item.FromDate).format("YYYY-MM-DD") +
                    " to " +
                    moment(item.ToDate).format("YYYY-MM-DD")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  onPress = () => {
    this.props.navigation.navigate("Login");
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            padding: 20,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large" color="#45B649" />
        </View>
      );
    }

    return (
      <View style={styles.listContainer}>
        <ImageBackground
          resizeMode={"cover"}
          style={{ flex: 1 }}
          source={images.listBgc}
        >
          <Header style={styles.headerStyle}>
            <Left>
              {/* <Icon
    name="md-menu"
    onPress={() => this.props.navigation.openDrawer()}
  /> */}
            </Left>
            <Title>Subscribe Plans</Title>
            <Right>
              {
                <TouchableOpacity
                  onPress={() =>
                    this.state.selectedDataSource.length === 0
                      ? Alert.alert("Select any plan for Proceeding")
                      : this.onPress()
                  }
                >
                  <View
                    style={[
                      { padding: 5 },
                      Platform.OS == "android" ? styles.iconContainer : null
                    ]}
                  >
                    <Icon
                      onPress={() => this.onPress()}
                      name="ios-log-out"
                      size={30}
                    />
                  </View>
                </TouchableOpacity>
              }
            </Right>
          </Header>
          <FlatList
            data={this.state.dataSource}
            renderItem={this.renderItem}
            selectedData={this.state.selectedItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </ImageBackground>
      </View>
    );
  }
}
