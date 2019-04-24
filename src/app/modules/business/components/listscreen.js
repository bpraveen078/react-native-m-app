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
import PlanList from "../../../modelapicall/planlist";
import images from "../../../common/images";
import styles from "../../../styles/styles";
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
import colors from "../../../common/colors";

const window = Dimensions.get("window");

export default class ListScreen extends React.Component {
  static navigationOptions = {
    title: "List"
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: true,
      count: 0,
      cartArray: [],
      selected: true,
      selectedItem: "",
      selectedDataSource: [],
      cartCount: 0,
      PriceList: [],
      listOfItems: [],
      listSubItems: [],
      priceItem: 0,
      selectedDays: 0
    };
  }

  onSelect = data => {
    this.setState(data);
  };

  selectedPlan = selectedItem => {
    this.state.dataSource.map(item => {
      if (item.PlanId === selectedItem.PlanId) {
        this.state.PriceList = item.LstPlanPrices;

        this.state.PriceList.map(myItem => {
          if (myItem.NoOfDays === 1) {
            myItem.planSelect = !myItem.planSelect;
            item.ItemPrice = myItem.Cost;
            item.selectPlanDays = myItem.NoOfDays;
            item.selectedPlanPrice = myItem.Cost;
            item.selectPlanDays = myItem.NoOfDays;
          }
        });
      }
    });
    this.setState({ dataSource: this.state.dataSource });
  };

  DeatilInfo = selectedItem => {
    this.state.dataSource.map(item => {
      if (item.PlanId === selectedItem.PlanId) {
        this.state.PriceList = item.LstPlanPrices;
        item.expand = !item.expand;
        this.state.listOfItems = item.LstPlanItemsGroup;
      } else {
        if (item.expand === true) {
          item.expand = false;
        }
      }
    });
    this.setState({ dataSource: this.state.dataSource });
  };

  AddItemsToArray = selectedItem => {
    this.state.dataSource.map(item => {
      if (item.PlanId === selectedItem.PlanId) {
        item.check = !item.check;
        if (item.check === true) {
          item.itemCount = 1;

          this.state.selectedDataSource.push(item);
          this.state.PriceList = item.LstPlanPrices;

          this.setState({ cartCount: this.state.cartCount + 1 });
          this.selectedPlan(item);
        } else if (item.check === false) {
          this.setState({ cartCount: this.state.cartCount - 1 });

          const i = this.state.selectedDataSource.indexOf(item);
          item.itemCount = 0;

          if (1 != -1) {
            this.state.selectedDataSource.splice(i, 1);
            console.log("unselect:" + item.Name);
            return this.state.selectedDataSource;
          }
        }
      }
    });
    this.setState({ dataSource: this.state.dataSource });
  };

  async storeItem(key, item) {
    try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value

      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      this.props.navigation.navigate("AddScreen", {
        data: this.state.selectedDataSource
      });

      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }
  async retrieveItem(key) {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);

      return item;
    } catch (error) {
      console.log(error.message);
    }
    return;
  }
  renderItem = ({ item }) => {
    // const { selected } = this.state;
    // const isItemSelected = this.state.selectedItem === item.Name;
    // const viewStyle = isItemSelected === item.Name ? styles.selected : styles.unselected;
    // const iconColor = selected ? "green" : "red";
    // const icon = selected
    //   ? Platform.select({ ios: "ios-checkbox", android: "md-checkbox" })
    //   : Platform.select({
    //       ios: "ios-checkbox-outline",
    //       android: "md-checkbox-outline"
    //     });
    return (
      <View style={item.expand ? styles.expandListView : styles.ListItem}>
        <View style={styles.flatListItem}>
          <Image
            style={{
              width: "30%",
              height: 100,
              margin: 5,
              borderRadius: 10,
              shadowOpacity: 20
            }}
            source={{ uri: "http://87.106.210.241:9202" + item.ImapgePath }}
          />
          <View
            style={{
              backgroundColor: "#FFFF",
              width: "65%",
              height: 100,
              flexDirection: "column",
              padding: 10,
              borderRadius: 5,
              margin: 5
              // flex:1
            }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 70, flexDirection: "column" }}>
                <Text style={{ fontWeight: "bold" }}>{item.Name}</Text>
                <Text
                  style={{
                    color: item.Category === "Veg" ? "green" : "red",
                    fontWeight: "bold"
                  }}
                >
                  {item.Category}
                </Text>
                <Text>{item.PlanMaster}</Text>
                <TouchableOpacity onPress={() => this.DeatilInfo(item)}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      color: "#0000ff"
                    }}
                  >
                    More...
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => this.AddItemsToArray(item)}
                hitSlop={{ top: 30, right: 30, bottom: 30, left: 30 }}
              >
                <View
                  style={{
                    flex: 30,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {item.check ? (
                    <Icon name="ios-checkbox" size={30} color={"black"} />
                  ) : (
                    <Icon name="ios-square-outline" size={30} color={"black"} />
                  )}

                  {/* <CheckBox value ={this.state.selected} 
                      onChange ={() => this.AddItemsToArray(item) }></CheckBox> */}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {item.expand ? (
          <View
            style={{
              backgroundColor: "#FFFF",
              flex: 1,
              marginTop: 5,
              flexDirection: "row",
              padding: 10,
              flexWrap: "wrap",
              justifyContent: "space-between"
            }}
          >
            {this.state.PriceList.map((item, key) => (
              <View
                key={key}
                style={{
                  backgroundColor:
                    item.planSelect === true ? "#bdc3c7" : "#FFFF",
                  width: window.width / 4,
                  borderRadius: 10,
                  shadowOpacity: 15,
                  marginTop: 10
                }}
              >
                <Text style={{ marginTop: 5, fontWeight: "bold" }}>
                  {" "}
                  NoOfDays :{item.NoOfDays}
                </Text>
                <Text style={{ marginTop: 5 }}>
                  {" "}
                  ₹{item.AdditionalUnitAmount}/ Meal
                </Text>

                <Text style={{ marginTop: 5 }}>
                  {" "}
                  ₹{item.Cost}/{item.NoOfDays} Days
                </Text>
              </View>
            ))}
          </View>
        ) : null}

        {item.expand ? (
          <View
            style={{
              backgroundColor: "#FFFF",
              flex: 1,
              marginTop: 5,
              flexDirection: "row",
              padding: 10,
              flexWrap: "wrap",
              justifyContent: "space-between"
            }}
          >
            {this.state.listOfItems.map((item, key) => (
              <View
                key={key}
                style={{
                  backgroundColor: "#FFFF",
                  width: window.width / 2.5,
                  backgroundColor: "#F2F2F2",
                  borderRadius: 10,
                  shadowOpacity: 15,
                  marginTop: 10
                }}
              >
                <Text
                  style={{ marginTop: 5, marginLeft: 5, fontWeight: "bold" }}
                >
                  MaxItemsToSelect :{item.MaxItemsToSelect}
                </Text>

                {item.LstPlanItems.map((company, index) => (
                  <Text key={index} style={{ marginTop: 5, marginLeft: 5 }}>
                    {company.IsDefaultItem === true
                      ? company.ItemName + "✓"
                      : company.ItemName}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        ) : null}
      </View>
    );
  };

  componentDidMount() {
    this.fetchData();
    debugger;
    this.willFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      () => {
        AsyncStorage.getItem("ISBACK").then(value => {
          debugger;
          if (JSON.parse(value)) {
            AsyncStorage.setItem("ISBACK", JSON.stringify(false));

            this.refreshPage();
          }
        });
      }
    );
  }

  refreshPage() {
    this.retrieveItem("MainData")
      .then(cartItems => {
        //this callback is executed when your Promise is resolved
        this.state.dataSource = cartItems;

        this.setState({ dataSource: this.state.dataSource, isLoading: false });

        this.cartCount();
      })
      .catch(error => {
        //this callback is executed when your Promise is rejected
        console.log("Promise is rejected with error: " + error);
      });
  }
  cartCount() {
    this.retrieveItem("Products")
      .then(myItems => {
        //this callback is executed when your Promise is resolved

        (this.state.selectedDataSource = myItems),
          this.setState({
            selectedDataSource: this.state.selectedDataSource,
            isLoading: false
          });

        this.setState({ cartCount: this.state.selectedDataSource.length });
      })
      .catch(error => {
        //this callback is executed when your Promise is rejected
        console.log("Promise is rejected with error: " + error);
      });
  }
  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  fetchData() {
    var data = {
      PlanId: 0,
      Name: 0,
      Cost: 0,
      CategoryId: 0,
      RestaurantId: 0,
      PlanMasterId: 0,
      PageNumber: 0,
      PageSize: 0
    };
    PlanList.getItems(data).then(responseJson => {
      this.setState({
        dataSource: responseJson.Result,

        isLoading: false
      });
    });
  }
  onPress = () => {
    this.storeItem("MainData", this.state.dataSource);
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
          resizeMode={"cover"} // or stretch
          style={{ flex: 1 }} // must be passed from the parent, the number may vary depending upon your screen size
          source={images.listBgc}
        >
          <Header style={styles.headerStyle}>
            <Left>
              {/* <Icon
              name="md-menu"
              onPress={() => this.props.navigation.openDrawer()}
            /> */}
            </Left>
            <Title>Plans</Title>
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
                      onPress={() =>
                        this.state.selectedDataSource.length === 0
                          ? Alert.alert("Select any plan for Proceeding")
                          : this.onPress()
                      }
                      name="ios-cart"
                      size={30}
                    />

                    <View
                      style={{
                        position: "absolute",
                        height: 30,
                        width: 30,
                        borderRadius: 15,
                        backgroundColor: colors.red,
                        right: 15,
                        bottom: 15,
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2000
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        {this.state.cartCount}
                      </Text>
                    </View>
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
            extraData={this.state}
          />
        </ImageBackground>
      </View>
    );
  }
}
