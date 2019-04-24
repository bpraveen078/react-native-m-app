import { Platform, StyleSheet, Dimensions } from "react-native";
import Colors from "../common/colors";

const WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.green
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  listContainer: {
    flex: 1,
    backgroundColor: "transparent"
  },

  flatList: {
    flex: 95,
    backgroundColor: "transparent"
  },
  flatListItem: {
    // alignItems: "center",
    height: 110,
    flexDirection: "row",

    //borderRadius: 10,
    // borderWidth: 1,
    //borderColor: "black",
    backgroundColor: "transparent"
    // borderRadius: 10,
    // shadowOpacity: 15
  },
  expandListView: {
    flex: 1,
    flexDirection: "column",
    //alignItems: "center",
    margin: 5,
    // height :250,
    alignItems: "stretch",
    flexWrap: "wrap",

    //borderRadius: 10,
    // borderWidth: 1,
    //borderColor: "black",
    backgroundColor: "transparent",
    borderRadius: 10,
    shadowOpacity: 15
  },
  ListItem: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "center",
    margin: 5,
    height: 110,
    alignItems: "stretch",

    //borderRadius: 10,
    // borderWidth: 1,
    //borderColor: "black",
    backgroundColor: "transparent",
    borderRadius: 10,
    shadowOpacity: 15
  },
  loaderStyle: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 50,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#cd0000",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#800000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  },
  countText: {
    color: "#FFFF",
    //backgroundColor: '#FF00FF',
    alignItems: "center",
    padding: 20
  },
  homeContainer: {
    flex: 1,
    backgroundColor: "#fff"
    //backgroundColor : Colors.green
  },
  buttonContainer: {
    flex: 1
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  headerStyle: {
    backgroundColor: "#ffff"
  },
  priceItem: {},
  sectionHeader: {
    backgroundColor: "green",
    padding: 5,
    marginTop: 5,
    color: "white"
  },
  cartListView: {
    flex: 1,
    flexDirection: "column",
    //alignItems: "center",
    margin: 5,
    // height :250,
    alignItems: "stretch",
    flexWrap: "wrap",

    //borderRadius: 10,
    // borderWidth: 1,
    //borderColor: "black",
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowOpacity: 15
  },
  cartListItem: {
    // alignItems: "center",
    height: 150,
    flexDirection: "row",

    //borderRadius: 10,
    // borderWidth: 1,
    //borderColor: "black",
    backgroundColor: "transparent"
    // borderRadius: 10,
    // shadowOpacity: 15
  },
  payButton: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 50,
    marginBottom: 50,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#5D4157",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  }
});
export default styles;
