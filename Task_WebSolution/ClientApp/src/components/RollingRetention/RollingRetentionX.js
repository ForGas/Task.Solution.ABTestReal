import React, {Component} from "react";
import getUserMetricData from './GetUserMetricData';

export default class RollingRetentionX extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            users: props.users,
            day: "0"
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            day: e.target.value
        });
    }

    render() {
        const {day, users} = this.state;

        return (
            <div>
                <span>
                    <b>Rolling Retention</b>

                    <input type="text" value={this.state.day}
                    placeholder="X" onChange= {this.handleChange}
                    className="rolling-retention-x"/>

                    <div>
                        <span>day = {getUserMetricData(day, users)}%</span>
                    </div>
                </span> 
            </div>
        )
    }
}