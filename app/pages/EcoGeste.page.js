import React, { Component } from 'react';
import EcoGeste from './components/EcoGeste/EcoGeste.component'

class EcoGestePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <EcoGeste
                parcours={this.props.route.params.parcours}
                currentGame={this.props.route.params.currentGame}
            />
        );
    }

}

export default EcoGestePage