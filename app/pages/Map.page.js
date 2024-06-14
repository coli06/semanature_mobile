import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapComponent from './components/Map/Map.component'; // Update the path if necessary
import TopBarre from '../components/TopBarre/TopBarre.component'; // Update the path if necessary
import common from '../styles/common.style.js';
import { SafeAreaView } from 'react-native-safe-area-context';

class MapPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={common.outsideSafeArea}>
        {/* Ensure TopBarre component is not causing the issue */}
        <TopBarre name='Carte des parcours' />
        <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
          <MapComponent />
        </View>
      </SafeAreaView>
    );
  }
}

export default MapPage;