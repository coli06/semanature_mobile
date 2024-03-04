// PrincipesPage.js
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import common from '../styles/common.style.js'
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBarre from './../components/TopBarre/TopBarre.component';
import Principes from "./components/Principes/Principes.component"

class PrincipesPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={common.outsideSafeArea}>
                <TopBarre name="Principes" />
                <View style={{ alignItems: 'center', flex: 1, maxHeight: "100%", backgroundColor: "#ffffff" }}>
                    <Principes />
                </View>
            </SafeAreaView>

        );
    }
}
export default PrincipesPage;
