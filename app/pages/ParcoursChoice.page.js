import React, { Component } from 'react';
import ParcoursChoice from './components/ParcoursChoice/ParcoursChoice.component';


class ParcoursChoicePage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ParcoursChoice
                commune={this.props.route.params.commune}
            />
        );
    }
}



export default ParcoursChoicePage

