import React, { Component } from 'react';
import CodeGame from './components/CodeGame/CodeGame.component'

class CodeGamePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CodeGame
                parcours={this.props.route.params.parcours}
                currentGame={this.props.route.params.currentGame}
            />
        );
    }

}

export default CodeGamePage