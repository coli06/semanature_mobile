import React, { Component } from 'react';
import LeSaviezVous from './components/LeSaviezVous/LeSaviezVous.component'

class LeSaviezVousPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LeSaviezVous
                parcours={this.props.route.params.parcours}
                currentGame={this.props.route.params.currentGame}
            />
        );
    }

}

export default LeSaviezVousPage