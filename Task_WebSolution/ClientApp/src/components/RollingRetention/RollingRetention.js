import React, { Component } from 'react';
import getUserMetricData from './Helpers/GetUserMetricData';
import RollingRetentionX from './RollingRetentionX';
import Histogram from './Histogram';
import Metrics from './Metrics';

export default class RollingRetention extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            users: [],
            error: null,
            isLoaded: false
        }
    } 

    componentDidMount() {
        fetch("users/full", {
            method: 'GET',
            headers: { "Content-type": "application/json" }
        })
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    users: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }


    render() {
        const {isLoaded, error, users} = this.state;
        const days = 30;
        let userFullMetricData = [];

        if (users.length !== 0) {
            userFullMetricData = [...Array(days)].map((_, x) => {
                return {x, y: getUserMetricData(x, users)}
            })
        }

        return error 
            ? <p>Error {error.message}</p>
            : !isLoaded
                ? <p>Loading...</p>
                : userFullMetricData.length < 1                   
                    ? <div>Элементов нет</div>                  
                    : <div>
                        <span className="main_head">Rolling Retention 7 day</span>
                        
                        <div className="block-center">
                            <div>{Metrics(userFullMetricData)}</div>
                        </div>

                        <div>
                            <RollingRetentionX users={users} />
                        </div>

                        <div>{Histogram(userFullMetricData)}</div>
                    </div>
    }
}
