import React, { Component } from 'react';
import CompterImage from './components/CompterImage/CompterImage.component.js'

class CompterImagePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CompterImage
                parcours={this.props.route.params.parcours}
                currentGame={this.props.route.params.currentGame}
            />
        );
    }
}

export default CompterImagePage
