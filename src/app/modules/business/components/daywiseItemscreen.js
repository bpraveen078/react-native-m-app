import React, { Component } from "react";
import {
  View,
  Text,
  SectionList,
  FlatList,
  CheckBox,
  Alert,
  TouchableOpacity,
  ToastAndroid,
  ImageBackground,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import styles from "../../../styles/styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import PlanDetails from "../../../modelapicall/plandetails";
import SavedDetails from "../../../modelapicall/saveddetails";

import {
  Header,
  Left,
  Right,
  Icon,
  Body,
  Title,
  Container,
  Item,
  Button
} from "native-base";

var presentDate = moment().format("YYYY-MM-DD");
var toDate;
var planId;
var subUserId;
var take;
var checked;

export default class DaywiseItemScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "DayWiseOrder",
      headerLeft: null,
      headerRight: (
        <TouchableOpacity onPress={() => take.postSavedDetails()}>
          <AntDesign
            style={{ margin: 10 }}
            name={"save"}
            type={"AntDesign"}
            size={30}
          />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      CheckedItems: 0,
      boolean: false,
      checkedStatus: false,
      selectedGroupId: 0,
      isLoading: true,
      selectedItem: null,
      selectedGroupId: "",
      checkedArray: [],
      result: {},
      toDate: "",
      UserId: 0,
      orderedDate: presentDate,
      dataSource: [],
      subscriberId: 0,
      getData: []
    };
  }

  // shouldComponentUpdate() {
  //   return false
  // }

  changeSelectedItems = myItem => {
    debugger;

    let getMyItem = this.state.getData.find(data => {
      return data.GroupId == myItem.GroupId;
    });
    let singleGetMyItem = getMyItem.data.find(data => {
      return data.ItemId == myItem.ItemId;
    });

    if (singleGetMyItem.IsSelectedItem === false) {
      let myGetItem = getMyItem.data.find(data => {
        return data.isUnCheckItem === true;
      });
      if (myGetItem === undefined) {
      } else {
        myGetItem.isUnCheckItem = false;
      }

      myItem.isUnCheckItem = true;
      this.showAlert(getMyItem);
    } else {
      let checkGetMyItem = getMyItem.data.find(data => {
        return data.isUnCheckItem === true;
      });
      if (checkGetMyItem === undefined) {
      } else {
        if (checkGetMyItem.IsSelectedItem === true) {
          checkGetMyItem.isUnCheckItem = false;
        } else {
          checkGetMyItem.IsSelectedItem = true;
          myItem.IsSelectedItem = false;
        }
      }
    }
    this.setState({ getData: this.state.getData });
  };

  showAlert = item => {
    debugger;
    Alert.alert("Maximum  " + item.title + "  items selected");
    return false;
  };

  singleSelection = myObj => {};

  getUserId() {
    AsyncStorage.getItem("UserID").then(value => {
      if (value !== null) {
        this.setState({ UserId: value });
        //console.warn(this.state.UserId);
        this.getItemDetails(subUserId);
      }
    });
  }
  getItemDetails(subUserId) {
    PlanDetails.getItemDetails(
      subUserId,
      this.state.UserId,
      this.state.orderedDate
    ).then(responseJson => {
      const myItems = responseJson.Result.LstCustomerOrderItemGroups;
      this.state.getData = myItems.reduce((r, s) => {
        r.push({
          title: s.MaxItemsToSelect,
          GroupId: s.GroupId,
          data: s.LstOrderItems
        });
        return r;
      }, []);

      this.setState({
        isLoading: false,
        getData: this.state.getData
      });
    });
  }

  postSavedDetails() {
    this.state.result["LstCustomerOrderItemGroups"] = this.state.dataSource;
    var postdata = this.state.result;
    //console.warn(postdata);

    SavedDetails.postItemDetails(postdata).then(responseJson => {
      if (responseJson.StatusCode == 200) {
        alert(responseJson.Message);
        this.getItemDetails(subUserId);
      } else if (responseJson.StatusCode == 500) {
        alert(responseJson.Message);
      }
    });
  }

  savedDataDayWise() {}

  componentDidMount() {
    const { params } = this.props.navigation.state;
    toDate = params.toDate;

    subUserId = params.SubscribedUserId;
    this.setState({ orderedDate: toDate });
    this.getUserId();
    //console.warn(subUserId);
  }
  renderItem = ({ item }) => {};

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
      <View style={{ flex: 1 }}>
        <Header style={styles.headerStyle}>
          <Left>
            <Icon
              name="ios-arrow-back"
              onPress={() => this.props.navigation.goBack(null)}
            />
          </Left>
          <Title>Subscribe Plans</Title>

          <Right>
            <Icon name="ios-save" onPress={() => this.savedDataDayWise()} />
          </Right>
        </Header>

        <View style={{ flex: 20 }}>
          <CalendarStrip
            ref={component => (this._calendar = component)}
            calendarAnimation={{ type: "sequence", duration: 30 }}
            daySelectionAnimation={{
              type: "border",
              duration: 200,
              borderWidth: 1,
              borderHighlightColor: "black"
            }}
            style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
            calendarHeaderStyle={{ color: "black" }}
            calendarColor={"#FFFFFF"}
            dateNumberStyle={{ color: "black" }}
            dateNameStyle={{ color: "black" }}
            highlightDateNumberStyle={{ color: "black" }}
            highlightDateNameStyle={{ color: "black" }}
            disabledDateNameStyle={{ color: "grey" }}
            disabledDateNumberStyle={{ color: "grey" }}
            datesWhitelist={[
              {
                start: moment(),
                end: toDate // total 5 days enabled
              }
            ]}
            iconContainer={{ flex: 0.1 }}
          />
        </View>
        <View style={{ flex: 65 }}>
          <SectionList
            renderItem={({ item, index, section }) => (
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 0.9, marginStart: 10, marginTop: 5 }}>
                  <Text>{item.Name}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => this.changeSelectedItems(item)}
                >
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    {item.IsSelectedItem ? (
                      <Icon name="ios-checkbox" size={30} color={"black"} />
                    ) : (
                      <Icon
                        name="ios-square-outline"
                        size={30}
                        color={"black"}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionHeader}>
                MaxItemsToSelect: {title}
              </Text>
            )}
            sections={this.state.getData}
            keyExtractor={(item, index) => item.Name + index}
          />
        </View>
      </View>
    );
  }
}
