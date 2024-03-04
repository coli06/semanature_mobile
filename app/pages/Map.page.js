import React, { Component } from 'react';
import Map from './components/Map/Map.component';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import TopBarre from '../components/TopBarre/TopBarre.component';
import common from '../styles/common.style.js'
import { SafeAreaView } from 'react-native-safe-area-context';

class MapPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={common.outsideSafeArea}>
                <TopBarre name='Carte des parcours' />
                <View style={{ alignItems: 'center', flex: 1, maxHeight: "100%", backgroundColor: "#ffffff" }}>
                    <Map />
                </View>
            </SafeAreaView>
        );
    }
}

export default MapPage