import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Pyramid from './components/Pyramid/Pyramid.component';




class PyramidPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.homestyle}>
                <Pyramid parcours={this.props.route.params.parcours}
                    currentGame={this.props.route.params.currentGame}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    homestyle: {
        flex: 1,
        backgroundColor: '#ffffff',
        height: '100%',
    }
});

export default PyramidPage


