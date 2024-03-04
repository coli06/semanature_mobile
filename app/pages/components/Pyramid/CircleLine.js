import styles from './Pyramid.component.style';
import React, { Component } from 'react';
import { View, TextInput } from 'react-native';

/**
 * La classe CircleLine est utilisée pour générer des cercles en tant que TextInput dans une ligne
 */
class CircleLine extends Component {


    /**
     *renderCircles crée les cercles parmi une ligne où :
     *
     * @param {*} count est le nombre de cercles d'une ligne
     * @param {*} edit définit si un cercle peut recevoir une entrée de l'utilisateur
     * @param {*} onChangeText 
     * @param {*} value 
    * onChangeText et value sont utilisés pour enregistrer les valeurs écrites dans un cercle (nous ne l'utilisons que pour le dernier cercle pour obtenir le résultat final)
     * @param {*} preFill détermine si la ligne de cercle doit être préremplie
     * @param {*} s contient les valeurs randomisées pour préremplir la première ligne
     * @returns 
     */
    renderCircles(count, edit, onChangeText, value, preFill, s) {
        const circles = [];
        if ((preFill == true)) {
            for (let i = 0; i < count; i++) {
                circles.push(
                    <TextInput style={styles.circle} key={i} editable={edit} onChangeText={onChangeText} value={value} keyboardType='numeric' defaultValue={parseInt(s[i]).toString(10)} />
                )

            };
        }
        else {
            for (let i = 0; i < count; i++) {
                circles.push(
                    <TextInput style={styles.circle} key={i} editable={edit} onChangeText={onChangeText} value={value} keyboardType='numeric' />
                )

            };
        };




        return circles;
    };

    render() {

        //lorsque la classe est appelée, elle définit le style d'une ligne de cercles et appelle renderCircles
        const { count, edit, onChangeText, value, preFill, s } = this.props;
        return (
            <View style={styles.circleLine}>
                {this.renderCircles(count, edit, onChangeText, value, preFill, s)}
            </View>
        );
    }
}

export default CircleLine;