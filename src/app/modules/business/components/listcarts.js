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
  Item,
  Button
} from "native-base";

const window = Dimensions.get("window");
const hitSlop = { top: 15, bottom: 15, left: 15, right: 15 };

export default class ListCarts extends React.Component {
  static navigationOptions = {
    title: "List"
  };

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isLoading: true,
      plantCount: 0,
      priceItem: "200",
      selectedDays: 0,
      selectData: []
    };
  }

  increment = selectedItem => {
    this.state.selectData.map(item => {
      if (item.PlanId === selectedItem.PlanId) {
        if (item.check === true) {
          item.itemCount = item.itemCount + 1;
          item.ItemPrice = item.selectedPlanPrice * item.itemCount;
        }
      }
    });
    this.setState({ selectData: this.state.selectData });
  };

  decrement = selectedItem => {
    this.state.selectData.map(item => {
      if (item.PlanId === selectedItem.PlanId) {
        item.itemCount = item.itemCount - 1;
        if (item.itemCount === 0) {
          this.changeMainData(selectedItem);

          const i = this.state.selectData.indexOf(item);
          item.itemCount = 0;

          if (1 != -1) {
            this.state.selectData.splice(i, 1);
            console.log("unselect:" + item.Name);
            return this.state.selectData;
          }
        } else {
          item.ItemPrice = item.ItemPrice - item.selectedPlanPrice;
        }
      }
    });
    this.setState({ selectData: this.state.selectData });
    this.storeItem("Products", this.state.selectData);
  };
  changeMainData = myItem => {
    this.state.dataSource.map(item => {
      if (item.PlanId === myItem.PlanId) {
        item.check = !item.check;
        item.itemCount = 0;
      }
    });
    this.setState({ dataSource: this.state.dataSource });
    this.storeItem("MainData", this.state.dataSource);
  };

  selectedPlan = selectedItem => {
    this.state.selectData.map(item => {
      if (item.PlanId === selectedItem.PlanId) {
        this.state.PriceList = item.LstPlanPrices;

        this.state.PriceList.map(myitem => {
          if (myitem.PlanPriceId === selectedItem.PlanPriceId) {
            myitem.planSelect = !myitem.planSelect;
            this.state.priceItem = myitem.Cost;
            this.state.selectedDays = myitem.NoOfDays;
            if (myitem.planSelect === false) {
              myitem.planSelect = true;
            }
          } else {
            if (myitem.planSelect === true) {
              myitem.planSelect = false;
            }
          }
        });
      }

      item.ItemPrice = this.state.priceItem * item.itemCount;
      item.selectedPlanPrice = this.state.priceItem;
      item.selectPlanDays = this.state.selectedDays;
    });
    this.setState({ selectData: this.state.selectData });
  };

  renderItem = ({ item }) => {
    return (
      <View style={styles.cartListView}>
        <View style={styles.cartListItem}>
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
              backgroundColor: "#FFF",
              width: "65%",
              height: 100,
              flexDirection: "column",
              padding: 10,
              borderRadius: 5,
              margin: 5
              // flex:1
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <View style={{ flexDirection: "column" }}>
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
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10
                }}
              >
                <View style={{ backgroundColor: "#F2F2" }}>
                  <Text style={{ fontSize: 15 }}> ₹ {item.ItemPrice}</Text>
                </View>

                <View
                  style={{
                    backgroundColor: "#FFF",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderColor: "#bdc3c7",
                    borderWidth: 1,
                    borderRadius: 2
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.increment(item)}
                    hitSlop={{ top: 10, right: 8, bottom: 0, left: 10 }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}> +</Text>
                  </TouchableOpacity>

                  <Text style={{ fontSize: 12 }}> {item.itemCount} </Text>
                  <TouchableOpacity
                    onPress={() => this.decrement(item)}
                    hitSlop={{ top: 10, right: 8, bottom: 0, left: 10 }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      {" "}
                      -{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

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
          {item.LstPlanPrices.map((item, key) => (
            <TouchableOpacity key={key} onPress={() => this.selectedPlan(item)}>
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
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  onPayment() {
    this.storeItem("Products", this.state.selectData);

    this.props.navigation.navigate("Registation");
  }

  async storeItem(key, item) {
    try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value

      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
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
    debugger;
    const { navigate } = this.props.navigation;

    this.setState({
      selectData: this.props.navigation.state.params.data,

      isLoading: false
    });

    this.retrieveItem("MainData")
      .then(cartItems => {
        //this callback is executed when your Promise is resolved
        this.state.dataSource = cartItems;
        this.storeItem("Products", this.state.selectData);
      })
      .catch(error => {
        //this callback is executed when your Promise is rejected
        console.log("Promise is rejected with error: " + error);
      });
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

  goBackAction() {
    this.props.navigation.navigate("ListScreen");
    AsyncStorage.setItem("ISBACK", JSON.stringify(true));
  }

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
              <Icon
                ios="ios-arrow-back"
                android="md-arrow-back"
                style={{ fontSize: 30, color: "black" }}
                onPress={() => this.goBackAction()}
                hitSlop={{ top: 20, left: 20, bottom: 20, right: 60 }}
              />
            </Left>
            <Title>Cart</Title>
            <Right />
          </Header>
          <FlatList
            data={this.state.selectData}
            renderItem={this.renderItem}
            selectedData={this.state.selectedItem}
            keyExtractor={(item, index) => index.toString()}
            extraData={this.state}
          />
          <View
            style={{ justifyContent: "center", backgroundColor: "#A8CABA" }}
          >
            <TouchableOpacity
              style={styles.payButton}
              onPress={() => this.onPayment()}
              underlayColor="#fff"
            >
              <Text style={styles.buttonText}>Payment</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
