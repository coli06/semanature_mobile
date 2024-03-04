import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import SearchCommune from './components/SearchCommune/SearchCommune.component';
import theme from './../styles/theme.style';
import TopBarre from '../components/TopBarre/TopBarre.component';
import common from '../styles/common.style.js'
import { SafeAreaView } from 'react-native-safe-area-context';


class SearchCommunePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={common.outsideSafeArea}>
                <TopBarre name='Recherche' />
                <View style={{ alignItems: 'center', flex: 1, maxHeight: "100%", backgroundColor: "#ffffff" }}>
                    <SearchCommune />
                </View>
            </SafeAreaView>
        );
    }
}

export default SearchCommunePage


