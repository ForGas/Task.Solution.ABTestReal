import React, { Component } from 'react'
import RollingRetention from './RollingRetention/RollingRetention';

export default class ButtonCalculate extends Component {
    constructor(props) {
        super(props);

        this.state = { isPress: false}
        this.press = this.press.bind(this);
    }

    press() {
        this.setState({
            isPress: true,
        })
    }

    render() {
        const {isPress} = this.state;

        return isPress 
            ? <div><RollingRetention /></div>
            : <div className="block-center"><button onClick={this.press} className="b_main">Calculate</button></div>
    }
}

