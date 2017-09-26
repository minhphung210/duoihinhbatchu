/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Navigator
} from 'react-native';
import Chosen from './components/chosen'
import Background from './components/background'
import { Scene, Router } from 'react-native-router-flux';
import trackjs from 'react-native-trackjs';
const { height, width } = Dimensions.get('window')

class Duoihinhbatchu extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" >
          <Scene key="chosen" component={Chosen} hideNavBar={true}/>
          <Scene key="background" component={Background} initial={true} hideNavBar={true} />
        </Scene>
      </Router>
    );
  }
}
AppRegistry.registerComponent('duoihinhbatchu', () => Duoihinhbatchu);
