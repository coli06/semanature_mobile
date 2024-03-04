import React, { Component } from 'react';
import FinParcours from './components/FinParcours/FinParcours.components'

class FinParcoursPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FinParcours
                parcours={this.props.route.params.parcours}
                currentGame={this.props.route.params.currentGame}
            />
        );
    }
}

export default FinParcoursPage