import React, { Component } from 'react';
import Joke from './components/Joke/Joke.component'

class JokePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Joke
                parcours={this.props.route.params.parcours}
                currentGame={this.props.route.params.currentGame}
            />
        );
    }
}

export default JokePage