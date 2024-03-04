import React, { Component } from 'react';
import TransitionInfo from './components/TransitionInfo/TransitionInfo.component.js'

class TransitonInfoPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TransitionInfo
                parcours={this.props.route.params.parcours}
                currentGame={this.props.route.params.currentGame}
            />
        );
    }
}

export default TransitonInfoPage
