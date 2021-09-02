import React, { Component } from 'react'
import RollingRetention from './RollingRetention';

export default class ButtonCalculate extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            isPress: false
        }

        this.press = this.press.bind(this);
    }

    press() {
        this.setState({
            isPress: true,
        })
    }

    render() {
        const {isPress} = this.state;

        if (isPress) {
            return (
                <div>
                    <RollingRetention />
                </div>
            )
        } else {
            return (
                <div>
                    <button onClick={this.press} className="b_main">Calculate</button>
                </div>
            )
        }
    }
}

