import React, { Component } from 'react';
import FindIntruder from './components/FindIntruder/FindIntruder.component.js'

class FindIntruderPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FindIntruder
                parcours={this.props.route.params.parcours}
                currentGame={this.props.route.params.currentGame}
            />
        );
    }
}

export default FindIntruderPage
