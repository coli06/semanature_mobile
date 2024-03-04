import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../../styles/theme.style';
import styles from './HomeTab.component.style.js';

const HomeTab = ({focused}) => {
    return (
        <View style={styles.tabContainer}>
            <View style={styles.circle}>
                <Icon name="home" color={focused ? 'white' : 'lightgray'} size={30} marginBottom={20}/>
            </View>
        </View>
    );
};

export default HomeTab;
