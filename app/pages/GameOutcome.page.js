import React, { Component } from 'react';
import GameOutcome from './components/GameOutcome/GameOutcome.component'

class GameOutcomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <GameOutcome
                parcours={this.props.route.params.parcours}
                currentGame={this.props.route.params.currentGame}
                win={this.props.route.params.win}
            />
        );
    }
}

export default GameOutcomePage