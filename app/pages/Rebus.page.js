import React, { Component } from 'react';
import Rebus from './components/Rebus/Rebus.component'

class RebusPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Rebus
                parcoursInfo={this.props.route.params.parcoursInfo}
                parcours={this.props.route.params.parcours}
                currentGame={this.props.route.params.currentGame}
            />
        );
    }

}

export default RebusPage