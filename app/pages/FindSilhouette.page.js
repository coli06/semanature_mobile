import React, { Component } from 'react';
import FindSilhouette from './components/FindSilhouette/FindSilhouette.component'

class FindSilhouettePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FindSilhouette
                parcours={this.props.route.params.parcours}
                currentGame={this.props.route.params.currentGame}
            />
        );
    }
}

export default FindSilhouettePage