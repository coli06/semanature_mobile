import React, { Component } from 'react';
import Qcm from './components/QCM/Qcm.component'

class QcmPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Qcm
                parcoursInfo={this.props.route.params.parcoursInfo}
                parcours={this.props.route.params.parcours}
                currentGame={this.props.route.params.currentGame}
            />
        );
    }
}

export default QcmPage