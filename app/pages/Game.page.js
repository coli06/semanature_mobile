import React, { Component } from 'react';
import GamePageComponent from './components/Game/GamePage.component';


class GamePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <GamePageComponent
                parcours={this.props.route.params.parcours}
                parcoursId={this.props.route.params.parcoursId}
            />
        );
    }
}

export default GamePage