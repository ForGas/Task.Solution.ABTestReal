import React, { Component } from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries} from 'react-vis';
//import RollingRetentionX from './RollingRetentionX';
import DiffDates from './DiffDates';

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
        fetch(
            "users",
            { method: 'GET' }
        )
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

        let userData = [];
        
        if (users.length !== 0) {
            userData = users.map((user, index) => {
                return {x: (index + 1), y: DiffDates(new Date(user.dateLastActivity), new Date(user.dateRegistration))}
            })
        }
        
        if (error) {
            return <p>Error {error.message}</p>
        } else if (!isLoaded) {
            return <p> Loading...</p>
        } else {
            if(userData.length < 1) {
                return (
                    <div>Элементов нет</div>
                )
            } else {
                return (
                    <div>
                        <span className="main_head">Rolling Retention 7 day</span>
                        <XYPlot
                        width={900}
                        height={600}
                        xType="ordinal"
                        yDomain={[0, 20]}
                        yDistance={50}>
                         
                        <VerticalBarSeries
                        style={{stroke: 'violet', strokeWidth: 1}}
                        data={userData}/>
                        <XAxis title="USER" tickFormat={u => `${u}`}/>

                        <YAxis title="DAY" />

                        <HorizontalGridLines style={{stroke: 'red', strokeWidth: 0.5}} />  

                        </XYPlot>

                        {/* <RollingRetentionX users={users} /> */}
                    </div>
                )
            }
        }
    }
}
