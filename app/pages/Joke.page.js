import React, { Component } from 'react';
import Joke from './components/Joke/Joke.component'

class JokePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Joke
                parcoursInfo={this.props.route.params.parcoursInfo}
                parcours={this.props.route.params.parcours}
                currentGame={this.props.route.params.currentGame}
            />
        );
    }
}

export default JokePage