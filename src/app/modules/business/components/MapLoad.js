/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Polyline } from "react-native-maps";

const { width, height } = Dimensions.get("window");
const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATTITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = "AIzaSyCpEfZlDu19vdwe0JGlxZmEHpAU-X_BMw4";

export default class GUserLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        longitudeDelta: 0,
        latitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      }
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      postion => {
        var lat = parseFloat(postion.coords.latitude);
        var long = parseFloat(postion.coords.longitude);

        var initialRegion = {
          latitude: lat,
          longitude: long,
          latitudeDelta: LATTITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        };

        this.setState({ initialPosition: initialRegion });
        this.setState({ markerPosition: initialRegion });
      },
      error => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    console.warn(this.state.initialPosition);
    return (
      <View style={styles.container}>
        <MapView style={styles.map} region={this.state.initialPosition}>
          <MapView.Marker coordinate={this.state.markerPosition} />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
  },
  textstyle: {
    position: "absolute",
    height: 50,
    bottom: 10
  }
});
