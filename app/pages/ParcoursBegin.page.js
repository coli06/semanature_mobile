import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import ParcoursBegin from './components/ParcoursBegin/ParcoursBegin.component';


class ParcoursBeginPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.homestyle}>
                <ParcoursBegin
                    identifiant={this.props.route.params.identifiant}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    homestyle: {
        flex: 1,
    }
});
export default ParcoursBeginPage